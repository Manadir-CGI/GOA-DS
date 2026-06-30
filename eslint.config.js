// Flat ESLint config. Intentionally lenient: this codebase is a faithful port
// of an existing design system, so stylistic churn isn't the goal — we lint for
// real correctness smells (react-hooks rules) and let Prettier own formatting.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      // The original Claude Design canvas bundle + transcripts — provenance
      // only, not part of the package and not ours to lint.
      "project/**",
      "chats/**",
      // Generated icon data: a single 1.6MB object literal, not hand-edited.
      "src/icons/icon-data.ts",
      // Illustrations are machine-materialized from Figma (huge inline-SVG
      // float geometry, single-variant) — generated artifacts, not hand-edited.
      "src/illustrations/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      // The two stable, conventional hook rules. (react-hooks@7's full
      // `recommended` also turns on experimental perf-lints like
      // set-state-in-effect / static-components, which flag patterns this
      // faithful port inherited verbatim — out of scope for a port, so we
      // don't gate CI on them.)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // The port leans on index signatures + permissive casts to mirror the
      // original prop-spreading behavior faithfully; don't fight that.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      // The port faithfully keeps the original's `onChange && onChange(...)`
      // short-circuit call idiom; allow it rather than rewrite behavior.
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
  {
    // Node CLI scripts + config files run in Node, not the browser.
    files: ["sync/**/*.mjs", "scripts/**/*.mjs", "*.config.{js,ts}", "eslint.config.js"],
    languageOptions: {
      globals: { process: "readonly", console: "readonly", Buffer: "readonly" },
    },
  },
  prettier
);
