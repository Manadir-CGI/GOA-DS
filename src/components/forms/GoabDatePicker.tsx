import React, { useState, useRef, useEffect } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export type GoabDatePickerInputType = "calendar" | "input";

/**
 * Government of Alberta date picker — a text field with a calendar icon that
 * opens a month-grid popover. Wrap in a GoabFormItem for a label, helper text
 * and error messaging.
 */
export interface GoabDatePickerProps {
  /** Selected date (Date or parseable string) — controlled. */
  value?: Date | string;
  /** Initial selected date — uncontrolled. */
  defaultValue?: Date | string;
  /** Placeholder shown when no date is chosen. */
  placeholder?: string;
  /** Applies the error border + tinted background. */
  error?: boolean;
  disabled?: boolean;
  /** Earliest selectable date. */
  min?: Date | string;
  /** Latest selectable date. */
  max?: Date | string;
  /** CSS width. Default 260px. */
  width?: string;
  /** Name of the date field (sets a hidden input carrying the ISO date). */
  name?: string;
  /** Date picker type. "calendar" (default) shows a calendar popup. */
  type?: GoabDatePickerInputType;
  onChange?: (date: Date) => void;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/**
 * Government of Alberta — Date picker (goa-date-input).
 * A text field with a calendar trailing icon that opens a month-grid
 * popover. Matches GoA input field styling, focus ring and error state.
 */

const CSS = `
.goab-datepicker { position: relative; display: inline-block; }
.goab-datepicker__field {
  display: inline-flex; align-items: center; gap: var(--goa-space-xs);
  width: 100%; box-sizing: border-box;
  height: var(--goa-text-input-height);
  padding: 0 var(--goa-text-input-padding-lr);
  background: var(--goa-text-input-color-bg);
  border-radius: var(--goa-text-input-border-radius);
  box-shadow: var(--goa-text-input-border);
  color: var(--goa-color-text-default);
  cursor: pointer; transition: var(--goa-text-input-transition);
}
.goab-datepicker__field:hover { box-shadow: var(--goa-text-input-border-hover); }
.goab-datepicker--open .goab-datepicker__field { box-shadow: var(--goa-text-input-border-focus); }
.goab-datepicker--error .goab-datepicker__field { box-shadow: var(--goa-text-input-border-error); background: var(--goa-input-color-background-error); }
.goab-datepicker--disabled .goab-datepicker__field { background: var(--goa-text-input-color-bg-disabled); box-shadow: var(--goa-text-input-border-disabled); pointer-events: none; }
.goab-datepicker__value { flex: 1; font: var(--goa-text-input-typography); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goab-datepicker__value--placeholder { color: var(--goa-text-input-color-text-placeholder); }
.goab-datepicker__field ion-icon { font-size: var(--goa-icon-size-m); color: var(--goa-text-input-color-icon); flex: 0 0 auto; }
.goab-datepicker__pop {
  position: absolute; top: calc(100% + var(--goa-space-2xs)); left: 0; z-index: 60;
  width: var(--goa-date-input-calendar-width); box-sizing: border-box;
  background: var(--goa-color-greyscale-white);
  border-radius: var(--goa-border-radius-l);
  box-shadow: var(--goa-shadow-raised-light); border: var(--goa-popover-border);
  padding: var(--goa-space-s); font-family: var(--goa-font-family-sans);
}
.goab-datepicker__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--goa-space-2xs); }
.goab-datepicker__title { font: var(--goa-typography-heading-2xs); color: var(--goa-color-text-default); }
.goab-datepicker__navbtn { background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: var(--goa-border-radius-m); color: var(--goa-color-interactive-default); }
.goab-datepicker__navbtn:hover { background: var(--goa-color-greyscale-100); }
.goab-datepicker__navbtn ion-icon { font-size: var(--goa-icon-size-m); }
.goab-datepicker__grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.goab-datepicker__dow { font: var(--goa-date-input-day-of-week-font); color: var(--goa-color-text-secondary); text-align: center; margin: var(--goa-date-input-day-of-week-margin); text-transform: uppercase; }
.goab-datepicker__day {
  width: var(--goa-date-input-day-size); height: var(--goa-date-input-day-size); margin: 0 auto;
  display: inline-flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer;
  border-radius: var(--goa-date-input-day-border-radius);
  font: var(--goa-date-input-day-font); color: var(--goa-color-text-default);
}
.goab-datepicker__day:hover { background: var(--goa-date-input-day-color-bg-hover); }
.goab-datepicker__day--today { font-weight: var(--goa-font-weight-bold); box-shadow: inset 0 -3px 0 0 var(--goa-color-interactive-default); }
.goab-datepicker__day--selected, .goab-datepicker__day--selected:hover { background: var(--goa-date-input-day-color-bg-selected); color: var(--goa-color-greyscale-white); font-weight: var(--goa-font-weight-bold); }
.goab-datepicker__day--selected:hover { background: var(--goa-date-input-day-color-bg-selected-hover); }
.goab-datepicker__day--selected.goab-datepicker__day--today { box-shadow: inset 0 -3px 0 0 var(--goa-color-greyscale-white); }
.goab-datepicker__day:disabled { color: var(--goa-color-greyscale-300); cursor: not-allowed; background: none; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "datepicker");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDate(v?: Date | string | null): Date | null {
  if (!v) return null;
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}
function sameDay(a?: Date | null, b?: Date | null) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function format(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function GoabDatePicker({
  value,
  defaultValue,
  placeholder = "Select a date",
  error = false,
  disabled = false,
  min,
  max,
  width = "260px",
  name,
  type = "calendar",
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabDatePickerProps) {
  useStyles();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(toDate(defaultValue));
  const sel = isControlled ? toDate(value) : internal;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => {
    const base = sel || today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const minD = toDate(min);
  const maxD = toDate(max);
  const first = new Date(view.y, view.m, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));
  while (cells.length % 7 !== 0) cells.push(null);

  function shift(delta: number) {
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  }
  function pick(d: Date) {
    if (!isControlled) setInternal(d);
    onChange && onChange(d);
    setOpen(false);
  }
  function isDisabled(d: Date) {
    return !!(minD && d < startOfDay(minD)) || !!(maxD && d > startOfDay(maxD));
  }

  const classes = ["goab-datepicker"];
  if (open) classes.push("goab-datepicker--open");
  if (error) classes.push("goab-datepicker--error");
  if (disabled) classes.push("goab-datepicker--disabled");

  const rootStyle: React.CSSProperties = { width };
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className={classes.join(" ")}
      ref={ref}
      style={rootStyle}
      data-testid={testId}
      data-type={type}
    >
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            sel
              ? `${sel.getFullYear()}-${String(sel.getMonth() + 1).padStart(2, "0")}-${String(sel.getDate()).padStart(2, "0")}`
              : ""
          }
        />
      )}
      <button
        type="button"
        className="goab-datepicker__field"
        onClick={() => {
          if (!disabled) {
            if (sel) setView({ y: sel.getFullYear(), m: sel.getMonth() });
            setOpen((o) => !o);
          }
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        disabled={disabled}
      >
        <span
          className={`goab-datepicker__value${sel ? "" : " goab-datepicker__value--placeholder"}`}
        >
          {sel ? format(sel) : placeholder}
        </span>
        <ion-icon name="calendar-outline"></ion-icon>
      </button>
      {open && (
        <div className="goab-datepicker__pop" role="dialog" aria-label="Choose date">
          <div className="goab-datepicker__head">
            <button
              type="button"
              className="goab-datepicker__navbtn"
              aria-label="Previous month"
              onClick={() => shift(-1)}
            >
              <ion-icon name="chevron-back"></ion-icon>
            </button>
            <span className="goab-datepicker__title">
              {MONTHS[view.m]} {view.y}
            </span>
            <button
              type="button"
              className="goab-datepicker__navbtn"
              aria-label="Next month"
              onClick={() => shift(1)}
            >
              <ion-icon name="chevron-forward"></ion-icon>
            </button>
          </div>
          <div className="goab-datepicker__grid" role="grid">
            {DOW.map((d) => (
              <div key={d} className="goab-datepicker__dow">
                {d}
              </div>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={"e" + i} />;
              const cls = ["goab-datepicker__day"];
              if (sameDay(d, today)) cls.push("goab-datepicker__day--today");
              if (sameDay(d, sel)) cls.push("goab-datepicker__day--selected");
              return (
                <button
                  key={d.getTime()}
                  type="button"
                  className={cls.join(" ")}
                  disabled={isDisabled(d)}
                  aria-pressed={sameDay(d, sel)}
                  onClick={() => pick(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoabDatePicker;
