import React, { useState, useRef } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export type GoabInputSize = "normal" | "compact";
export type GoabInputVariant = "goa" | "bare";
export type GoabInputTextAlign = "left" | "right";
export type GoabAutoCapitalize = "on" | "off" | "none" | "sentences" | "words" | "characters";

/**
 * Government of Alberta single-line text input. Wrap in a GoabFormItem for a
 * label, helper text and error messaging.
 */
export interface GoabInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** HTML input type (text, email, password, tel, number…). */
  type?: string;
  size?: GoabInputSize;
  /** Applies the error border + tinted background. */
  error?: boolean;
  disabled?: boolean;
  /** Ionicon name rendered at the leading edge. */
  leadingIcon?: string | null;
  /** Ionicon name rendered at the trailing edge. */
  trailingIcon?: string | null;
  /** Text/markup rendered at the leading edge (e.g. "+1" or "$"). */
  leadingContent?: React.ReactNode;
  /** Text/markup rendered at the trailing edge. */
  trailingContent?: React.ReactNode;
  /** CSS width. Default 100%. */
  width?: string;
  name?: string;
  /** Sets the id attribute of the input element. */
  id?: string;
  /** aria-label used by assistive technologies. */
  ariaLabel?: string;
  /** autocomplete attribute for the input element. */
  autoComplete?: string;
  /** Automatic capitalization behaviour on supported mobile browsers. */
  autoCapitalize?: GoabAutoCapitalize;
  /** Debounce delay (ms) before firing the change event. */
  debounce?: number;
  /** Sets focus on initial render. */
  focused?: boolean;
  /** Maximum value (number, or ISO 8601 for date/time inputs). */
  max?: number | string;
  /** Minimum value (number, or ISO 8601 for date/time inputs). */
  min?: number | string;
  /** How much a number or date value changes per step. Default 1. */
  step?: number;
  /** Maximum number of characters. */
  maxLength?: number;
  /** Sets the readonly state. */
  readonly?: boolean;
  /** Text alignment. Default "left". */
  textAlign?: GoabInputTextAlign;
  /** aria-label for an interactive trailing icon. */
  trailingIconAriaLabel?: string;
  /** Visual style variant. "goa" (default) or "bare". */
  variant?: GoabInputVariant;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

/**
 * Government of Alberta — Text input (goa-input).
 * 56px field with inset border, focus ring, optional leading/trailing
 * Ionicon. Compact and error states supported.
 */

const CSS = `
.goab-input {
  display: inline-flex;
  align-items: center;
  gap: var(--goa-text-input-space-btw-icon-text);
  width: 100%;
  box-sizing: border-box;
  height: var(--goa-text-input-height);
  padding: 0 var(--goa-text-input-padding-lr);
  background: var(--goa-text-input-color-bg);
  border-radius: var(--goa-text-input-border-radius);
  box-shadow: var(--goa-text-input-border);
  color: var(--goa-color-text-default);
  transition: var(--goa-text-input-transition);
}
.goab-input:hover { box-shadow: var(--goa-text-input-border-hover); }
.goab-input:focus-within { box-shadow: var(--goa-text-input-border-focus); }
.goab-input--compact { height: var(--goa-text-input-height-compact); padding: 0 var(--goa-text-input-padding-compact-lr); }
.goab-input--error { box-shadow: var(--goa-text-input-border-error); background: var(--goa-input-color-background-error); }
.goab-input--error:hover { box-shadow: inset 0 0 0 var(--goa-input-border-width-hover) var(--goa-color-interactive-error-hover); }
.goab-input--disabled { background: var(--goa-text-input-color-bg-disabled); box-shadow: var(--goa-text-input-border-disabled); pointer-events: none; }
.goab-input--bare { box-shadow: none; background: transparent; padding: 0; height: auto; }
.goab-input--bare:hover, .goab-input--bare:focus-within { box-shadow: none; }
.goab-input ion-icon { font-size: var(--goa-icon-size-m); color: var(--goa-text-input-color-icon); flex: 0 0 auto; }
.goab-input__affix { flex: 0 0 auto; color: var(--goa-color-text-secondary); font: var(--goa-text-input-typography); white-space: nowrap; }
.goab-input input {
  border: none; outline: none; background: transparent;
  width: 100%; font: var(--goa-text-input-typography);
  color: inherit; padding: 0;
}
.goab-input input::placeholder { color: var(--goa-text-input-color-text-placeholder); }
.goab-input input:disabled { color: var(--goa-text-input-color-text-disabled); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "input");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabInput({
  value,
  defaultValue,
  placeholder,
  type = "text",
  size = "normal",
  error = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  leadingContent = null,
  trailingContent = null,
  width = "100%",
  mt,
  mr,
  mb,
  ml,
  testId,
  onChange,
  name,
  id,
  ariaLabel,
  autoCapitalize,
  autoComplete,
  debounce,
  focused = false,
  max,
  min,
  step,
  maxLength,
  readonly = false,
  textAlign = "left",
  trailingIconAriaLabel,
  variant = "goa",
  ...rest
}: GoabInputProps) {
  useStyles();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fire = (val: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounce) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => onChange && onChange(val, e), debounce);
    } else {
      onChange && onChange(val, e);
    }
  };
  const isControlled = value !== undefined;
  const classes = ["goab-input"];
  if (size === "compact") classes.push("goab-input--compact");
  if (error) classes.push("goab-input--error");
  if (disabled) classes.push("goab-input--disabled");
  if (variant === "bare") classes.push("goab-input--bare");
  const style: React.CSSProperties = { width };
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <div className={classes.join(" ")} style={style} data-testid={testId}>
      {leadingIcon && <ion-icon name={leadingIcon}></ion-icon>}
      {leadingContent && <span className="goab-input__affix">{leadingContent}</span>}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        aria-label={ariaLabel}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoFocus={focused}
        max={max}
        min={min}
        step={step}
        maxLength={maxLength}
        style={{ textAlign }}
        value={isControlled ? value : internal}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.value);
          fire(e.target.value, e);
        }}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />
      {trailingContent && <span className="goab-input__affix">{trailingContent}</span>}
      {trailingIcon && (
        <ion-icon
          name={trailingIcon}
          aria-label={trailingIconAriaLabel}
          role={trailingIconAriaLabel ? "img" : undefined}
        ></ion-icon>
      )}
    </div>
  );
}

export default GoabInput;
