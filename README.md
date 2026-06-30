# @goa/design-system

> **Repository layout note.** `src/`, `examples/`, `sync/`, and `dev/` are the
> production npm package described below — ported from a Claude Design canvas
> prototype. `project/` and `chats/` are the original handoff bundle (the
> canvas source files and design-iteration transcripts) kept for provenance;
> they aren't part of the published package and don't need to be touched.

A faithful React + TypeScript recreation of the **Government of Alberta (GoA) Design System** — the design language behind Alberta.ca and the province's digital government services. This package is a production-ready npm library: real GoA design tokens, 50 components, an 845-icon set, a 152-illustration library, and 12 ready-to-use page templates.

> **Sources.** Recreated from the GoA open-source repositories — explore them for deeper fidelity or to extend this package further:
>
> - **UI components** (Svelte source of truth + React/Angular wrappers): https://github.com/GovAlta/ui-components
> - **Design tokens** (Style Dictionary output): https://github.com/GovAlta/design-tokens
> - **Live documentation & guidance:** https://design.alberta.ca
>
> `src/styles/goa-tokens.css` is imported **verbatim** from `@abgov/design-tokens` (`dist/tokens.css`). See [`sync/SYNC.md`](./sync/SYNC.md) for how this package stays in step with upstream.

---

## Install

```bash
npm install @goa/design-system react react-dom
```

Link the stylesheet once (e.g. in your app's root layout) and load Ionicons from CDN (used by `leadingIcon`/`trailingIcon` props and a handful of components):

```tsx
import "@goa/design-system/styles.css";
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"
></script>
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.js"
></script>
```

(The `Icon` component under the `/icons` subpath does **not** need Ionicons — it renders 845 icons from inline SVG path data, including the full GoA core set, Extended Ionicons outline/filled, and 88 brand logos. Use it when you need icons in contexts the Ionicons web component can't reach, e.g. static exports.)

## Usage

```tsx
import { GoabButton, GoabCallout, GoabFormItem, GoabInput } from "@goa/design-system";
import { Icon } from "@goa/design-system/icons";
import { Apprenticeship1 } from "@goa/design-system/illustrations";
import { StartPage } from "@goa/design-system/templates";
import "@goa/design-system/styles.css";

function Example() {
  return (
    <GoabCallout type="important" heading="Heads up">
      <GoabFormItem label="Full name">
        <GoabInput name="name" placeholder="Jane Doe" />
      </GoabFormItem>
      <GoabButton type="primary" leadingIcon="checkmark">
        Continue
      </GoabButton>
    </GoabCallout>
  );
}
```

Each subpath is its own bundle so you only ship what you use:

| Import                             | Contents                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `@goa/design-system`               | The 50 `Goab*` components (core, forms, layout, feedback, data, navigation) |
| `@goa/design-system/icons`         | `Icon` + 845-entry icon data (GoA core, Extended Ionicons, brand logos)     |
| `@goa/design-system/illustrations` | 152 Scene & Spot illustration components                                    |
| `@goa/design-system/templates`     | 12 composed page templates (see below)                                      |
| `@goa/design-system/styles.css`    | Global tokens + base styles (import once)                                   |
| `@goa/design-system/assets/*`      | GoA wordmark + UI glyph SVGs                                                |

---

## Product & context

The GoA Design System powers **citizen-facing government services** — benefit applications, permits, licences, account dashboards and informational pages on `alberta.ca`. Its priorities, in order:

1. **Accessibility (WCAG 2.2 AA)** — non-negotiable. Colour contrast, focus rings, hit targets and semantics are baked into the tokens.
2. **Clarity and trust** — plain language, calm neutral surfaces, a single confident brand teal, and unambiguous status colours.
3. **Consistency across frameworks** — one Svelte source compiled to web components, wrapped for React (`Goab*`) and Angular (`goab-*`) upstream. This package recreates the React surface as real, typed components (not web-component wrappers).

---

## Content fundamentals

How GoA writes copy — match this voice in any content you author with these components:

- **Plain language, grade 9 reading level.** Short sentences. Common words over jargon ("get" not "obtain", "help with the cost" not "financial assistance provision").
- **Second person, active voice.** Address the user as **"you"**; the government is **"we"**. e.g. _"You'll need your Alberta Health Care number."_ / _"We'll email you when a decision is made."_
- **Sentence case everywhere** — headings, buttons, labels, nav. Never Title Case or ALL CAPS for content. (Small uppercase eyebrows/labels with letter-spacing are an accepted decorative exception.)
- **Action-first buttons.** Verbs that name the outcome: _Start an application_, _Continue_, _View status_, _Download PDF_. Avoid "Submit" / "OK" / "Click here".
- **Direct, reassuring, neutral tone.** Tell people what they need, how long it takes, what happens next. No marketing hype, no exclamation marks, **no emoji**.
- **Numbers and money** use the mono/number type (`--goa-typography-number-*`): `$266`, `15 days`, reference numbers like `CCS-2026-48217`.
- **Specifics over vagueness.** "About 15 minutes", "5 business days", "$50,000–$89,999" rather than "a while" / "varies".

---

## Visual foundations

- **Colour.** A single brand teal — `--goa-color-brand-default` `#0081a2` (dark `#005072`, light `#c8eefa`) — used sparingly for brand moments and accents. The working interactive colour is **blue** `--goa-color-interactive-default` `#006dcc` (hover `#045092`) for links, primary buttons and focus. Generous **greyscale** neutrals (`#f8f8f8` → `#000`) carry most surfaces. Status: **success** green `#006f4c`, **emergency** red `#da291c`, **important/warning** amber `#f9ce2d`, **info** blue `#0077ad`. A muted **extended palette** (sky, prairie, lilac, dawn, sunset, pasture) is reserved for decorative/categorical use only.
- **Type.** **Acumin** (Adobe) is the UI typeface — `acumin-variable` for body/headings, `acumin-pro-semi-condensed` for legacy weights — with **Roboto Mono** for numbers/data. See [Font substitution](#font-substitution) below: this package ships with **Archivo** as the free fallback. Headings are bold/semi-bold with slightly negative letter-spacing; body is regular. Modular scale `heading-2xl` (48px) → `heading-2xs` (16px), `body-l` (24px) → `body-xs` (14px).
- **Spacing.** An 8-point-ish scale exposed as tokens: `3xs` 2 · `2xs` 4 · `xs` 8 · `s` 12 · `m` 16 · `l` 24 · `xl` 32 · `2xl` 48 · `3xl` 64 · `4xl` 128px. Layouts are roomy and left-aligned with a centered max-width column (~760px forms, ~1100px pages).
- **Corners.** Soft, consistent radii: inputs/buttons use `m` (8px), containers/cards use `xl`–`2xl` (12–16px), pills/badges use `s` (6px), chips are fully round.
- **Borders & elevation.** Thin hairline borders (1px greyscale-150/200) far more than shadow. Elevation is soft and low (`--goa-shadow-raised-light` for popovers/menus, `--goa-shadow-modal` for dialogs). Inputs use an inset box-shadow border that thickens on hover and turns blue on focus.
- **Backgrounds.** Predominantly flat white and light grey — no gradients, no textures. The one bold moment is a solid brand-dark teal hero band with white text.
- **Interaction & motion.** Restrained. Buttons shift down 2px on press (`translateY(2px)`) and transition colour over ~200ms; focus shows a 2–3px solid blue outline (never removed). Motion durations live in `--goa-motion-duration-*` (mostly 70–350ms) with gentle easing; nothing bounces, nothing loops.

### Font substitution

**Acumin is a licensed Adobe Fonts (Typekit) family.** `src/styles/fonts.css` ships with **Archivo** (Google Fonts) as the fallback, placed right after `acumin-variable` in the font stack.

**To drop in the real Acumin (one line):** open `src/styles/fonts.css` and either:

- **(A)** uncomment the Typekit `@import` line near the top and paste your Adobe Fonts **Project ID** — `@import url("https://use.typekit.net/XXXXXXX.css");`, or
- **(B)** drop `.woff2` files into a fonts directory and point the `src:` URLs at them.

The `acumin-variable` / `acumin-pro-semi-condensed` family names are already wired everywhere else.

---

## Iconography

- The GoA system uses **Ionicons** (https://ionic.io/ionicons) for general UI icon props (`leadingIcon`, `trailingIcon`, etc. — pass an Ionicons name string; load the web component from CDN, see Install above).
- For standalone icon rendering (no CDN dependency, works in static exports), use `@goa/design-system/icons`' `Icon` component — 845 entries: GoA core (`Goa*`), Extended Ionicons outline + filled (`<Name>VariantOutline`/`VariantFilled`), and 88 brand logos (`Logo*`). See its TypeDoc / the `IconData` export for the full name list.
- **Style:** prefer **outline** variants for general UI; **filled** for small inline status marks. Icon sizes use `--goa-icon-size-*` (16→40px).
- **No emoji, no hand-drawn SVG.** Status meaning is carried by colour **and** an icon, never colour alone.

---

## Templates

`@goa/design-system/templates` ships 12 composed, typed page templates built entirely from the primitive components — copy them into your app and adapt, or render them directly with props:

- **Citizen service journey** — `StartPage`, `PublicForm`, `QuestionPage`, `ReviewPage`, `ResultPage`, `CitizenServiceFlow`
- **Pages & layouts** — `BasicPage`, `TaskListPage`, `CardGrid`, `ServicePage`
- **Staff / case management** — `Workspace`, `ReviewAndAction`

Each template's source lives in `src/templates/<slug>/` if you'd rather copy-and-adapt the JSX directly than consume the compiled export.

## Examples

The repo-root `examples/` directory has 82 small, focused usage patterns (one file per pattern, named after the original GoA examples — e.g. `examples/warn-a-user-of-a-deadline.tsx`, `examples/ask-a-user-for-an-address.tsx`). These aren't published as part of the npm package; they're a cookbook to read or copy from directly in this repo.

---

## Keeping this in sync with upstream GoA

See [`sync/SYNC.md`](./sync/SYNC.md) — a token-diff script (npm-sourced, immutable artifact), a component-API-diff script (GitHub release-tag sourced), and a weekly GitHub Action (`.github/workflows/sync-goa.yml`) that opens a PR for token updates and reports component API drift for human implementation.

---

## Local development

```bash
npm install
npm run dev         # Vite playground at http://localhost:5173 — renders live components/templates
npm run typecheck   # tsc --noEmit across src/, dev/, examples/
npm run build        # tsup — emits dist/ (ESM + CJS + .d.ts) for each subpath entry
```

## Package manifest

- `src/styles/` — `index.css` (entry point, import-only), `goa-tokens.css` (1,343 tokens, verbatim from `@abgov/design-tokens`), `fonts.css`, `base.css`, `illustration-tokens.css`.
- `src/components/` — `core/`, `forms/`, `layout/`, `feedback/`, `data/`, `navigation/` — the 50 `Goab*` components, each a single typed `.tsx` file.
- `src/icons/` — `Icon.tsx` + `icon-data.ts` (845 entries).
- `src/illustrations/` — 152 typed illustration components.
- `src/templates/` — 12 page templates, each in its own folder.
- `src/assets/` — `goa-logo.svg`, `arrow-down.svg`, `arrows-both.svg`.
- `examples/` — 82 standalone usage-pattern files (not published).
- `sync/` — token/component-API diff scripts + runbook.
- `dev/` — the local Vite playground used for visual verification during development.
