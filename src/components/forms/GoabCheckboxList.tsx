import React, { useState } from "react";
import { GoabCheckbox } from "./GoabCheckbox";

export interface GoabCheckboxOption {
  value: string;
  text: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}
/**
 * Government of Alberta checkbox list — a multiple-selection input: a list of
 * checkbox options with controlled or uncontrolled array value handling.
 */
export interface GoabCheckboxListProps {
  /** Name prefix for the underlying checkboxes. */
  name?: string;
  /** Options as strings or {value,text,description?,disabled?}. */
  items: (string | GoabCheckboxOption)[];
  /** Controlled array of selected values. */
  value?: string[];
  /** Initial selected values — uncontrolled. */
  defaultValue?: string[];
  direction?: "column" | "row";
  /** Disables all checkboxes in the list. */
  disabled?: boolean;
  /** Shows an error state on all checkboxes in the list. */
  error?: boolean;
  /** Size of the list. "compact" reduces spacing. */
  size?: "default" | "compact";
  /** Maximum width of the list container (CSS length). */
  maxWidth?: string;
  onChange?: (values: string[]) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/**
 * Government of Alberta — Checkbox list (goa-checkbox group).
 * A multiple-selection input: a labelled list of GoabCheckbox options laid
 * out vertically (default) or horizontally, with controlled or uncontrolled
 * value handling.
 */
const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabCheckboxList({
  name,
  items = [],
  value,
  defaultValue = [],
  direction = "column",
  disabled = false,
  error = false,
  size,
  maxWidth,
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabCheckboxListProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? (value as string[]) : internal;

  function toggle(val: string) {
    const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  }

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "row" ? "row" : "column",
    gap: direction === "row" ? "var(--goa-space-l)" : "var(--goa-space-s)",
    flexWrap: direction === "row" ? "wrap" : "nowrap",
  };
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  if (maxWidth != null) style.maxWidth = maxWidth;

  return (
    <div role="group" style={style} data-testid={testId}>
      {items.map((it) => {
        const opt = typeof it === "string" ? { value: it, text: it } : it;
        return (
          <GoabCheckbox
            key={opt.value}
            name={name ? `${name}-${opt.value}` : opt.value}
            text={opt.text as string}
            description={opt.description as string}
            disabled={disabled || opt.disabled}
            error={error}
            size={size}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
        );
      })}
    </div>
  );
}

export default GoabCheckboxList;
