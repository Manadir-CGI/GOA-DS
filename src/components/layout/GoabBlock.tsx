import React from "react";
import type { Spacing } from "../shared";

/**
 * Government of Alberta — Block (goa-block).
 * Groups components in a row or column with one consistent gap from the
 * GoA spacing scale. The lightweight flex primitive used everywhere.
 */

/** Government of Alberta block — flex group with one consistent gap. */
export interface GoabBlockProps {
  /** Gap between children (token name or CSS length). Default "m". */
  gap?: Spacing | string;
  direction?: "row" | "column";
  /** align-items value. */
  alignment?: React.CSSProperties["alignItems"];
  /** justify-content value. */
  justifyContent?: React.CSSProperties["justifyContent"];
  wrap?: boolean;
  /** Maximum width of the block container (CSS length). */
  maxWidth?: string;
  /** Minimum width of the block container (CSS length). */
  minWidth?: string;
  /** Width of the block container (CSS length). */
  width?: string;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
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

export function GoabBlock({
  gap = "m",
  direction = "row",
  alignment,
  justifyContent,
  wrap = false,
  maxWidth,
  minWidth,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabBlockProps) {
  const s: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "column" ? "column" : "row",
    gap: space(gap),
    alignItems: alignment,
    justifyContent,
    flexWrap: wrap ? "wrap" : "nowrap",
    maxWidth,
    minWidth,
    width,
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

export default GoabBlock;
