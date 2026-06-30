import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Filter chip (goa-filter-chip).
 * A removable token representing an applied filter or selection. The whole
 * chip is a button; clicking it fires onClick to remove the filter. Supports
 * an optional leading icon (outline / filled theme), smaller secondary text
 * shown before the label, and an error state.
 */

/**
 * Government of Alberta filter chip (goa-filter-chip) — a removable token that
 * represents an applied filter or selection. Clicking the chip fires `onClick`
 * to remove it. Render a row of them (e.g. inside GoabBlock) to show the
 * filters currently in effect.
 */
export type GoabFilterChipTheme = "outline" | "filled";

export interface GoabFilterChipProps {
  /** Text label of the chip. */
  content: string;
  /** Secondary text displayed in a smaller size before the main content. */
  secondaryText?: string;
  /** Icon displayed at the start of the chip (GoabIconType). */
  leadingIcon?: string;
  /** Theme style of the leading icon. Defaults to "outline". */
  iconTheme?: GoabFilterChipTheme;
  /** Shows an error state. */
  error?: boolean;
  /** Accessible label for the chip. Defaults to the content with a "removable" suffix. */
  ariaLabel?: string;
  /** Callback fired when the filter chip is clicked to remove it. */
  onClick?: () => void;
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
.goab-filterchip {
  display: inline-flex; align-items: center; gap: var(--goa-filter-chip-label-gap);
  min-height: var(--goa-filter-chip-min-height);
  padding-left: var(--goa-filter-chip-padding-horizontal-left);
  padding-right: var(--goa-filter-chip-padding-horizontal-right);
  background: var(--goa-filter-chip-bg-color);
  border: var(--goa-filter-chip-border);
  border-radius: var(--goa-filter-chip-border-radius);
  font: var(--goa-filter-chip-typography);
  color: var(--goa-filter-chip-text-color);
  white-space: nowrap; cursor: pointer;
  transition: background .12s ease, border-color .12s ease;
}
.goab-filterchip:hover { background: var(--goa-color-greyscale-100); }
.goab-filterchip:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: 2px; }
.goab-filterchip--error { border-color: var(--goa-color-emergency-default); }
.goab-filterchip__secondary { color: var(--goa-color-text-secondary); }
.goab-filterchip__icon { color: var(--goa-filter-chip-icon-color); font-size: var(--goa-icon-size-s); }
.goab-filterchip__close { display: inline-flex; align-items: center; color: var(--goa-filter-chip-icon-color); font-size: var(--goa-icon-size-s); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "filterchip");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabFilterChip({
  content,
  secondaryText,
  leadingIcon,
  iconTheme = "outline",
  error = false,
  ariaLabel,
  onClick,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabFilterChipProps) {
  useStyles();
  const cls = ["goab-filterchip"];
  if (error) cls.push("goab-filterchip--error");
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  // Resolve the leading icon name against the requested theme. If the caller
  // already passed a variant suffix (e.g. "pricetag-outline") it is honoured.
  let iconName = null;
  if (leadingIcon) {
    iconName = /-(outline|sharp)$/.test(leadingIcon)
      ? leadingIcon
      : iconTheme === "filled"
        ? leadingIcon
        : `${leadingIcon}-outline`;
  }
  return (
    <button
      type="button"
      className={cls.join(" ")}
      aria-label={ariaLabel || `${content}, removable`}
      onClick={onClick}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {secondaryText && <span className="goab-filterchip__secondary">{secondaryText}</span>}
      {iconName && <ion-icon className="goab-filterchip__icon" name={iconName}></ion-icon>}
      <span>{content}</span>
      <ion-icon className="goab-filterchip__close" name="close"></ion-icon>
    </button>
  );
}

export default GoabFilterChip;
