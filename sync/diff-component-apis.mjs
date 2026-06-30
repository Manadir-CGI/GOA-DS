#!/usr/bin/env node
/**
 * sync/diff-component-apis.mjs — GoA component API sync (the semi-stable layer).
 *
 * Compares every local Goab*.tsx prop set against the authoritative React prop
 * table GoA generates (docs/generated/component-apis/*.json in GovAlta/ui-components,
 * checked out at a release tag).
 *
 * NOTE on this repo's layout: the original Claude Design canvas kept one
 * `Goab<Name>.d.ts` file per component, separate from its `.jsx`. This npm
 * package merges each component's types + implementation into one
 * `src/components/<group>/Goab<Name>.tsx`, so this script scans `.tsx` files
 * instead of `.d.ts` files — the `export interface <Name>Props { ... }` shape
 * it greps for is unchanged, just living in a different extension.
 *
 * Usage:
 *   node sync/diff-component-apis.mjs <componentsDir> <apiJsonDir> [--out file.md]
 *
 * Exit code: 0 = no missing upstream props, 1 = at least one component is behind.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";

const argv = process.argv.slice(2);
const outArg = (() => {
  const i = argv.indexOf("--out");
  return i >= 0 ? argv[i + 1] : null;
})();
const positionals = argv.filter((a, i) => !a.startsWith("--") && argv[i - 1] !== "--out");
const [componentsDir, apiJsonDir] = positionals;
if (!componentsDir || !apiJsonDir) {
  console.error(
    "usage: node sync/diff-component-apis.mjs <componentsDir> <apiJsonDir> [--out file.md]"
  );
  process.exit(2);
}

function walk(dir, filter, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  }
  return acc;
}

const normOurs = (b) => b.replace(/^Goab/, "").toLowerCase();
const normUp = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/^goa/, "");

// A .tsx may declare more than one `export interface <X>Props { ... }` block
// (e.g. GoabWorkSideMenu.tsx also declares GoabWorkSideMenuItemProps etc.) —
// return every match, keyed by the component name in front of "Props".
function parseComponentPropsBlocks(src) {
  const out = [];
  const re = /export\s+interface\s+(\w+)Props\s*\{([\s\S]*?)\n\}/g;
  let m;
  while ((m = re.exec(src))) {
    const [, compName, body] = m;
    const props = new Set();
    const propRe = /^\s*(\w+)\s*\??\s*:/gm;
    let pm;
    while ((pm = propRe.exec(body))) props.add(pm[1]);
    out.push({ name: compName, props });
  }
  return out;
}

const ours = new Map();
for (const f of walk(componentsDir, (p) => p.endsWith(".tsx") && /Goab/.test(basename(p)))) {
  const blocks = parseComponentPropsBlocks(readFileSync(f, "utf8"));
  for (const { name, props } of blocks) {
    ours.set(normOurs(name), { name, props });
  }
}

const upstream = new Map();
for (const f of walk(apiJsonDir, (p) => p.endsWith(".json"))) {
  let json;
  try {
    json = JSON.parse(readFileSync(f, "utf8"));
  } catch {
    continue;
  }
  const react = json?.frameworks?.react?.props;
  if (!Array.isArray(react)) continue;
  const name = json.componentSlug || json.tag || json.name || basename(f, ".json");
  upstream.set(normUp(name), { name, props: new Set(react.map((p) => p.name).filter(Boolean)) });
}

const date = new Date().toISOString().slice(0, 10);
const lines = [
  `# Component API sync — ${date}`,
  "",
  `Local: \`${componentsDir}\` (${ours.size}) · Upstream: \`${apiJsonDir}\` (${upstream.size})`,
  "",
];
let behind = 0;
const unOurs = [],
  unUp = [];
for (const [key, u] of [...upstream].sort()) {
  const o = ours.get(key);
  if (!o) {
    unUp.push(u.name);
    continue;
  }
  const missing = [...u.props].filter((p) => !o.props.has(p));
  const extra = [...o.props].filter((p) => !u.props.has(p));
  if (missing.length || extra.length) {
    if (missing.length) behind++;
    lines.push(`## ${o.name}  ·  upstream ${u.name}`);
    if (missing.length)
      lines.push(`- **Missing upstream props:** ${missing.map((p) => "`" + p + "`").join(", ")}`);
    if (extra.length)
      lines.push(`- Local-only props: ${extra.map((p) => "`" + p + "`").join(", ")}`);
    lines.push("");
  }
}
for (const [key, o] of ours) if (!upstream.has(key)) unOurs.push(o.name);
if (unUp.length)
  lines.push(`## Upstream with no local match\n${unUp.map((n) => "- " + n).join("\n")}\n`);
if (unOurs.length)
  lines.push(
    `## Local with no upstream match (alias / local)\n${unOurs.map((n) => "- " + n).join("\n")}\n`
  );
if (behind === 0) lines.push("No component is missing upstream props. ✅");

const report = lines.join("\n");
const outPath = outArg || `sync/reports/component-apis-${date}.md`;
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, report + "\n");
console.log(report + `\n\nReport written to ${outPath}`);
process.exit(behind ? 1 : 0);
