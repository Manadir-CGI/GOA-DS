import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import * as React from "react";
import * as DS from "../src/index";

/**
 * Smoke test: every exported Goab* component must render without throwing when
 * given a permissive bag of the props it commonly requires. This is the
 * regression net the sync automation leans on — if an upstream prop change or a
 * token rename breaks a component's render, this fails fast.
 */

// A broad prop bag covering the required props across the component set
// (arrays for anything that `.map`s, strings/labels for headings, etc.).
// Extra/unknown props are harmless — React ignores or spreads them.
const PROPS: Record<string, unknown> = {
  name: "field",
  label: "Label",
  heading: "Heading",
  text: "Text",
  content: "Content",
  title: "Title",
  value: "",
  href: "#",
  target: "_self",
  type: undefined, // let each component use its own default
  icon: "add",
  options: [],
  items: [],
  rows: [],
  headers: [],
  steps: [],
  navLinks: [],
  metaLinks: [],
  columns: [],
  data: [],
  // NB: intentionally no `children` — several components (GoabInput, GoabDivider)
  // spread `...rest` onto void elements (<input>, <hr>), and a stray `children`
  // in the bag would make React throw. Children aren't needed to smoke-render.
};

function isComponentName(key: string): boolean {
  return /^Goab[A-Z]/.test(key);
}

describe("Goab* component smoke render", () => {
  const exported = Object.keys(DS).filter(
    (k) => isComponentName(k) && typeof (DS as unknown as Record<string, unknown>)[k] === "function"
  );

  it("exports a substantial set of components", () => {
    // 50 components + sub-component exports (GoabTab, GoabRadioItem, aliases, etc.)
    expect(exported.length).toBeGreaterThanOrEqual(50);
  });

  for (const key of exported) {
    it(`renders <${key}> without throwing`, () => {
      const Comp = (DS as unknown as Record<string, React.ComponentType<Record<string, unknown>>>)[
        key
      ];
      expect(() => render(React.createElement(Comp, { ...PROPS }))).not.toThrow();
      cleanup();
    });
  }
});
