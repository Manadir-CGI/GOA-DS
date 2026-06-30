import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Tooltip (goa-tooltip).
 * A small dark bubble revealed on hover/focus of its target.
 */

/**
 * Government of Alberta tooltip — a small dark bubble revealed on hover/focus.
 * Wrap the trigger element as children.
 */
export interface GoabTooltipProps {
  /** Tooltip text/content. */
  content: React.ReactNode;
  /** Bubble placement relative to the trigger. */
  position?: "top" | "bottom";
  /** Horizontal alignment of the tooltip relative to the trigger. Default "center". */
  hAlign?: "left" | "center" | "right";
  /** Maximum width of the tooltip (must use a px unit). */
  maxWidth?: string;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

const CSS = `
.goab-tooltip { position: relative; display: inline-flex; }
.goab-tooltip__bubble {
  position: absolute; z-index: 100;
  bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: var(--goa-tooltip-color-bg);
  color: var(--goa-tooltip-color-text);
  font: var(--goa-tooltip-text-size);
  padding: var(--goa-tooltip-padding);
  border-radius: var(--goa-tooltip-border-radius);
  max-width: var(--goa-tooltip-max-width);
  width: max-content; white-space: normal;
  opacity: 0; pointer-events: none; transition: opacity .12s ease;
  box-shadow: var(--goa-shadow-raised-light);
}
.goab-tooltip__bubble::after {
  content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  border: 6px solid transparent; border-top-color: var(--goa-tooltip-color-bg);
}
.goab-tooltip:hover .goab-tooltip__bubble,
.goab-tooltip:focus-within .goab-tooltip__bubble { opacity: 1; }
.goab-tooltip__bubble--bottom { bottom: auto; top: calc(100% + 8px); }
.goab-tooltip__bubble--bottom::after { top: auto; bottom: 100%; border-top-color: transparent; border-bottom-color: var(--goa-tooltip-color-bg); }
.goab-tooltip__bubble--left { left: 0; transform: none; }
.goab-tooltip__bubble--left::after { left: 16px; }
.goab-tooltip__bubble--right { left: auto; right: 0; transform: none; }
.goab-tooltip__bubble--right::after { left: auto; right: 16px; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "tooltip");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabTooltip({
  content,
  position = "top",
  hAlign = "center",
  maxWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabTooltipProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <span
      className="goab-tooltip"
      tabIndex={0}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      {children}
      <span
        className={`goab-tooltip__bubble${position === "bottom" ? " goab-tooltip__bubble--bottom" : ""}${hAlign !== "center" ? ` goab-tooltip__bubble--${hAlign}` : ""}`}
        role="tooltip"
        style={maxWidth ? { maxWidth } : undefined}
      >
        {content}
      </span>
    </span>
  );
}

export default GoabTooltip;
