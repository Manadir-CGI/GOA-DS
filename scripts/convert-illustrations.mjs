#!/usr/bin/env node
// One-off migration script: converts project/components/illustrations/<Name>.jsx
// + <Name>.d.ts pairs (Claude-Design canvas format, no React import, untyped
// function params) into typed src/illustrations/<Name>.tsx files for the real
// npm package. Mechanical only — does not touch the inline SVG geometry.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

const SRC_DIR = "project/components/illustrations";
const OUT_DIR = "src/illustrations";
mkdirSync(OUT_DIR, { recursive: true });

const names = readdirSync(SRC_DIR)
  .filter((f) => f.endsWith(".jsx"))
  .map((f) => basename(f, ".jsx"))
  .sort();

const errors = [];
const converted = [];

for (const name of names) {
  const jsxPath = join(SRC_DIR, `${name}.jsx`);
  const dtsPath = join(SRC_DIR, `${name}.d.ts`);
  const jsx = readFileSync(jsxPath, "utf8");
  const dts = readFileSync(dtsPath, "utf8");

  const ifaceMatch = dts.match(/export interface (\w+Props) \{([\s\S]*?)\n\}/);
  if (!ifaceMatch) {
    errors.push(`${name}: no Props interface found in d.ts`);
    continue;
  }
  const [, propsTypeName, propsBody] = ifaceMatch;

  const isVariant = /__vkey = \(p\) =>/.test(jsx);

  let body = jsx;

  // Strip any leading blank lines, keep the figma-node comment line(s) as-is.
  body = body.replace(/^export function (\w+)\(_p = \{\}\) \{/m, (m, fnName) => {
    return `export function ${fnName}(_p: ${propsTypeName} = {}) {`;
  });

  if (isVariant) {
    body = body.replace(/const __venc = \(v\) =>/, "const __venc = (v: unknown) =>");
    body = body.replace(/const __vkey = \(p\) =>/, `const __vkey = (p: ${propsTypeName}) =>`);
    body = body.replace(
      /const __impls = \{/,
      "const __impls: Record<string, () => JSX.Element> = {"
    );
  }

  const header = [
    `import * as React from "react";`,
    "",
    `export interface ${propsTypeName} {${propsBody}\n}`,
    "",
  ].join("\n");

  const out = header + body;
  writeFileSync(join(OUT_DIR, `${name}.tsx`), out);
  converted.push(name);
}

// Barrel
const barrel =
  converted
    .map((n) => `export { ${n} } from "./${n}";\nexport type { ${n}Props } from "./${n}";`)
    .join("\n") + "\n";
writeFileSync(join(OUT_DIR, "index.ts"), barrel);

console.log(`Converted ${converted.length}/${names.length} illustrations.`);
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const e of errors) console.log(" -", e);
}
