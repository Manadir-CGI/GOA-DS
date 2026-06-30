import * as React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Button (goa-button / GoabButton)
 * Self-contained React recreation that styles from GoA design tokens.
 * Injects the component stylesheet once so hover/active/focus states
 * match the Svelte source of truth.
 */

export type GoabButtonType = "primary" | "secondary" | "tertiary" | "start" | "submit";
export type GoabButtonSize = "normal" | "compact";
export type GoabButtonVariant = "normal" | "destructive" | "inverse" | "dark";

export interface GoabButtonProps {
  /** Visual emphasis. primary = main action, secondary = alternative, tertiary = low emphasis, start = prominent CTA. */
  type?: GoabButtonType;
  /** Use compact for inline / space-constrained actions. Default normal. */
  size?: GoabButtonSize;
  /** Semantic color variant. destructive for irreversible actions; inverse for dark backgrounds. */
  variant?: GoabButtonVariant;
  /** Prevents interaction and applies disabled styling. */
  disabled?: boolean;
  /** Ionicons name shown before the label (e.g. "add", "download"). */
  leadingIcon?: string | null;
  /** Ionicons name shown after the label (e.g. "arrow-forward"). */
  trailingIcon?: string | null;
  /** Custom width, e.g. "100%" or "12rem". */
  width?: string;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Action identifier passed in click events for event-delegation patterns. */
  action?: string;
  /** Single argument value passed with the action. */
  actionArg?: string;
  /** Multiple argument values passed with the action. */
  actionArgs?: Record<string, unknown>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  /** Any other prop is passed through to the root <button> element. */
  [key: string]: unknown;
}

const CSS = `
.goab-btn {
  display: inline-flex;
  box-sizing: border-box;
  border-radius: var(--goa-button-border-radius);
  cursor: pointer;
  font: var(--goa-button-text);
  height: var(--goa-button-height);
  letter-spacing: var(--goa-button-letter-spacing);
  padding: 0 var(--goa-space-xl);
  white-space: nowrap;
  gap: var(--goa-button-gap);
  align-items: center;
  justify-content: center;
  border: var(--goa-border-width-none) solid transparent;
  transition: transform .1s ease-in-out, background-color .2s ease-in-out,
    border-color .2s ease-in-out, color .2s ease-in-out;
}
.goab-btn .goab-btn__text { padding-bottom: 0.1rem; }
.goab-btn:active { transform: translateY(2px); }
.goab-btn:focus-visible {
  outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  outline-offset: var(--goa-button-outline-offset);
}
.goab-btn:disabled { pointer-events: none; opacity: .5; }
.goab-btn ion-icon { font-size: var(--goa-icon-size-4); }

/* sizes */
.goab-btn--compact { height: var(--goa-button-height-compact); font: var(--goa-button-text-compact); padding: 0 var(--goa-space-m); gap: var(--goa-button-compact-gap); }
.goab-btn--start   { height: var(--goa-button-height-start); font: var(--goa-button-text-start); padding: 0 var(--goa-space-xl); }

/* primary / start */
.goab-btn--primary, .goab-btn--start {
  background-color: var(--goa-button-primary-color-bg);
  color: var(--goa-color-greyscale-white);
}
.goab-btn--primary:hover, .goab-btn--start:hover { background-color: var(--goa-button-primary-hover-color-bg); }
.goab-btn--primary.goab-btn--destructive { background-color: var(--goa-button-primary-destructive-color-bg); }
.goab-btn--primary.goab-btn--destructive:hover { background-color: var(--goa-button-primary-destructive-hover-color-bg); }

/* secondary */
.goab-btn--secondary {
  background-color: var(--goa-button-secondary-color-bg);
  color: var(--goa-button-secondary-color-text);
}
.goab-btn--secondary:hover { background-color: var(--goa-button-secondary-hover-color-bg); color: var(--goa-button-secondary-hover-color-text); }
.goab-btn--secondary.goab-btn--destructive { background-color: var(--goa-button-secondary-destructive-color-bg); color: var(--goa-button-secondary-destructive-color-text); }
.goab-btn--secondary.goab-btn--destructive:hover { background-color: var(--goa-button-secondary-destructive-hover-color-bg); }

/* tertiary */
.goab-btn--tertiary {
  background-color: transparent;
  color: var(--goa-button-tertiary-color-text, var(--goa-color-interactive-default));
  border: var(--goa-button-tertiary-border);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.goab-btn--tertiary:hover { border: var(--goa-button-tertiary-hover-border); }
.goab-btn--tertiary.goab-btn--destructive { color: var(--goa-button-tertiary-destructive-color-text); border-color: var(--goa-button-tertiary-destructive-color-border); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "button");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabButton({
  type = "primary",
  size = "normal",
  variant = "normal",
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
  action,
  actionArg,
  actionArgs,
  onClick,
  children,
  ...rest
}: GoabButtonProps) {
  useStyles();

  const classes = ["goab-btn"];
  classes.push(`goab-btn--${type}`);
  if (size === "compact") classes.push("goab-btn--compact");
  if (variant !== "normal") classes.push(`goab-btn--${variant}`);

  const iconSize = size === "compact" ? "var(--goa-icon-size-3)" : "var(--goa-icon-size-4)";

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={classes.join(" ")}
      disabled={disabled}
      onClick={onClick}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {leadingIcon && <ion-icon name={leadingIcon} style={{ fontSize: iconSize }}></ion-icon>}
      <span className="goab-btn__text">{children}</span>
      {type === "start" && (
        <ion-icon name="arrow-forward" style={{ fontSize: "var(--goa-icon-size-4)" }}></ion-icon>
      )}
      {trailingIcon && type !== "start" && (
        <ion-icon name={trailingIcon} style={{ fontSize: iconSize }}></ion-icon>
      )}
    </button>
  );
}

export default GoabButton;
