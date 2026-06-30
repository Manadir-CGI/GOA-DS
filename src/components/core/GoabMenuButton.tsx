import React, { useState, useRef, useEffect } from "react";

/**
 * Government of Alberta — Menu button (goa-menu-button).
 * A button that opens a dropdown menu of actions. Use when a single
 * control offers several related actions (e.g. an "Actions" overflow).
 */

export interface GoabMenuItem {
  text: React.ReactNode;
  icon?: string;
  destructive?: boolean;
  onClick?: () => void;
}
/**
 * Government of Alberta menu button — a button that opens a dropdown menu of
 * related actions. Closes on outside click, Escape, or selection.
 */
export interface GoabMenuButtonProps {
  text?: React.ReactNode;
  /** Button style variant. Defaults to "primary". */
  type?: "primary" | "secondary" | "tertiary";
  /** Button size. Defaults to "normal". */
  size?: "normal" | "compact";
  /** Colour variant for semantic meaning. */
  variant?: "normal" | "destructive";
  /** aria-label for the trigger (use in icon-only mode). Defaults to "Open menu". */
  ariaLabel?: string;
  /** Maximum width of the dropdown menu (any CSS length). */
  maxWidth?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  align?: "start" | "end";
  items: GoabMenuItem[];
  onSelect?: (item: GoabMenuItem, index: number) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

const CSS = `
.goab-menubtn { position: relative; display: inline-block; font-family: var(--goa-font-family-sans); }
.goab-menubtn__trigger {
  display: inline-flex; align-items: center; gap: var(--goa-space-2xs);
  height: var(--goa-button-height, 48px); padding: 0 var(--goa-space-l);
  background: var(--goa-button-secondary-color-bg, transparent);
  color: var(--goa-button-secondary-color-text, var(--goa-color-interactive-default));
  border: var(--goa-border-width-s, 1px) solid var(--goa-color-interactive-default);
  border-radius: var(--goa-button-border-radius, 4px);
  font: var(--goa-button-text); cursor: pointer; white-space: nowrap;
}
.goab-menubtn__trigger:hover { background: var(--goa-button-secondary-hover-color-bg, var(--goa-color-greyscale-100)); }
.goab-menubtn__trigger:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: 2px; }
.goab-menubtn__trigger--primary { background: var(--goa-button-primary-color-bg); color: var(--goa-color-greyscale-white); border-color: var(--goa-button-primary-color-bg); }
.goab-menubtn__trigger--primary:hover { background: var(--goa-button-primary-hover-color-bg); border-color: var(--goa-button-primary-hover-color-bg); }
.goab-menubtn__trigger--tertiary { background: transparent; border-color: transparent; color: var(--goa-color-interactive-default); text-decoration: underline; text-underline-offset: 2px; }
.goab-menubtn__trigger--tertiary:hover { background: var(--goa-color-greyscale-100); }
.goab-menubtn__trigger--compact { height: var(--goa-button-height-compact); padding: 0 var(--goa-space-m); }
.goab-menubtn__trigger--destructive { color: var(--goa-color-emergency-default); border-color: var(--goa-color-emergency-default); }
.goab-menubtn__trigger--destructive.goab-menubtn__trigger--primary { background: var(--goa-color-emergency-default); color: var(--goa-color-greyscale-white); }
.goab-menubtn__trigger ion-icon { font-size: var(--goa-icon-size-m); }
.goab-menubtn__menu {
  position: absolute; z-index: 70; top: calc(100% + var(--goa-space-2xs)); min-width: 220px;
  background: var(--goa-color-greyscale-white);
  border: var(--goa-border-width-2xs, 1px) solid var(--goa-color-greyscale-200);
  border-radius: var(--goa-border-radius-l, 8px);
  box-shadow: var(--goa-shadow-raised-light, 0 4px 16px rgba(0,0,0,0.12));
  padding: var(--goa-space-2xs); list-style: none; margin: 0;
}
.goab-menubtn__menu--end { right: 0; }
.goab-menubtn__item {
  display: flex; align-items: center; gap: var(--goa-space-s); width: 100%;
  padding: var(--goa-space-xs) var(--goa-space-s);
  background: none; border: none; cursor: pointer; text-align: left;
  font: var(--goa-typography-body-m); color: var(--goa-color-text-default);
  border-radius: var(--goa-border-radius-m, 4px);
}
.goab-menubtn__item:hover { background: var(--goa-color-info-background, var(--goa-color-greyscale-100)); }
.goab-menubtn__item:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: -2px; }
.goab-menubtn__item--destructive { color: var(--goa-color-emergency-default); }
.goab-menubtn__item ion-icon { font-size: var(--goa-icon-size-m); color: var(--goa-color-greyscale-600); }
.goab-menubtn__item--destructive ion-icon { color: var(--goa-color-emergency-default); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "menubutton");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string): string | undefined =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabMenuButton({
  text = "Actions",
  type = "primary",
  size = "normal",
  variant = "normal",
  ariaLabel,
  maxWidth,
  leadingIcon,
  trailingIcon = "chevron-down",
  align = "start",
  items = [],
  onSelect,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabMenuButtonProps) {
  useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  });

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className="goab-menubtn"
      ref={ref}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <button
        type="button"
        className={`goab-menubtn__trigger goab-menubtn__trigger--${type}${size === "compact" ? " goab-menubtn__trigger--compact" : ""}${variant === "destructive" ? " goab-menubtn__trigger--destructive" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        {leadingIcon && <ion-icon name={leadingIcon}></ion-icon>}
        <span>{text}</span>
        {trailingIcon && <ion-icon name={trailingIcon}></ion-icon>}
      </button>
      {open && (
        <ul
          className={`goab-menubtn__menu${align === "end" ? " goab-menubtn__menu--end" : ""}`}
          role="menu"
          style={maxWidth ? { maxWidth } : undefined}
        >
          {items.map((it, i) => (
            <li key={i} role="none">
              <button
                type="button"
                role="menuitem"
                className={`goab-menubtn__item${it.destructive ? " goab-menubtn__item--destructive" : ""}`}
                onClick={() => {
                  setOpen(false);
                  it.onClick ? it.onClick() : onSelect && onSelect(it, i);
                }}
              >
                {it.icon && <ion-icon name={it.icon}></ion-icon>}
                <span>{it.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoabMenuButton;
