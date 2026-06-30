import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Page block (goa-page-block).
 * A full-width horizontal band whose inner content is centred and capped
 * to a readable max width. Use to section a page; pair with a background.
 */

/** Government of Alberta page block — full-width band with centred, width-capped content. */
export interface GoabPageBlockProps {
  /** Inner max width preset or any CSS length. Default "default" (1224px). */
  width?: "full" | "wide" | "default" | "narrow" | string;
  /** Optional full-bleed background (colour or CSS background). */
  background?: string;
  /** Vertical padding (CSS length). */
  padding?: string;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const WIDTHS: Record<string, string> = {
  full: "100%",
  wide: "1400px",
  default: "1224px",
  narrow: "832px",
};

export function GoabPageBlock({
  width = "default",
  background,
  padding = "var(--goa-space-2xl)",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabPageBlockProps) {
  const outer: React.CSSProperties = { width: "100%", background, ...style };
  if (mt != null) outer.marginTop = space(mt);
  if (mr != null) outer.marginRight = space(mr);
  if (mb != null) outer.marginBottom = space(mb);
  if (ml != null) outer.marginLeft = space(ml);
  const inner: React.CSSProperties = {
    maxWidth: WIDTHS[width] || width,
    margin: "0 auto",
    paddingLeft: "var(--goa-space-l)",
    paddingRight: "var(--goa-space-l)",
    paddingTop: padding,
    paddingBottom: padding,
    boxSizing: "border-box",
  };
  return (
    <div style={outer} data-testid={testId} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      <div style={inner}>{children}</div>
    </div>
  );
}

export default GoabPageBlock;
