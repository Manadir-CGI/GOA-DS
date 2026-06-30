import React, { useState, Children } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Tabs (goa-tabs / goa-tab).
 * Default underline variant. Compose with GoabTab children whose
 * `heading` becomes the tab label and children the panel content.
 */

/**
 * Government of Alberta tabs — switch between panels of related content with an
 * underline indicator. Compose with GoabTab children.
 */
export interface GoabTabsProps {
  /** 1-based index of the initially active tab. */
  initialTab?: number;
  /** Visual style variant. "default" (underline) or "segmented" (pill). */
  variant?: "default" | "segmented";
  /** Layout orientation. "auto" (default), "horizontal" or "vertical". */
  orientation?: "auto" | "horizontal" | "vertical";
  /** URL navigation mode on tab change. Default "hash". */
  navigation?: "hash" | "none";
  onChange?: (tab: number) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

export interface GoabTabProps {
  /** Tab label (string or node, e.g. with a trailing badge). */
  heading?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

const CSS = `
.goab-tabs { font-family: var(--goa-font-family-sans); }
.goab-tabs__list {
  display: flex; gap: var(--goa-tabs-gap);
  border-bottom: var(--goa-tabs-bottom-border);
  margin-bottom: var(--goa-space-xl);
}
.goab-tabs__tab {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--goa-space-xs);
  padding: var(--goa-tab-padding);
  min-width: var(--goa-space-2xl);
  background: none; border: none; cursor: pointer;
  font: var(--goa-tab-typography);
  color: var(--goa-tab-color-text-not-selected);
  border-bottom: var(--goa-tab-border-not-selected);
  margin-bottom: -1px; white-space: nowrap;
}
.goab-tabs__tab:hover:not(.goab-tabs__tab--selected):not(:disabled) { color: var(--goa-tab-color-text-hover); border-bottom: var(--goa-tab-border-hover); }
.goab-tabs__tab--selected { font: var(--goa-tab-typography-selected); color: var(--goa-tab-color-text-selected); border-bottom: var(--goa-tab-border-selected); }
.goab-tabs__tab:focus-visible { outline: var(--goa-tab-border-focus); outline-offset: 2px; }
.goab-tabs__tab:disabled { color: var(--goa-color-greyscale-400); cursor: not-allowed; }
.goab-tabs__panel { font: var(--goa-typography-body-m); color: var(--goa-color-text-default); }
.goab-tabs--vertical { display: flex; gap: var(--goa-space-xl); }
.goab-tabs--vertical .goab-tabs__list { flex-direction: column; border-bottom: none; border-right: var(--goa-tabs-bottom-border); margin-bottom: 0; margin-right: var(--goa-space-xl); }
.goab-tabs--vertical .goab-tabs__tab { border-bottom: none; border-right: var(--goa-tab-border-not-selected); margin-bottom: 0; margin-right: -1px; justify-content: flex-start; }
.goab-tabs--vertical .goab-tabs__tab--selected { border-right: var(--goa-tab-border-selected); border-bottom: none; }
.goab-tabs--segmented .goab-tabs__list { border-bottom: none; gap: var(--goa-space-3xs); background: var(--goa-color-greyscale-100); border-radius: var(--goa-border-radius-m); padding: var(--goa-space-3xs); display: inline-flex; }
.goab-tabs--segmented .goab-tabs__tab { border: none; margin-bottom: 0; border-radius: var(--goa-border-radius-s); }
.goab-tabs--segmented .goab-tabs__tab--selected { background: var(--goa-color-greyscale-white); border: none; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "tabs");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabTab({ children }: GoabTabProps) {
  return <>{children}</>;
}

export function GoabTabs({
  initialTab = 1,
  variant = "default",
  orientation = "auto",
  navigation = "hash",
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabTabsProps) {
  useStyles();
  const tabs = Children.toArray(children).filter(Boolean);
  const [active, setActive] = useState(initialTab);

  function select(n: number, disabled?: boolean) {
    if (disabled) return;
    setActive(n);
    onChange && onChange(n);
  }

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className={`goab-tabs goab-tabs--${variant}${orientation === "vertical" ? " goab-tabs--vertical" : ""}`}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <div className="goab-tabs__list" role="tablist">
        {tabs.map((tab, i) => {
          const n = i + 1;
          const { heading, disabled } = (tab as React.ReactElement<GoabTabProps>).props;
          return (
            <button
              key={n}
              role="tab"
              aria-selected={n === active}
              disabled={disabled}
              className={`goab-tabs__tab${n === active ? " goab-tabs__tab--selected" : ""}`}
              onClick={() => select(n, disabled)}
            >
              {heading}
            </button>
          );
        })}
      </div>
      <div className="goab-tabs__panel" role="tabpanel">
        {tabs[active - 1]}
      </div>
    </div>
  );
}

export default GoabTabs;
