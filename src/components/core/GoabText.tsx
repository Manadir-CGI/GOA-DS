import React from "react";

/**
 * Government of Alberta — Text (goa-text).
 * Applies consistent type size, colour and block spacing to written
 * content. Renders the tag you ask for (p, h1–h6, span) with GoA
 * typography tokens.
 */

/**
 * Government of Alberta text — consistent type size, colour and spacing for
 * written content. Renders the tag you ask for with GoA typography tokens.
 */
export interface GoabTextProps {
  /** Sets the id attribute on the element. */
  id?: string;
  /** Element to render. Default "p". */
  tag?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Typography token suffix, e.g. "heading-l", "body-m", "body-s". */
  size?: string;
  /** Colour preset or any CSS colour. */
  color?: "default" | "secondary" | "light" | "link" | "error" | "success" | string;
  /** Top margin (spacing token or CSS length). */
  mt?: string;
  /** Bottom margin (spacing token or CSS length). */
  mb?: string;
  /** Right margin (spacing token or CSS length). */
  mr?: string;
  /** Left margin (spacing token or CSS length). */
  ml?: string;
  /** Max line width for readability, e.g. "60ch". */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const SCALE = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
function space(v?: string): string | undefined {
  return v == null ? undefined : SCALE.includes(v) ? `var(--goa-space-${v})` : v;
}

const COLORS: Record<string, string> = {
  default: "var(--goa-color-text-default)",
  secondary: "var(--goa-color-text-secondary)",
  light: "var(--goa-color-greyscale-white)",
  link: "var(--goa-color-interactive-default)",
  error: "var(--goa-color-emergency-default)",
  success: "var(--goa-color-success-default)",
};

export function GoabText({
  tag = "p",
  size = "body-m",
  color = "default",
  mt,
  mb,
  mr,
  ml,
  maxWidth,
  testId,
  children,
  style,
  ...rest
}: GoabTextProps) {
  const Tag = tag as React.ElementType;
  const s: React.CSSProperties = {
    font: `var(--goa-typography-${size})`,
    color: COLORS[color] || color,
    marginTop: space(mt) ?? 0,
    marginBottom: space(mb) ?? 0,
    marginRight: space(mr),
    marginLeft: space(ml),
    maxWidth,
    textWrap: "pretty",
    ...style,
  };
  return (
    <Tag style={s} data-testid={testId} {...(rest as React.HTMLAttributes<HTMLElement>)}>
      {children}
    </Tag>
  );
}

export default GoabText;
