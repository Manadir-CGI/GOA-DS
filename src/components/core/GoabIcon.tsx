import React from "react";
import { space } from "../shared";

/**
 * Government of Alberta — Icon (goa-icon).
 * Thin wrapper over Ionicons (the GoA icon set) that maps the GoA size
 * scale and theme colours onto a single <ion-icon>.
 */

/**
 * Government of Alberta icon — a single graphic symbol from the GoA icon set
 * (Ionicons). Maps the GoA size scale and theme colours onto an <ion-icon>.
 */
export interface GoabIconProps {
  /** Ionicons name, e.g. "checkmark-circle" or "calendar-outline". */
  type: string;
  /** Size scale key (3xs…3xl) or any CSS length. Default "m". */
  size?: string;
  /** Colour theme or any CSS colour. Default "inherit". */
  theme?:
    | "default"
    | "secondary"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "inherit"
    | string;
  /** Accessible label; when set the icon is exposed to assistive tech. */
  title?: string;
  /** Defines how the icon will be announced by screen readers. */
  ariaLabel?: string;
  /** Custom fill colour (any valid CSS colour value). */
  fillColor?: string;
  /** Inverts the icon colour for use on dark backgrounds. */
  inverted?: boolean;
  /** Opacity from 0 (transparent) to 1 (opaque). Default 1. */
  opacity?: number;
  /** ARIA role. Use "presentation" for decorative icons. Default "img". */
  role?: string;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";
  mr?: "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";
  mb?: "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";
  ml?: "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const SIZES: Record<string, string> = {
  "3xs": "var(--goa-icon-size-3xs, 12px)",
  "2xs": "var(--goa-icon-size-2xs, 14px)",
  xs: "var(--goa-icon-size-xs, 16px)",
  s: "var(--goa-icon-size-s, 18px)",
  m: "var(--goa-icon-size-m, 20px)",
  l: "var(--goa-icon-size-l, 24px)",
  xl: "var(--goa-icon-size-xl, 32px)",
  "2xl": "var(--goa-icon-size-2xl, 40px)",
  "3xl": "var(--goa-icon-size-3xl, 48px)",
};
const THEMES: Record<string, string> = {
  default: "var(--goa-color-text-default)",
  secondary: "var(--goa-color-text-secondary)",
  primary: "var(--goa-color-interactive-default)",
  success: "var(--goa-color-success-default)",
  warning: "var(--goa-color-warning-default)",
  error: "var(--goa-color-emergency-default)",
  light: "var(--goa-color-greyscale-white)",
  inherit: "inherit",
};

export function GoabIcon({
  type,
  size = "m",
  theme = "inherit",
  title,
  ariaLabel,
  fillColor,
  inverted = false,
  opacity,
  role,
  mt,
  mr,
  mb,
  ml,
  testId,
  style,
  ...rest
}: GoabIconProps) {
  const label = ariaLabel || title;
  const s: React.CSSProperties = {
    fontSize: SIZES[size] || size,
    color: fillColor || (inverted ? "var(--goa-color-greyscale-white)" : THEMES[theme] || theme),
    display: "inline-flex",
    verticalAlign: "middle",
    marginTop: space(mt),
    marginRight: space(mr),
    marginBottom: space(mb),
    marginLeft: space(ml),
    ...(opacity != null ? { opacity } : null),
    ...style,
  };
  const resolvedRole = role || (label ? "img" : "presentation");
  return (
    <ion-icon
      name={type}
      role={resolvedRole}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      style={s}
      data-testid={testId}
      {...rest}
    ></ion-icon>
  );
}

export default GoabIcon;
