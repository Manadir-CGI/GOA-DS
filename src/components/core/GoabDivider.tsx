import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Divider (goa-divider).
 * A horizontal rule using the GoA divider colour, with optional
 * vertical spacing via the spacing tokens.
 */

/**
 * Government of Alberta divider — a hairline horizontal rule for separating
 * content sections.
 */
export interface GoabDividerProps {
  /** Vertical margin around the rule. */
  spacing?: "none" | "s" | "m" | "l" | "xl";
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

const CSS = `
.goab-divider { border: none; border-top: var(--goa-border-width-s) solid var(--goa-divider-color); margin: 0; }
.goab-divider--s  { margin: var(--goa-space-s) 0; }
.goab-divider--m  { margin: var(--goa-space-m) 0; }
.goab-divider--l  { margin: var(--goa-space-l) 0; }
.goab-divider--xl { margin: var(--goa-space-xl) 0; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "divider");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabDivider({
  spacing = "none",
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabDividerProps) {
  useStyles();
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <hr
      className={`goab-divider${spacing !== "none" ? ` goab-divider--${spacing}` : ""}`}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLHRElement>)}
    />
  );
}

export default GoabDivider;
