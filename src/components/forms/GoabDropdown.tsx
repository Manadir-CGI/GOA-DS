import React, { useState, useRef, useEffect } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export interface GoabDropdownOption {
  value: string;
  label: string;
}
export type GoabDropdownSize = "normal" | "compact";

/**
 * Government of Alberta dropdown / select — a field that opens a popover menu of
 * options. Matches the GoA input styling with a chevron affordance. Supports a
 * native <select> mode and a filterable (type-to-filter) mode.
 */
export interface GoabDropdownProps {
  /** Options as strings or {value,label} objects. */
  items: (string | GoabDropdownOption)[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  width?: string;
  /** Maximum width (CSS unit). */
  maxWidth?: string;
  /** Maximum height of the menu. Non-native only. Default "276px". */
  maxHeight?: string;
  /** Size of the dropdown. "compact" reduces height for dense layouts. */
  size?: GoabDropdownSize;
  /** Shows an error state on the dropdown. */
  error?: boolean;
  /** Disables the dropdown control. */
  disabled?: boolean;
  /** Icon shown to the left of the dropdown input. */
  leadingIcon?: string;
  /** When true, allows filtering options by typing into the input field. */
  filterable?: boolean;
  /** When true, renders the native <select> HTML element. */
  native?: boolean;
  /** The id attribute for the dropdown element. */
  id?: string;
  /** Identifier for the dropdown. Should be unique. */
  name?: string;
  /** aria-label for the selected value, for screen readers. */
  ariaLabel?: string;
  /** aria-labelledby — id of the element that labels the dropdown. */
  ariaLabelledBy?: string;
  /** autocomplete attribute (native only). */
  autoComplete?: string;
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
 * Government of Alberta — Dropdown / select (goa-dropdown).
 * Click to open a popover menu of options; matches the GoA input field
 * styling with a chevron affordance. Supports a native <select> mode, a
 * filterable (type-to-filter) mode, error/disabled states and a leading icon.
 */

const CSS = `
.goab-dropdown { position: relative; display: inline-block; width: 100%; }
.goab-dropdown__control {
  display: flex; align-items: center; gap: var(--goa-space-xs); justify-content: space-between;
  width: 100%; box-sizing: border-box;
  height: var(--goa-dropdown-height);
  padding: var(--goa-dropdown-padding);
  background: var(--goa-dropdown-color-bg);
  border-radius: var(--goa-dropdown-border-radius);
  box-shadow: var(--goa-dropdown-border);
  font: var(--goa-dropdown-typography);
  color: var(--goa-color-text-default);
  cursor: pointer; text-align: left;
}
.goab-dropdown__control:hover { box-shadow: var(--goa-dropdown-border-hover); }
.goab-dropdown__control:focus-visible { outline: none; box-shadow: var(--goa-dropdown-border-focus); }
.goab-dropdown__control--placeholder { color: var(--goa-text-input-color-text-placeholder); }
.goab-dropdown__control--compact { height: var(--goa-text-input-height-compact); }
.goab-dropdown__control--error { box-shadow: var(--goa-text-input-border-error); background: var(--goa-input-color-background-error); }
.goab-dropdown__control--disabled { background: var(--goa-text-input-color-bg-disabled); box-shadow: var(--goa-text-input-border-disabled); pointer-events: none; color: var(--goa-text-input-color-text-disabled); }
.goab-dropdown__label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.goab-dropdown__control ion-icon { font-size: var(--goa-icon-size-m); color: var(--goa-color-greyscale-600); flex: 0 0 auto; }
.goab-dropdown__lead { color: var(--goa-color-greyscale-700) !important; }
.goab-dropdown__filter { width: 100%; box-sizing: border-box; border: none; outline: none; background: transparent; font: var(--goa-dropdown-typography); color: inherit; }
.goab-dropdown__menu {
  position: absolute; top: calc(100% + var(--goa-dropdown-menu-margin)); left: 0; right: 0; z-index: 50;
  background: var(--goa-color-greyscale-white);
  border-radius: var(--goa-dropdown-menu-border-radius);
  box-shadow: var(--goa-shadow-raised-light);
  border: var(--goa-popover-border);
  padding: var(--goa-space-xs); margin: 0; list-style: none;
  overflow-y: auto;
}
.goab-dropdown__item {
  padding: var(--goa-dropdown-item-padding);
  border-radius: var(--goa-dropdown-item-border-radius);
  font: var(--goa-dropdown-typography);
  color: var(--goa-dropdown-item-color-text);
  cursor: pointer; display: flex; align-items: center; justify-content: space-between;
}
.goab-dropdown__item:hover { background: var(--goa-dropdown-item-color-bg-hover); color: var(--goa-dropdown-item-color-text-hover); }
.goab-dropdown__item--selected { background: var(--goa-dropdown-item-color-bg-selected); color: var(--goa-dropdown-item-color-text-selected); }
.goab-dropdown__item--selected:hover { background: var(--goa-dropdown-item-color-bg-selected-hover); color: var(--goa-color-greyscale-white); }
.goab-dropdown__item ion-icon { font-size: var(--goa-icon-size-m); }
.goab-dropdown__empty { padding: var(--goa-dropdown-item-padding); color: var(--goa-color-text-secondary); font: var(--goa-dropdown-typography); }
.goab-dropdown__native {
  width: 100%; box-sizing: border-box; height: var(--goa-dropdown-height);
  padding: var(--goa-dropdown-padding); background: var(--goa-dropdown-color-bg);
  border-radius: var(--goa-dropdown-border-radius); box-shadow: var(--goa-dropdown-border);
  font: var(--goa-dropdown-typography); color: var(--goa-color-text-default); cursor: pointer;
}
.goab-dropdown__native--error { box-shadow: var(--goa-text-input-border-error); background: var(--goa-input-color-background-error); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "dropdown");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabDropdown({
  items = [],
  value,
  defaultValue,
  placeholder = "Select an option",
  onChange,
  width = "100%",
  maxWidth,
  maxHeight = "276px",
  size,
  error = false,
  disabled = false,
  leadingIcon,
  filterable = false,
  native = false,
  id,
  name,
  ariaLabel,
  ariaLabelledBy,
  autoComplete,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabDropdownProps) {
  useStyles();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internal, setInternal] = useState(defaultValue ?? "");
  const ref = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const opts = items.map((it) => (typeof it === "string" ? { value: it, label: it } : it));
  const current = opts.find((o) => o.value === selected);

  function pick(v: string) {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
    setOpen(false);
    setQuery("");
  }

  const rootStyle: React.CSSProperties = { width };
  if (maxWidth != null) rootStyle.maxWidth = maxWidth;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  // Native select mode
  if (native) {
    return (
      <div className="goab-dropdown" ref={ref} style={rootStyle} data-testid={testId}>
        <select
          id={id}
          name={name}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`goab-dropdown__native${error ? " goab-dropdown__native--error" : ""}`}
          value={selected || ""}
          onChange={(e) => pick(e.target.value)}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const visible =
    filterable && query
      ? opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : opts;

  const controlCls = [
    "goab-dropdown__control",
    current ? "" : "goab-dropdown__control--placeholder",
    size === "compact" ? "goab-dropdown__control--compact" : "",
    error ? "goab-dropdown__control--error" : "",
    disabled ? "goab-dropdown__control--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="goab-dropdown"
      ref={ref}
      style={rootStyle}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      <button
        type="button"
        id={id}
        className={controlCls}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {leadingIcon && <ion-icon className="goab-dropdown__lead" name={leadingIcon}></ion-icon>}
        {open && filterable ? (
          <input
            className="goab-dropdown__filter"
            autoFocus
            autoComplete={autoComplete}
            placeholder={current ? current.label : placeholder}
            value={query}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setQuery(e.target.value)}
          />
        ) : (
          <span className="goab-dropdown__label">{current ? current.label : placeholder}</span>
        )}
        <ion-icon name={open ? "chevron-up" : "chevron-down"}></ion-icon>
      </button>
      {open && (
        <ul className="goab-dropdown__menu" role="listbox" style={{ maxHeight }}>
          {visible.length === 0 && <li className="goab-dropdown__empty">No matches</li>}
          {visible.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === selected}
              className={`goab-dropdown__item${o.value === selected ? " goab-dropdown__item--selected" : ""}`}
              onClick={() => pick(o.value)}
            >
              <span>{o.label}</span>
              {o.value === selected && <ion-icon name="checkmark"></ion-icon>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoabDropdown;
