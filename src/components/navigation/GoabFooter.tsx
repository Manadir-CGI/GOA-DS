import React from "react";

/**
 * Government of Alberta — Footer (goa-footer).
 * Grey band with a top border, optional navigation links, and a meta
 * row for copyright / legal links.
 */

export interface GoabFooterLink {
  label: string;
  href?: string;
}

/**
 * Government of Alberta footer — a grey band with optional navigation links and
 * a meta row of legal links plus copyright.
 */
export interface GoabFooterProps {
  /** Primary footer navigation links. */
  navLinks?: GoabFooterLink[];
  /** Secondary / legal links in the meta row. */
  metaLinks?: GoabFooterLink[];
  /** Copyright text. */
  copyright?: string;
  /** URL for the Government of Alberta logo link. Defaults to alberta.ca. */
  url?: string;
  /** Maximum width of the main content area (CSS length). */
  maxContentWidth?: string;
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
.goab-footer {
  background: var(--goa-footer-color-bg);
  border-top: var(--goa-footer-border-top);
  color: var(--goa-footer-color-text);
  font-family: var(--goa-font-family-sans);
  padding: var(--goa-footer-padding-large-screen);
}
.goab-footer__nav {
  display: flex; flex-wrap: wrap; gap: var(--goa-space-l) var(--goa-space-xl);
  padding-bottom: var(--goa-space-l);
}
.goab-footer__nav a {
  color: var(--goa-footer-color-links);
  font: var(--goa-typography-body-m);
  text-decoration: none;
}
.goab-footer__nav a:hover { color: var(--goa-footer-color-links-hover); text-decoration: underline; }
.goab-footer__meta {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: var(--goa-space-m);
  border-top: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
  padding-top: var(--goa-space-l);
}
.goab-footer__meta-links { display: flex; flex-wrap: wrap; gap: var(--goa-footer-meta-links-gap); }
.goab-footer__meta-links a {
  color: var(--goa-footer-color-links-secondary);
  font: var(--goa-typography-body-s);
  text-decoration: none;
}
.goab-footer__meta-links a:hover { color: var(--goa-footer-color-links-secondary-hover); text-decoration: underline; }
.goab-footer__copyright { font: var(--goa-typography-body-s); color: var(--goa-color-text-secondary); }
.goab-footer__inner { width: 100%; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "footer");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabFooter({
  navLinks = [],
  metaLinks = [],
  copyright = "© 2026 Government of Alberta",
  url,
  maxContentWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabFooterProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  const innerStyle = maxContentWidth
    ? { maxWidth: maxContentWidth, marginLeft: "auto", marginRight: "auto" }
    : undefined;
  return (
    <footer
      className="goab-footer"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      <div className="goab-footer__inner" style={innerStyle}>
        {navLinks.length > 0 && (
          <nav className="goab-footer__nav">
            {navLinks.map((l, i) => (
              <a key={i} href={l.href || "#"} onClick={(e) => e.preventDefault()}>
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <div className="goab-footer__meta">
          <div className="goab-footer__meta-links">
            {metaLinks.map((l, i) => (
              <a key={i} href={l.href || "#"} onClick={(e) => e.preventDefault()}>
                {l.label}
              </a>
            ))}
          </div>
          <span className="goab-footer__copyright">{copyright}</span>
        </div>
      </div>
    </footer>
  );
}

export default GoabFooter;
