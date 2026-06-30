#!/usr/bin/env node
/**
 * sync/diff-tokens.mjs — GoA token sync (the volatile, near-mechanical layer).
 *
 * Diffs the project's current token CSS against a freshly-pulled upstream
 * dist/tokens.css from @abgov/design-tokens (the verbatim artifact this system
 * imports) and reports added / changed / removed custom properties.
 *
 * Usage:
 *   node sync/diff-tokens.mjs <current.css> <upstream.css> [--apply] [--out file.md]
 *
 * Exit code: 0 = identical, 1 = differences (so CI can open a PR).
 *
 * REMOVED tokens are flagged loudly and block --apply: a component referencing a
 * dropped --goa-* name silently FREEZES the build in the original Claude Design
 * canvas; in this repo a removed token instead surfaces as a real `tsc`/runtime
 * CSS-var lookup gap, so reconcile components before applying regardless.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const argv = process.argv.slice(2);
const apply = argv.includes("--apply");
const outArg = (() => {
  const i = argv.indexOf("--out");
  return i >= 0 ? argv[i + 1] : null;
})();
const positionals = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--out") {
    i++;
    continue;
  }
  if (a.startsWith("--")) continue;
  positionals.push(a);
}
const [currentPath, upstreamPath] = positionals;
if (!currentPath || !upstreamPath) {
  console.error(
    "usage: node sync/diff-tokens.mjs <current.css> <upstream.css> [--apply] [--out file.md]"
  );
  process.exit(2);
}

function parseTokens(css) {
  const map = new Map();
  const re = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css))) map.set(m[1], m[2].trim().replace(/\s+/g, " "));
  return map;
}

const cur = parseTokens(readFileSync(currentPath, "utf8"));
const upstreamCss = readFileSync(upstreamPath, "utf8");
const up = parseTokens(upstreamCss);

const added = [],
  removed = [],
  changed = [];
for (const [name, val] of up) {
  if (!cur.has(name)) added.push([name, val]);
  else if (cur.get(name) !== val) changed.push([name, cur.get(name), val]);
}
for (const [name, val] of cur) if (!up.has(name)) removed.push([name, val]);

const total = added.length + removed.length + changed.length;
const date = new Date().toISOString().slice(0, 10);
const lines = [
  `# Token sync — ${date}`,
  "",
  `Current: \`${currentPath}\` (${cur.size}) → Upstream: \`${upstreamPath}\` (${up.size})`,
  "",
  `**${added.length} added · ${changed.length} changed · ${removed.length} removed**`,
  "",
];
if (removed.length) {
  lines.push("## ⚠️ Removed upstream — RECONCILE BEFORE APPLY", "");
  for (const [n, v] of removed) lines.push(`- \`${n}\` (was \`${v}\`)`);
  lines.push("");
}
if (changed.length) {
  lines.push("## Changed");
  for (const [n, o, v] of changed) lines.push(`- \`${n}\`: \`${o}\` → \`${v}\``);
  lines.push("");
}
if (added.length) {
  lines.push("## Added");
  for (const [n, v] of added) lines.push(`- \`${n}\`: \`${v}\``);
  lines.push("");
}
if (!total) lines.push("No changes — tokens are in sync. ✅");

const report = lines.join("\n");
const outPath = outArg || `sync/reports/tokens-${date}.md`;
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, report + "\n");
console.log(report + `\n\nReport written to ${outPath}`);

if (apply && total) {
  if (removed.length) {
    console.error(
      `\nRefusing --apply: ${removed.length} token(s) removed upstream. Reconcile components first.`
    );
    process.exit(1);
  }
  writeFileSync(currentPath, upstreamCss);
  console.log(`\nApplied: ${currentPath} overwritten verbatim.`);
}
process.exit(total ? 1 : 0);
