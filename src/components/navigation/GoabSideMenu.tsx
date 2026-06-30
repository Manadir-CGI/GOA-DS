import React, { useState } from "react";

/**
 * Government of Alberta — Side menu (goa-side-menu).
 * A vertical navigation for moving between pages of a service. Supports flat
 * links and collapsible groups with nested children. The current item is
 * bold with a left accent.
 */

export interface GoabSideMenuItem {
  label: React.ReactNode;
  href?: string;
  icon?: string;
  current?: boolean;
  /** Collapsible group children. */
  children?: GoabSideMenuItem[];
  /** Initial expanded state for a group. Default true. */
  expanded?: boolean;
}

/**
 * Government of Alberta side menu — vertical navigation for moving between
 * pages of a service. Supports flat links and collapsible nested groups.
 */
export interface GoabSideMenuProps {
  heading?: React.ReactNode;
  items: GoabSideMenuItem[];
  onNavigate?: (item: GoabSideMenuItem) => void;
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
.goab-sidemenu { font-family: var(--goa-font-family-sans); width: 100%; padding: var(--goa-space-s) 0; }
.goab-sidemenu__heading { font: var(--goa-typography-heading-xs); color: var(--goa-color-text-default); padding: var(--goa-space-xs) var(--goa-space-m); margin: 0; }
.goab-sidemenu__list { list-style: none; margin: 0; padding: 0; }
.goab-sidemenu__link {
  display: flex; align-items: center; gap: var(--goa-space-xs); width: 100%;
  box-sizing: border-box; text-align: left; cursor: pointer;
  padding: var(--goa-space-xs) var(--goa-space-m);
  font: var(--goa-side-menu-typography-item, 400 16px/22px var(--goa-font-family-sans));
  color: var(--goa-color-interactive-default);
  background: none; border: none; border-left: var(--goa-border-width-xl, 4px) solid transparent;
  text-decoration: none;
}
.goab-sidemenu__link:hover { background: var(--goa-color-greyscale-100); }
.goab-sidemenu__link:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: -3px; }
.goab-sidemenu__link--current {
  font: var(--goa-side-menu-typography-item-current, 600 16px/22px var(--goa-font-family-sans));
  color: var(--goa-color-text-default);
  border-left-color: var(--goa-color-interactive-default);
  background: var(--goa-color-info-background, #e0f0ff);
}
.goab-sidemenu__chev { margin-left: auto; font-size: var(--goa-icon-size-s); transition: transform .15s ease; }
.goab-sidemenu__group[aria-expanded="true"] .goab-sidemenu__chev { transform: rotate(180deg); }
.goab-sidemenu__children { list-style: none; margin: 0; padding: 0; }
.goab-sidemenu__children .goab-sidemenu__link { padding-left: var(--goa-space-2xl, 36px); font-size: 15px; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "sidemenu");
  el.textContent = CSS;
  document.head.appendChild(el);
}

interface ItemProps {
  item: GoabSideMenuItem;
  onNavigate?: (item: GoabSideMenuItem) => void;
}

function Item({ item, onNavigate }: ItemProps) {
  const [open, setOpen] = useState(item.expanded ?? true);
  if (item.children && item.children.length) {
    return (
      <li>
        <button
          type="button"
          className="goab-sidemenu__link goab-sidemenu__group"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {item.icon && <ion-icon name={item.icon}></ion-icon>}
          <span>{item.label}</span>
          <ion-icon className="goab-sidemenu__chev" name="chevron-down"></ion-icon>
        </button>
        {open && (
          <ul className="goab-sidemenu__children">
            {item.children.map((c, i) => (
              <Item key={i} item={c} onNavigate={onNavigate} />
            ))}
          </ul>
        )}
      </li>
    );
  }
  return (
    <li>
      <a
        href={item.href || "#"}
        className={`goab-sidemenu__link${item.current ? " goab-sidemenu__link--current" : ""}`}
        aria-current={item.current ? "page" : undefined}
        onClick={(e) => {
          e.preventDefault();
          onNavigate && onNavigate(item);
        }}
      >
        {item.icon && <ion-icon name={item.icon}></ion-icon>}
        <span>{item.label}</span>
      </a>
    </li>
  );
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabSideMenu({
  heading,
  items = [],
  onNavigate,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabSideMenuProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <nav
      className="goab-sidemenu"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      {heading && <h2 className="goab-sidemenu__heading">{heading}</h2>}
      <ul className="goab-sidemenu__list">
        {items.map((it, i) => (
          <Item key={i} item={it} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

export default GoabSideMenu;
