import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Icon button (goa-icon-button).
 * Icon-only action. Variants for default/dark/destructive, three sizes.
 */

export type GoabIconButtonVariant = "default" | "dark" | "destructive";
export type GoabIconButtonSize = "small" | "medium" | "large";
export type GoabIconTheme = "outline" | "filled";

/**
 * Government of Alberta icon button — an icon-only action (close, edit, more).
 * Always provide `ariaLabel`.
 */
export interface GoabIconButtonProps {
  /** Ionicons name. */
  icon: string;
  variant?: GoabIconButtonVariant;
  size?: GoabIconButtonSize;
  /** Icon theme. "outline" (default) for stroked icons, "filled" for solid. */
  theme?: GoabIconTheme;
  /** Sets the title attribute (tooltip) on the button. */
  title?: string;
  /** Action identifier passed in click events for event-delegation patterns. */
  action?: string;
  /** Single argument value passed with the action. */
  actionArg?: string;
  /** Multiple argument values passed with the action. */
  actionArgs?: Record<string, unknown>;
  /** Accessible label (required — the button has no visible text). */
  ariaLabel: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

const CSS = `
.goab-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer;
  border-radius: var(--goa-icon-button-border-radius);
  color: var(--goa-icon-button-default-color);
  transition: background-color .15s ease, color .15s ease;
}
.goab-icon-btn--small  { padding: var(--goa-icon-button-small-padding); }
.goab-icon-btn--medium { padding: var(--goa-icon-button-medium-padding); }
.goab-icon-btn--large  { padding: var(--goa-icon-button-large-padding); border-radius: var(--goa-icon-button-large-border-radius); }
.goab-icon-btn--small ion-icon  { font-size: var(--goa-icon-size-m); }
.goab-icon-btn--medium ion-icon { font-size: var(--goa-icon-size-l); }
.goab-icon-btn--large ion-icon  { font-size: var(--goa-icon-size-xl); }
.goab-icon-btn:hover { background: var(--goa-icon-button-default-hover-color-bg); color: var(--goa-icon-button-default-hover-color); }
.goab-icon-btn:focus-visible { outline: var(--goa-icon-button-focus-border-width) solid var(--goa-icon-button-focus-border-color); outline-offset: 1px; }

.goab-icon-btn--dark { color: var(--goa-icon-button-dark-color); }
.goab-icon-btn--dark:hover { background: var(--goa-icon-button-dark-hover-color-bg); }
.goab-icon-btn--destructive { color: var(--goa-icon-button-destructive-color); }
.goab-icon-btn--destructive:hover { background: var(--goa-icon-button-destructive-hover-color-bg); color: var(--goa-icon-button-destructive-hover-color); }
.goab-icon-btn:disabled { color: var(--goa-icon-button-default-disabled-color); cursor: not-allowed; background: none; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "icon-button");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabIconButton({
  icon,
  variant = "default",
  size = "medium",
  theme = "outline",
  title,
  ariaLabel,
  disabled = false,
  action,
  actionArg,
  actionArgs,
  mt,
  mr,
  mb,
  ml,
  testId,
  onClick,
  ...rest
}: GoabIconButtonProps) {
  useStyles();
  const iconName = /-(outline|sharp)$/.test(icon)
    ? icon
    : theme === "filled"
      ? icon
      : `${icon}-outline`;
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <button
      type="button"
      className={`goab-icon-btn goab-icon-btn--${size} goab-icon-btn--${variant}`}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ion-icon name={iconName}></ion-icon>
    </button>
  );
}

export default GoabIconButton;
