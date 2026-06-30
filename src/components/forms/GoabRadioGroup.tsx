import React, { createContext, useContext, useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export type GoabRadioOrientation = "column" | "row";
export type GoabRadioGroupSize = "default" | "compact";

/**
 * Government of Alberta radio group — single-select set of options. Compose
 * with GoabRadioItem children.
 */
export interface GoabRadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  orientation?: GoabRadioOrientation;
  /** Disables all radio items in the group. */
  disabled?: boolean;
  /** Shows an error state on all radio items in the group. */
  error?: boolean;
  /** Size of all radio items. "compact" reduces spacing. Default "default". */
  size?: GoabRadioGroupSize;
  /** aria-label for the radio group. */
  ariaLabel?: string;
  /** The id for the radio group element. */
  id?: string;
  onChange?: (value: string) => void;
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

export interface GoabRadioItemProps {
  /** Value submitted when this item is selected. */
  value: string;
  /** Label text. */
  text?: string;
  /** Optional secondary description. */
  description?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Government of Alberta — Radio group + radio item (goa-radio-group / goa-radio-item).
 */

const CSS = `
.goab-radio-group { display: flex; gap: var(--goa-radio-group-gap-vertical); }
.goab-radio-group--column { flex-direction: column; }
.goab-radio-group--row { flex-direction: row; gap: var(--goa-radio-group-gap-horizontal); flex-wrap: wrap; }
.goab-radio { display: inline-flex; align-items: flex-start; gap: var(--goa-radio-gap-label); cursor: pointer; font: var(--goa-radio-label); color: var(--goa-color-text-default); }
.goab-radio--disabled { cursor: not-allowed; opacity: .6; }
.goab-radio__circle {
  flex: 0 0 auto; width: var(--goa-radio-size); height: var(--goa-radio-size);
  border-radius: 50%; background: var(--goa-color-greyscale-white);
  box-shadow: inset 0 0 0 var(--goa-border-width-s) var(--goa-color-greyscale-500);
  display: inline-flex; align-items: center; justify-content: center; margin-top: 1px;
}
.goab-radio:hover .goab-radio__circle { box-shadow: var(--goa-radio-border-hover); }
.goab-radio__circle::after { content: ""; width: var(--goa-radio-inner-size); height: var(--goa-radio-inner-size); border-radius: 50%; background: var(--goa-radio-inner-color); transform: scale(0); transition: transform .1s ease-in; }
.goab-radio--checked .goab-radio__circle { box-shadow: var(--goa-radio-border-checked); }
.goab-radio--checked .goab-radio__circle::after { transform: scale(1); }
.goab-radio__text { display: flex; flex-direction: column; gap: var(--goa-space-3xs); }
.goab-radio__desc { font: var(--goa-radio-description); color: var(--goa-color-text-secondary); }
.goab-radio--error .goab-radio__circle { box-shadow: inset 0 0 0 var(--goa-border-width-s) var(--goa-color-emergency-default); }
.goab-radio-group--compact { gap: var(--goa-space-xs); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "radio");
  el.textContent = CSS;
  document.head.appendChild(el);
}

interface RadioCtxValue {
  name: string;
  selected: string;
  select: (v: string) => void;
  disabled: boolean;
  error: boolean;
  size?: GoabRadioGroupSize;
}

const RadioCtx = createContext<RadioCtxValue | null>(null);

export function GoabRadioGroup({
  name,
  value,
  defaultValue,
  orientation = "column",
  disabled = false,
  error = false,
  size,
  ariaLabel,
  id,
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  ...rest
}: GoabRadioGroupProps) {
  useStyles();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const selected = isControlled ? (value as string) : internal;
  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <div
      id={id}
      className={`goab-radio-group goab-radio-group--${orientation}${size === "compact" ? " goab-radio-group--compact" : ""}`}
      role="radiogroup"
      aria-label={ariaLabel}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      <RadioCtx.Provider value={{ name, selected, select, disabled, error, size }}>
        {children}
      </RadioCtx.Provider>
    </div>
  );
}

export function GoabRadioItem({
  value,
  text,
  description,
  disabled = false,
  ...rest
}: GoabRadioItemProps) {
  useStyles();
  const ctx = useContext(RadioCtx);
  const checked = ctx ? ctx.selected === value : false;
  const isDisabled = disabled || !!(ctx && ctx.disabled);
  const classes = ["goab-radio"];
  if (checked) classes.push("goab-radio--checked");
  if (isDisabled) classes.push("goab-radio--disabled");
  if (ctx && ctx.error) classes.push("goab-radio--error");
  return (
    <label className={classes.join(" ")} {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)}>
      <span className="goab-radio__circle"></span>
      <input
        type="radio"
        name={ctx?.name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={() => ctx && ctx.select(value)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span className="goab-radio__text">
        <span>{text}</span>
        {description && <span className="goab-radio__desc">{description}</span>}
      </span>
    </label>
  );
}

export default GoabRadioGroup;
