import React from "react";
import type { Spacing } from "../shared";

/**
 * Government of Alberta — Spacer (goa-spacer).
 * A single box of empty space from the GoA spacing scale, for nudging
 * components apart when a layout container's gap isn't enough.
 */

/** Government of Alberta spacer — empty space from the GoA spacing scale. */
export interface GoabSpacerProps {
  /** Horizontal size (token name or any CSS length). */
  hSpacing?: Spacing | string;
  /** Vertical size (token name or any CSS length). */
  vSpacing?: Spacing | string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

const SCALE = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];

export function GoabSpacer({
  hSpacing = "none",
  vSpacing = "none",
  testId,
  ...rest
}: GoabSpacerProps) {
  const style: React.CSSProperties = {
    display: "block",
    width: SCALE.includes(hSpacing as string) ? `var(--goa-space-${hSpacing})` : hSpacing,
    height: SCALE.includes(vSpacing as string) ? `var(--goa-space-${vSpacing})` : vSpacing,
  };
  return (
    <span
      aria-hidden="true"
      style={style}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
    ></span>
  );
}

export default GoabSpacer;
