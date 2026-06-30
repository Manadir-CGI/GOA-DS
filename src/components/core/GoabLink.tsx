import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Link (goa-link).
 * Interactive-blue text link with optional leading/trailing Ionicon
 * and size variants. Use for navigation and inline actions.
 */

export type GoabLinkSize = "small" | "medium" | "large";
export type GoabLinkVariant = "default" | "dark";
export type GoabLinkColor = "interactive" | "dark" | "light";

/**
 * Government of Alberta link — an interactive-blue text link with optional
 * Ionicons, for navigation and inline actions.
 */
export interface GoabLinkProps {
  href?: string;
  size?: GoabLinkSize;
  /** dark = greyscale link for use on busy/coloured backgrounds. @deprecated use `color`. */
  variant?: GoabLinkVariant;
  /** Colour theme. "interactive" (blue, default), "dark" (black), "light" (white). */
  color?: GoabLinkColor;
  /** Custom action event name to dispatch when the link is clicked. */
  action?: string;
  /** Single argument to pass with the action event. */
  actionArg?: string;
  /** Object of arguments to pass with the action event. */
  actionArgs?: Record<string, unknown>;
  leadingIcon?: string;
  trailingIcon?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
.goab-link {
  display: inline-flex; align-items: center; gap: var(--goa-link-gap);
  color: var(--goa-link-color-interactive-default);
  text-decoration: underline; text-underline-offset: 3px;
  cursor: pointer; font-family: var(--goa-font-family-sans);
}
.goab-link:hover { color: var(--goa-link-color-interactive-hover); }
.goab-link:visited { color: var(--goa-link-color-interactive-visited); }
.goab-link:focus-visible { outline: var(--goa-link-border-focus); outline-offset: var(--goa-link-focus-offset); border-radius: var(--goa-link-border-radius-focus); }
.goab-link--small  { font: var(--goa-link-typography-small); }
.goab-link--medium { font: var(--goa-link-typography-medium); }
.goab-link--large  { font: var(--goa-link-typography-large); }
.goab-link--dark { color: var(--goa-link-color-dark-default); }
.goab-link--dark:hover { color: var(--goa-link-color-dark-hover); }
.goab-link--light { color: var(--goa-color-greyscale-white); }
.goab-link--light:hover { color: var(--goa-color-greyscale-100); }
.goab-link ion-icon { font-size: 1em; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "link");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabLink({
  href = "#",
  size = "medium",
  variant = "default",
  color,
  action,
  actionArg,
  actionArgs,
  leadingIcon,
  trailingIcon,
  mt,
  mr,
  mb,
  ml,
  testId,
  onClick,
  children,
  ...rest
}: GoabLinkProps) {
  useStyles();
  const colorClass = color || (variant === "dark" ? "dark" : "interactive");
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <a
      href={href}
      className={`goab-link goab-link--${size}${colorClass !== "interactive" ? ` goab-link--${colorClass}` : ""}`}
      onClick={onClick}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {leadingIcon && <ion-icon name={leadingIcon}></ion-icon>}
      <span>{children}</span>
      {trailingIcon && <ion-icon name={trailingIcon}></ion-icon>}
    </a>
  );
}

export default GoabLink;
