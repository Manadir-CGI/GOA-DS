import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta standalone month calendar. Renders a single month
 * grid with prev/next navigation and a selectable day. Compose inside a
 * GoabDatePicker for an input-driven date field, or use directly for an
 * inline date selection (e.g. booking an appointment).
 */
export interface GoabCalendarProps {
  /** Selected date (Date or parseable string) — controlled. */
  value?: Date | string;
  /** Initial selected date — uncontrolled. */
  defaultValue?: Date | string;
  /** Earliest selectable date; earlier days are disabled. */
  min?: Date | string;
  /** Latest selectable date; later days are disabled. */
  max?: Date | string;
  /** CSS width override. Defaults to the 280px token width. */
  width?: string;
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
 * Government of Alberta — Calendar (goa-calendar).
 * Standalone month grid: month/year header with prev/next navigation,
 * weekday row and a 6×7 day grid. Selected day fills blue; today is
 * underlined. Used on its own or inside GoabDatePicker.
 */

const CSS = `
.goab-calendar {
  width: var(--goa-date-input-calendar-width);
  box-sizing: border-box;
  background: var(--goa-color-greyscale-white);
  border: var(--goa-date-input-calendar-border);
  border-radius: var(--goa-date-input-calendar-border-radius);
  padding: var(--goa-space-s);
  font-family: var(--goa-font-family-sans);
  color: var(--goa-color-text-default);
}
.goab-calendar__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--goa-space-2xs); }
.goab-calendar__title { font: var(--goa-typography-heading-2xs); }
.goab-calendar__nav {
  background: none; border: none; cursor: pointer; display: inline-flex;
  align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: var(--goa-border-radius-m);
  color: var(--goa-color-interactive-default);
}
.goab-calendar__nav:hover { background: var(--goa-color-greyscale-100); }
.goab-calendar__nav:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: 1px; }
.goab-calendar__nav ion-icon { font-size: var(--goa-icon-size-m); }
.goab-calendar__grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.goab-calendar__dow { font: var(--goa-date-input-day-of-week-font); color: var(--goa-color-text-secondary); text-align: center; margin: var(--goa-date-input-day-of-week-margin); text-transform: uppercase; }
.goab-calendar__day {
  width: var(--goa-date-input-day-size); height: var(--goa-date-input-day-size);
  margin: 0 auto;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--goa-date-input-day-color-bg); border: none; cursor: var(--goa-date-input-cursor);
  border-radius: var(--goa-date-input-day-border-radius);
  font: var(--goa-date-input-day-font); color: var(--goa-color-text-default);
}
.goab-calendar__day:hover { background: var(--goa-date-input-day-color-bg-hover); }
.goab-calendar__day:focus-visible { outline: var(--goa-date-input-day-border-focus); outline-offset: -2px; }
.goab-calendar__day--muted { color: var(--goa-color-greyscale-400); }
.goab-calendar__day--today { font-weight: var(--goa-font-weight-bold); box-shadow: inset 0 -3px 0 0 var(--goa-color-interactive-default); }
.goab-calendar__day--selected, .goab-calendar__day--selected:hover {
  background: var(--goa-date-input-day-color-bg-selected); color: var(--goa-color-greyscale-white); font-weight: var(--goa-font-weight-bold);
}
.goab-calendar__day--selected:hover { background: var(--goa-date-input-day-color-bg-selected-hover); }
.goab-calendar__day--selected.goab-calendar__day--today { box-shadow: inset 0 -3px 0 0 var(--goa-color-greyscale-white); }
.goab-calendar__day:disabled { color: var(--goa-color-greyscale-300); cursor: not-allowed; background: none; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "calendar");
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

export function GoabCalendar({
  value,
  defaultValue,
  onChange,
  min,
  max,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabCalendarProps) {
  useStyles();
  const isControlled = value !== undefined;
  const selected = toDate(isControlled ? value : defaultValue);
  const [internal, setInternal] = useState(selected);
  const sel = isControlled ? toDate(value) : internal;
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => {
    const base = sel || today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

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
  }
  function disabled(d: Date) {
    return !!(minD && d < startOfDay(minD)) || !!(maxD && d > startOfDay(maxD));
  }

  const rootStyle: React.CSSProperties = {};
  if (width) rootStyle.width = width;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className="goab-calendar"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <div className="goab-calendar__head">
        <button
          type="button"
          className="goab-calendar__nav"
          aria-label="Previous month"
          onClick={() => shift(-1)}
        >
          <ion-icon name="chevron-back"></ion-icon>
        </button>
        <span className="goab-calendar__title">
          {MONTHS[view.m]} {view.y}
        </span>
        <button
          type="button"
          className="goab-calendar__nav"
          aria-label="Next month"
          onClick={() => shift(1)}
        >
          <ion-icon name="chevron-forward"></ion-icon>
        </button>
      </div>
      <div className="goab-calendar__grid" role="grid">
        {DOW.map((d) => (
          <div key={d} className="goab-calendar__dow">
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={"e" + i} />;
          const cls = ["goab-calendar__day"];
          if (sameDay(d, today)) cls.push("goab-calendar__day--today");
          if (sameDay(d, sel)) cls.push("goab-calendar__day--selected");
          return (
            <button
              key={d.getTime()}
              type="button"
              className={cls.join(" ")}
              aria-pressed={sameDay(d, sel)}
              disabled={disabled(d)}
              onClick={() => pick(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GoabCalendar;
