# Keeping this design system in sync with GoA

This package recreates the upstream Government of Alberta Design System as a
real React + TypeScript npm library. It stays "living" not by magic but by
making **the diff the artifact**: every refresh produces a readable changelog
and a pass/fail audit, so a human approves in minutes instead of re-auditing
by hand.

## Three layers, three sources, three cadences

| Layer                               | Source (most stable + accurate)                                    | Mechanism                              | Cadence       |
| ----------------------------------- | ------------------------------------------------------------------ | -------------------------------------- | ------------- |
| **Tokens**                          | `@abgov/design-tokens` on **npm**, pinned by version               | `diff-tokens.mjs` → auto-PR            | every release |
| **Components**                      | `GovAlta/ui-components` on **GitHub**, pinned to a **release tag** | `diff-component-apis.mjs` → report     | minor/major   |
| **Icons / illustrations / visuals** | Figma `❖ Component library`                                        | re-materialize + re-run a visual audit | on demand     |

**Why these sources.** Tokens come from npm because the published tarball is
the _byte-identical_ artifact this system imports verbatim — immutable per
version and semver-signalled, where GitHub `main` would expose unreleased
churn. Component prop tables come from the GitHub repo because that's the only
place with the machine-readable `docs/generated/component-apis/*.json`; pin to
a release **tag**, never `main`. Figma is design truth but not mechanically
diffable — use its `version`/`lastModified` only as a _trigger_ to
re-materialize and re-audit.

The real stability mechanism is **`sync/upstream.lock.json`** — it records the
exact upstream version each layer last synced from, so every diff is
reproducible version→version, never against a moving target.

## Layout note (this repo vs. the original canvas)

The design was originally prototyped in Claude Design's canvas, where every
component shipped as a `Goab<Name>.jsx` + a separate hand-written
`Goab<Name>.d.ts`. This npm package merges each pair into one typed
`src/components/<group>/Goab<Name>.tsx`, so:

- `diff-tokens.mjs` targets `src/styles/goa-tokens.css` (was `tokens/goa-tokens.css`).
- `diff-component-apis.mjs` scans `src/components/**/*.tsx` for
  `export interface <Name>Props { ... }` blocks (was `**/*.d.ts`) — same shape,
  different extension.

## What's automatic vs assisted

- **Automatic (GitHub Action, `.github/workflows/sync-goa.yml`):** weekly + manual.
  The tokens job installs the latest `@abgov/design-tokens`, diffs, applies,
  bumps the lockfile, and **opens a PR** with the changelog as the description.
  The components job checks out `ui-components` at its latest release tag and
  uploads a **drift report** artifact (component changes need a human to
  implement props).
- **Assisted (ask an agent to "sync"):** pull the latest from GitHub, run the
  diffs, apply the mechanical parts, and surface what needs a decision in one
  pass.

## Run it locally

```bash
# Tokens — pull the published artifact, then diff (add --apply to overwrite verbatim)
npm install --no-save @abgov/design-tokens@latest
node sync/diff-tokens.mjs src/styles/goa-tokens.css \
  node_modules/@abgov/design-tokens/dist/tokens.css [--apply]

# Components — diff against the repo's generated prop tables
#   (clone GovAlta/ui-components at a release tag first)
node sync/diff-component-apis.mjs src/components \
  path/to/ui-components/docs/generated/component-apis
```

Reports land in `sync/reports/`. Exit code is `1` when there are changes, `0`
when in sync — so CI can branch on it.

## What needs a human (never auto-merged)

1. **Removed tokens.** `diff-tokens.mjs --apply` refuses if a `--goa-*` token
   was dropped upstream: a component still referencing it loses its styling.
   Reconcile the component first (`grep -rn "<token>" src/components/`).
2. **New component props.** The component diff only _reports_ — implement the
   prop in the `.tsx`, reusing existing tokens, then update the matching
   `Visual fidelity audit.html` / dev playground entry if it's a visible change.
3. **Visual drift.** After any sync, re-run the dev playground (`npm run dev`)
   against the components the diff flagged.

## Notes

- After a token `--apply`, re-run `npm run typecheck` and `npm run build` —
  the published package's `.d.ts` output should always reflect `src/styles/goa-tokens.css`
  exactly.
- Coverage scope (which GoA "families"/variants are implemented as components
  vs. as props) is documented in the root `README.md`.

---

## Scripts

The two sync scripts live as real, runnable files in this directory (not
copy-into-repo code blocks — this is a real Node project, not a design canvas):

- [`diff-tokens.mjs`](./diff-tokens.mjs)
- [`diff-component-apis.mjs`](./diff-component-apis.mjs)
