import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Badge (goa-badge / GoabBadge)
 * Small label holding information, system feedback, or state. Matches the GoA
 * Design System documented API: full `type` palette, `emphasis` (strong |
 * subtle, default strong), `size` (medium | large, default medium), `icontype`,
 * `ariaLabel`, `minWidth`, `justifyContent` and spacing margins.
 *
 * Semantic types are token-backed (exact). Decorative palette colours use the
 * real GoA extended tokens (--goa-color-extended-<name>-*) with safe fallbacks.
 */

export type GoabBadgeType =
  | "information"
  | "important"
  | "emergency"
  | "success"
  | "dark"
  | "midtone"
  | "light"
  | "archived"
  | "default"
  | "aqua"
  | "black"
  | "blue"
  | "green"
  | "orange"
  | "pink"
  | "red"
  | "violet"
  | "white"
  | "yellow"
  | "aqua-light"
  | "black-light"
  | "blue-light"
  | "green-light"
  | "orange-light"
  | "pink-light"
  | "red-light"
  | "violet-light"
  | "yellow-light"
  | "sky"
  | "prairie"
  | "lilac"
  | "pasture"
  | "sunset"
  | "dawn";

export type GoabBadgeEmphasis = "strong" | "subtle";
export type GoabBadgeSize = "medium" | "large";
export type GoabBadgeJustify = "center" | "flex-start" | "flex-end" | "space-between";

/**
 * Government of Alberta badge — a small label holding a small amount of
 * information, system feedback, or a state. Match the badge type to the status
 * it represents; use sentence case and short, concise text.
 */
export interface GoabBadgeProps {
  /** Context and colour of the badge. Defaults to "information". */
  type?: GoabBadgeType;
  /** Text label of the badge. */
  content?: string;
  /** Visual emphasis: "strong" (solid) or "subtle" (tinted + border). Defaults to "strong". */
  emphasis?: GoabBadgeEmphasis;
  /** Size of the badge. Defaults to "medium". */
  size?: GoabBadgeSize;
  /** Icon type (Ionicons name) to display in the badge. Preferred over `icon`. */
  icontype?: string;
  /** Icon type to display in the badge (alias of `icontype`). */
  iconType?: string;
  /** When `true`, shows the matching status icon for the type; or pass an icon name. */
  icon?: boolean | string;
  /** Accessible label for screen readers — required when the badge is icon-only. */
  ariaLabel?: string;
  /** min-width of the badge container (CSS length, e.g. "20px"). */
  minWidth?: string;
  /** justify-content of the badge container. */
  justifyContent?: GoabBadgeJustify;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CSS = `
.goab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--goa-badge-gap);
  padding: var(--goa-badge-padding);
  border-radius: var(--goa-badge-border-radius);
  font-family: var(--goa-font-family-sans);
  font-size: var(--goa-badge-font-size);
  line-height: var(--goa-badge-line-height);
  font-weight: var(--goa-font-weight-regular);
  height: var(--goa-badge-height);
  box-sizing: border-box;
  white-space: nowrap;
}
.goab-badge--large { font-size: var(--goa-badge-font-size-large); line-height: var(--goa-badge-line-height-large); height: var(--goa-badge-height-large); }
.goab-badge ion-icon { font-size: var(--goa-badge-icon-size); }

/* strong (filled) — semantic */
.goab-badge--information { background: var(--goa-badge-info-color-bg); color: var(--goa-badge-info-color-content); }
.goab-badge--success     { background: var(--goa-badge-success-color-bg); color: var(--goa-badge-success-color-content); }
.goab-badge--important   { background: var(--goa-badge-important-color-bg); color: var(--goa-badge-important-color-content); }
.goab-badge--emergency   { background: var(--goa-badge-emergency-color-bg); color: var(--goa-badge-emergency-color-content); }
.goab-badge--dark        { background: var(--goa-badge-default-color-bg); color: var(--goa-color-greyscale-white); }
.goab-badge--default, .goab-badge--midtone, .goab-badge--archived { background: var(--goa-badge-archived-color-bg); color: var(--goa-badge-archived-color-content); }
.goab-badge--light       { background: var(--goa-color-greyscale-100); color: var(--goa-color-greyscale-700); }

/* subtle — semantic */
.goab-badge--subtle.goab-badge--information { background: var(--goa-badge-info-subtle-color-bg); color: var(--goa-badge-info-subtle-color-content); box-shadow: var(--goa-badge-info-subtle-border); }
.goab-badge--subtle.goab-badge--success     { background: var(--goa-badge-success-subtle-color-bg); color: var(--goa-badge-success-subtle-color-content); box-shadow: var(--goa-badge-success-subtle-border); }
.goab-badge--subtle.goab-badge--important   { background: var(--goa-badge-important-subtle-color-bg); color: var(--goa-badge-important-subtle-color-content); box-shadow: var(--goa-badge-important-subtle-border); }
.goab-badge--subtle.goab-badge--emergency   { background: var(--goa-badge-emergency-subtle-color-bg); color: var(--goa-badge-emergency-subtle-color-content); box-shadow: var(--goa-badge-emergency-subtle-border); }
.goab-badge--subtle.goab-badge--dark, .goab-badge--subtle.goab-badge--default, .goab-badge--subtle.goab-badge--midtone, .goab-badge--subtle.goab-badge--archived, .goab-badge--subtle.goab-badge--light {
  background: var(--goa-badge-default-subtle-color-bg); color: var(--goa-badge-archived-color-content); box-shadow: var(--goa-badge-default-subtle-border);
}
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "badge");
  el.textContent = CSS;
  document.head.appendChild(el);
}

// Default status icons for the semantic types (used when icon === true).
const ICONS: Record<string, string> = {
  information: "information-circle",
  success: "checkmark-circle",
  important: "warning",
  emergency: "alert-circle",
};

// Fallback hexes (used only if the matching --goa-color-extended-<name> token is absent).
const DECO: Record<string, string> = {
  aqua: "#1d8ea3",
  black: "#1f2020",
  blue: "#0070c4",
  green: "#007a3d",
  orange: "#c4541a",
  pink: "#c4257e",
  red: "#cc2e2e",
  violet: "#6b4fbb",
  white: "#ffffff",
  yellow: "#f4c430",
  sky: "#4a90c2",
  prairie: "#b07a2e",
  lilac: "#9a86c9",
  pasture: "#5a9e6f",
  sunset: "#d2603a",
  dawn: "#cf8aa0",
};
const DECO_DARK_TEXT = new Set(["white", "yellow"]);

export function GoabBadge({
  type = "information",
  content = "",
  emphasis = "strong",
  size = "medium",
  icon = false,
  icontype,
  iconType,
  ariaLabel,
  minWidth,
  justifyContent,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  ...rest
}: GoabBadgeProps) {
  useStyles();

  // "-light" decorative variants render as a tinted (subtle) treatment.
  let base: string = type;
  let lightVariant = false;
  if (typeof type === "string" && type.endsWith("-light")) {
    base = type.slice(0, -6);
    lightVariant = true;
  }
  const deco = DECO[base];
  const subtle = emphasis === "subtle" || lightVariant;

  const classes = ["goab-badge"];
  if (size === "large") classes.push("goab-badge--large");
  if (!deco) {
    classes.push(`goab-badge--${base}`);
    if (subtle) classes.push("goab-badge--subtle");
  }

  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  if (minWidth) style.minWidth = minWidth;
  if (justifyContent) style.justifyContent = justifyContent;
  if (deco) {
    if (subtle) {
      style.background = `var(--goa-color-extended-${base}-light, var(--goa-color-greyscale-100))`;
      style.color = `var(--goa-color-extended-${base}-text-dark, var(--goa-color-greyscale-700))`;
      style.boxShadow = `inset 0 0 0 1px var(--goa-color-extended-${base}-border, var(--goa-color-greyscale-300))`;
    } else {
      style.background = `var(--goa-color-extended-${base}-default, ${deco})`;
      style.color = DECO_DARK_TEXT.has(base)
        ? `var(--goa-color-extended-${base}-text, var(--goa-color-text-default))`
        : `var(--goa-color-extended-${base}-text, var(--goa-color-greyscale-white))`;
    }
  }

  const iconName =
    typeof icon === "string" ? icon : icontype || iconType || (icon === true ? ICONS[base] : null);
  const label = content !== "" && content != null ? content : children;

  return (
    <span
      className={classes.join(" ")}
      style={Object.keys(style).length ? style : undefined}
      aria-label={ariaLabel}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {iconName && <ion-icon name={iconName}></ion-icon>}
      {label != null && label !== "" && <span>{label}</span>}
    </span>
  );
}

export default GoabBadge;
