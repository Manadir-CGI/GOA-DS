import React from "react";
import type { Spacing } from "../shared";

/**
 * Government of Alberta — Grid (goa-grid).
 * Responsive auto-fitting grid: children flow into as many equal columns
 * as fit above `minChildWidth`, then wrap. One gap controls both axes.
 */

/** Government of Alberta grid — responsive auto-fitting equal-column grid. */
export interface GoabGridProps {
  /** Minimum column width before wrapping, e.g. "20ch" or "240px". */
  minChildWidth?: string;
  /** Gap on both axes (token name or CSS length). Default "l". */
  gap?: Spacing | string;
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

const SCALE = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
function space(v?: string) {
  return v != null && SCALE.includes(v) ? `var(--goa-space-${v})` : v;
}

export function GoabGrid({
  minChildWidth = "20ch",
  gap = "l",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabGridProps) {
  const s: React.CSSProperties = {
    display: "grid",
    gap: space(gap),
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${minChildWidth}, 100%), 1fr))`,
    marginTop: space(mt),
    marginRight: space(mr),
    marginBottom: space(mb),
    marginLeft: space(ml),
    ...style,
  };
  return (
    <div style={s} data-testid={testId} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

export default GoabGrid;
