import React from "react";

/**
 * Government of Alberta — Button group (goa-button-group).
 * Arranges related buttons in a horizontal row (default) or a stack, with
 * GoA spacing and an alignment that follows the page's reading direction.
 */

/** Government of Alberta button group — related buttons in a row or stack. */
export interface GoabButtonGroupProps {
  /** start | center | end. Default "start". */
  alignment?: "start" | "center" | "end";
  /** Gap between buttons (spacing token or CSS length). Default "s". */
  gap?: string;
  direction?: "row" | "column";
  /** Margin (spacing token or CSS length) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const SCALE = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
function space(v?: string): string | undefined {
  return v != null && SCALE.includes(v) ? `var(--goa-space-${v})` : v;
}
const ALIGN: Record<string, string> = { start: "flex-start", center: "center", end: "flex-end" };

export function GoabButtonGroup({
  alignment = "start",
  gap = "m",
  direction = "row",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabButtonGroupProps) {
  const s: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "column" ? "column" : "row",
    gap: space(gap),
    justifyContent: direction === "column" ? undefined : ALIGN[alignment] || alignment,
    alignItems: direction === "column" ? ALIGN[alignment] || alignment : "center",
    flexWrap: "wrap",
    marginTop: space(mt),
    marginRight: space(mr),
    marginBottom: space(mb),
    marginLeft: space(ml),
    ...style,
  };
  return (
    <div
      className="goab-button-group"
      style={s}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

export default GoabButtonGroup;
