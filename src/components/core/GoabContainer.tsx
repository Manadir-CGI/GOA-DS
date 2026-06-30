import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Container (goa-container).
 * The workhorse surface: a rounded, bordered box with optional
 * coloured top accent and heading. Use to group related content.
 */

export type GoabContainerType =
  "interactive" | "non-interactive" | "info" | "success" | "important" | "error";
export type GoabContainerAccent = "none" | "thin" | "thick";
export type GoabContainerPadding = "relaxed" | "compact";
export type GoabContainerWidth = "full" | (string & {});

/**
 * Government of Alberta container — a rounded, bordered surface used to group
 * related content, with an optional coloured top accent and heading.
 */
export interface GoabContainerProps {
  /** Border / accent colour intent. */
  type?: GoabContainerType;
  /** Coloured bar across the top edge. */
  accent?: GoabContainerAccent;
  /** Inner padding. relaxed (32px) or compact (16px). */
  padding?: GoabContainerPadding;
  /** Width of the container. "full" (default) or any CSS length. */
  width?: GoabContainerWidth;
  /** Maximum width (any CSS length). */
  maxWidth?: string;
  /** Maximum height (any CSS length). */
  maxHeight?: string;
  /** Minimum height (any CSS length). */
  minHeight?: string;
  /** Optional heading row. */
  heading?: string;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CSS = `
.goab-container {
  border-radius: var(--goa-container-border-radius);
  border: var(--goa-container-border);
  background: var(--goa-color-greyscale-white);
  overflow: hidden;
  box-sizing: border-box;
}
.goab-container__accent { width: 100%; }
.goab-container__accent--thin  { height: var(--goa-container-accent-thin-height); }
.goab-container__accent--thick { height: var(--goa-container-accent-thick-height); }
.goab-container__heading {
  font: var(--goa-typography-heading-s);
  padding: var(--goa-space-s) var(--goa-container-padding);
  margin: 0;
}
.goab-container__inner { padding: var(--goa-container-padding); }
.goab-container--compact .goab-container__inner { padding: var(--goa-container-padding-compact); }

.goab-container--interactive { border-color: var(--goa-color-brand-default); }
.goab-container--interactive .goab-container__accent { background: var(--goa-color-brand-default); }
.goab-container--non-interactive { border-color: var(--goa-color-greyscale-200); }
.goab-container--non-interactive .goab-container__accent { background: var(--goa-color-greyscale-400); }
.goab-container--info { border-color: var(--goa-color-info-border); }
.goab-container--info .goab-container__accent { background: var(--goa-color-info-default); }
.goab-container--success { border-color: var(--goa-color-success-border); }
.goab-container--success .goab-container__accent { background: var(--goa-color-success-default); }
.goab-container--important { border-color: var(--goa-color-warning-border); }
.goab-container--important .goab-container__accent { background: var(--goa-color-warning-default); }
.goab-container--error { border-color: var(--goa-color-emergency-border); }
.goab-container--error .goab-container__accent { background: var(--goa-color-emergency-default); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "container");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabContainer({
  type = "interactive",
  accent = "none",
  padding = "relaxed",
  width,
  maxWidth,
  maxHeight,
  minHeight,
  heading,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabContainerProps) {
  useStyles();
  const classes = ["goab-container", `goab-container--${type}`];
  if (padding === "compact") classes.push("goab-container--compact");
  const mergedStyle: React.CSSProperties = { ...style };
  if (mt != null) mergedStyle.marginTop = space(mt);
  if (mr != null) mergedStyle.marginRight = space(mr);
  if (mb != null) mergedStyle.marginBottom = space(mb);
  if (ml != null) mergedStyle.marginLeft = space(ml);
  if (width != null) mergedStyle.width = width === "full" ? "100%" : width;
  if (maxWidth != null) mergedStyle.maxWidth = maxWidth;
  if (maxHeight != null) mergedStyle.maxHeight = maxHeight;
  if (minHeight != null) mergedStyle.minHeight = minHeight;
  return (
    <div
      className={classes.join(" ")}
      style={mergedStyle}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {accent !== "none" && (
        <div className={`goab-container__accent goab-container__accent--${accent}`}></div>
      )}
      {heading && <h3 className="goab-container__heading">{heading}</h3>}
      <div className="goab-container__inner">{children}</div>
    </div>
  );
}

export default GoabContainer;
