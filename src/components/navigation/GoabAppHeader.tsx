import React from "react";

/**
 * Government of Alberta — Application header (goa-app-header).
 * White bar with the GoA wordmark, optional service name, and a
 * primary navigation row. Bottom hairline border.
 */

export interface GoabNavItem {
  label: string;
  href?: string;
  current?: boolean;
}

/**
 * Government of Alberta application header — the GoA wordmark, an optional
 * service name, a primary navigation row, and slotted utility actions.
 */
export interface GoabAppHeaderProps {
  /** URL to the GoA logo SVG (relative to the consuming page). */
  logoSrc?: string;
  /** Service name shown beside the logo. */
  heading?: string;
  /** V2 only: secondary text displayed under the service name. */
  secondaryText?: string;
  /** URL the Alberta.ca logo links to. */
  url?: string;
  /** Maximum width of the content area (CSS length). */
  maxContentWidth?: string;
  /** Breakpoint (px) at which the full menu displays. */
  fullMenuBreakpoint?: number;
  /** Primary navigation items. */
  navItems?: GoabNavItem[];
  /** Called when a nav item is clicked. */
  onNavigate?: (item: GoabNavItem, index: number) => void;
  /** Utility actions rendered at the right of the top bar (e.g. sign-in link). */
  children?: React.ReactNode;
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
.goab-app-header {
  background: var(--goa-app-header-color-bg);
  border-bottom: var(--goa-app-header-border-bottom);
  font-family: var(--goa-font-family-sans);
}
.goab-app-header__bar {
  display: flex; align-items: center; gap: var(--goa-app-header-logo-service-gap);
  padding: var(--goa-app-header-padding-v) var(--goa-app-header-padding-h-desktop);
  min-height: 64px;
}
.goab-app-header__logo { height: var(--goa-app-header-logo-desktop-height); display: block; }
.goab-app-header__brand { display: flex; align-items: center; gap: var(--goa-app-header-logo-service-gap); }
.goab-app-header__service {
  font: var(--goa-typography-heading-xs);
  color: var(--goa-app-header-color-service-name);
}
.goab-app-header__secondary { display: block; font: var(--goa-typography-body-s); color: var(--goa-color-text-secondary); }
.goab-app-header__spacer { flex: 1; }
.goab-app-header__utilities { display: flex; align-items: center; gap: var(--goa-app-header-utilities-gap); }
.goab-app-header__nav {
  display: flex; align-items: stretch; gap: var(--goa-app-header-nav-item-gap);
  padding: 0 var(--goa-app-header-padding-h-desktop);
  background: var(--goa-color-greyscale-white);
}
.goab-app-header__navitem {
  display: inline-flex; align-items: center;
  height: var(--goa-app-header-height-nav-item);
  padding: var(--goa-app-header-padding-nav-item);
  font: var(--goa-app-header-typography-nav-item);
  color: var(--goa-app-header-nav-text-color);
  text-decoration: none;
  border-bottom: var(--goa-app-header-border-nav-item-default);
  cursor: pointer;
}
.goab-app-header__navitem:hover { border-bottom: var(--goa-app-header-border-nav-item-hover); color: var(--goa-color-text-default); }
.goab-app-header__navitem--current { border-bottom: var(--goa-app-header-border-nav-item-current); color: var(--goa-color-text-default); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "app-header");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabAppHeader({
  logoSrc = "assets/goa-logo.svg",
  heading,
  secondaryText,
  url,
  navItems = [],
  onNavigate,
  maxContentWidth,
  fullMenuBreakpoint,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  ...rest
}: GoabAppHeaderProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  const inner = maxContentWidth
    ? { maxWidth: maxContentWidth, marginLeft: "auto", marginRight: "auto", width: "100%" }
    : undefined;
  return (
    <header
      className="goab-app-header"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      <div className="goab-app-header__bar" style={inner}>
        <div className="goab-app-header__brand">
          <a
            href={url || "#"}
            onClick={url ? undefined : (e) => e.preventDefault()}
            aria-label="Government of Alberta"
          >
            <img className="goab-app-header__logo" src={logoSrc} alt="Government of Alberta" />
          </a>
          {(heading || secondaryText) && (
            <span className="goab-app-header__service">
              {heading}
              {secondaryText && <span className="goab-app-header__secondary">{secondaryText}</span>}
            </span>
          )}
        </div>
        <div className="goab-app-header__spacer"></div>
        {children && <div className="goab-app-header__utilities">{children}</div>}
      </div>
      {navItems.length > 0 && (
        <nav className="goab-app-header__nav" style={inner}>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href || "#"}
              className={`goab-app-header__navitem${item.current ? " goab-app-header__navitem--current" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate && onNavigate(item, i);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default GoabAppHeader;
