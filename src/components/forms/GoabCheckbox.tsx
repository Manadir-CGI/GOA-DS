import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Checkbox (goa-checkbox).
 * 24px box with checkmark, blue when checked, plus label / description.
 */

export type GoabCheckboxSize = "default" | "compact";

/**
 * Government of Alberta checkbox — a single selectable option with an optional
 * description. Group several together for multi-select questions.
 */
export interface GoabCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Shows an error state on the checkbox. */
  error?: boolean;
  /** Shows a mixed/partial selection state (e.g. for a "Select all"). */
  indeterminate?: boolean;
  /** Size of the checkbox. "compact" reduces spacing. Default "default". */
  size?: GoabCheckboxSize;
  /** The value binding submitted with the checkbox. */
  value?: string | number | boolean;
  /** Sets a unique id for the checkbox element. */
  id?: string;
  /** aria-label for the checkbox, for screen readers. */
  ariaLabel?: string;
  /** Text announced by screen readers when reveal-slot content is displayed. */
  revealAriaLabel?: string;
  /** Maximum width of the checkbox (CSS length). */
  maxWidth?: string;
  /** Primary label text. */
  text?: string;
  /** Secondary description below the label. */
  description?: string;
  name?: string;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
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
.goab-checkbox { display: inline-flex; align-items: flex-start; gap: var(--goa-checkbox-gap); cursor: pointer; font: var(--goa-typography-body-m); color: var(--goa-color-text-default); }
.goab-checkbox--disabled { cursor: not-allowed; opacity: .6; }
.goab-checkbox__box {
  flex: 0 0 auto;
  width: var(--goa-checkbox-size); height: var(--goa-checkbox-size);
  border-radius: var(--goa-input-border-radius-checkbox);
  background: var(--goa-color-greyscale-white);
  box-shadow: inset 0 0 0 var(--goa-input-border-width-default) var(--goa-color-greyscale-500);
  display: inline-flex; align-items: center; justify-content: center;
  margin-top: 1px; transition: background .1s ease-in;
}
.goab-checkbox:hover .goab-checkbox__box { box-shadow: var(--goa-checkbox-border-hover); }
.goab-checkbox__box ion-icon { color: var(--goa-color-greyscale-white); font-size: 16px; opacity: 0; }
.goab-checkbox--checked .goab-checkbox__box { background: var(--goa-checkbox-color-bg-checked); box-shadow: none; }
.goab-checkbox--checked .goab-checkbox__box ion-icon { opacity: 1; }
.goab-checkbox__text { display: flex; flex-direction: column; gap: var(--goa-space-3xs); }
.goab-checkbox__desc { font: var(--goa-typography-body-s); color: var(--goa-color-text-secondary); }
.goab-checkbox--error .goab-checkbox__box { box-shadow: inset 0 0 0 var(--goa-input-border-width-default) var(--goa-checkbox-border-error); }
.goab-checkbox--indeterminate .goab-checkbox__box { background: var(--goa-checkbox-color-bg-checked); box-shadow: none; }
.goab-checkbox--indeterminate .goab-checkbox__box ion-icon { opacity: 1; }
.goab-checkbox--compact { gap: var(--goa-space-xs); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "checkbox");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabCheckbox({
  checked,
  defaultChecked = false,
  disabled = false,
  error = false,
  indeterminate = false,
  size = "default",
  text,
  description,
  onChange,
  name,
  id,
  value,
  ariaLabel,
  revealAriaLabel,
  maxWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabCheckboxProps) {
  useStyles();
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const classes = ["goab-checkbox"];
  if (on) classes.push("goab-checkbox--checked");
  if (indeterminate) classes.push("goab-checkbox--indeterminate");
  if (error) classes.push("goab-checkbox--error");
  if (disabled) classes.push("goab-checkbox--disabled");
  if (size === "compact") classes.push("goab-checkbox--compact");
  const style: React.CSSProperties = {};
  if (maxWidth != null) style.maxWidth = maxWidth;
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <label
      className={classes.join(" ")}
      htmlFor={id}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}
    >
      <span className="goab-checkbox__box">
        <ion-icon name={indeterminate ? "remove-sharp" : "checkmark-sharp"}></ion-icon>
      </span>
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value as string | number | readonly string[] | undefined}
        checked={on}
        disabled={disabled}
        aria-label={ariaLabel}
        ref={(el) => {
          if (el) el.indeterminate = !!indeterminate;
        }}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.checked);
          onChange && onChange(e.target.checked, e);
        }}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {(text || description) && (
        <span className="goab-checkbox__text">
          {text && <span>{text}</span>}
          {description && <span className="goab-checkbox__desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

export default GoabCheckbox;
