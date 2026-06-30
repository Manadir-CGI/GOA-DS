import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Work side menu (goa-work-side-menu).
 * The full-height dark navigation rail for internal worker applications:
 * a logo + clickable app heading, grouped icon + label items split across
 * primary / secondary / account slots, count/status badges (normal · emergency
 * · success), expandable groups and sub-items, and a pinned user profile.
 *
 * Compose with <GoabWorkSideMenuItem>, <GoabWorkSideMenuSubItem> and
 * <GoabWorkSideMenuGroup> in the primaryContent / secondaryContent /
 * accountContent slots.
 */

export type GoabWorkSideMenuBadgeType = "normal" | "emergency" | "success";

export interface GoabWorkSideMenuItemProps {
  /** Visible item label. */
  label: string;
  /** Destination URL. */
  url?: string;
  /** Ionicons name shown before the label. */
  icon?: string;
  /** Optional count/status badge value. */
  badge?: string | number;
  /** Badge colour: neutral, red (emergency) or green (success). Defaults to "normal". */
  badgeType?: GoabWorkSideMenuBadgeType;
  /** Marks the item as the current page. */
  current?: boolean;
  /** Renders a divider above the item. */
  divider?: boolean;
  /** Navigation callback ({ label, url }). */
  onNavigate?: (item: { label?: string; url?: string }) => void;
  /** GoabWorkSideMenuSubItem children make the item expandable. */
  children?: React.ReactNode;
}
export function GoabWorkSideMenuItem({
  label,
  url,
  icon,
  badge,
  badgeType = "normal",
  current,
  divider,
  children,
  onNavigate,
}: GoabWorkSideMenuItemProps) {
  const ctx = React.useContext(MenuCtx);
  const nav = onNavigate || ctx.onNavigate;
  const subItems = React.Children.toArray(children).filter(Boolean);
  const hasSub = subItems.length > 0;
  const [open, setOpen] = React.useState(!!current);
  const badgeCls =
    badgeType === "emergency"
      ? " goab-wsm__badge--emergency"
      : badgeType === "success"
        ? " goab-wsm__badge--success"
        : "";

  return (
    <li>
      {divider ? <div className="goab-wsm__divider" role="separator"></div> : null}
      <a
        href={url || "#"}
        className={`goab-wsm__link${current ? " goab-wsm__link--current" : ""}`}
        aria-current={current ? "page" : undefined}
        aria-expanded={hasSub ? open : undefined}
        onClick={(e) => {
          if (hasSub) {
            e.preventDefault();
            setOpen((o) => !o);
          }
          if (nav) nav({ label, url });
        }}
      >
        {icon ? <ion-icon name={icon}></ion-icon> : null}
        <span className="goab-wsm__label">{label}</span>
        {badge != null ? <span className={`goab-wsm__badge${badgeCls}`}>{badge}</span> : null}
        {hasSub ? (
          <ion-icon
            class={`goab-wsm__chevron${open ? " goab-wsm__chevron--open" : ""}`}
            name="chevron-forward-outline"
          ></ion-icon>
        ) : null}
      </a>
      {hasSub && open ? <ul className="goab-wsm__sublist">{subItems}</ul> : null}
    </li>
  );
}

export interface GoabWorkSideMenuSubItemProps {
  label: string;
  url?: string;
  current?: boolean;
  onNavigate?: (item: { label?: string; url?: string }) => void;
}
export function GoabWorkSideMenuSubItem({
  label,
  url,
  current,
  onNavigate,
}: GoabWorkSideMenuSubItemProps) {
  const ctx = React.useContext(MenuCtx);
  const nav = onNavigate || ctx.onNavigate;
  return (
    <li>
      <a
        href={url || "#"}
        className={`goab-wsm__sublink${current ? " goab-wsm__sublink--current" : ""}`}
        aria-current={current ? "page" : undefined}
        onClick={() => {
          if (nav) nav({ label, url });
        }}
      >
        {label}
      </a>
    </li>
  );
}

export interface GoabWorkSideMenuGroupProps {
  /** Group heading label. */
  heading: string;
  /** Optional Ionicons name for the group heading. */
  icon?: string;
  /** Whether the group starts expanded. Defaults to false. */
  open?: boolean;
  children?: React.ReactNode;
}
export function GoabWorkSideMenuGroup({
  heading,
  icon,
  open: openProp = false,
  children,
}: GoabWorkSideMenuGroupProps) {
  const [open, setOpen] = React.useState(!!openProp);
  return (
    <li>
      <button
        type="button"
        className="goab-wsm__group-heading"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {icon ? <ion-icon name={icon}></ion-icon> : null}
        <span className="goab-wsm__label">{heading}</span>
        <ion-icon
          class={`goab-wsm__group-chevron${open ? " goab-wsm__group-chevron--open" : ""}`}
          name="chevron-forward-outline"
        ></ion-icon>
      </button>
      {open ? <ul className="goab-wsm__list">{children}</ul> : null}
    </li>
  );
}

/**
 * Government of Alberta work side menu — the full-height dark navigation rail
 * for internal worker applications.
 */
export interface GoabWorkSideMenuProps {
  /** App / service heading shown under the logo. */
  heading?: string;
  /** URL the logo + heading link to. */
  url?: string;
  /** Controls whether the side menu is expanded or collapsed (icon-only). Default true. */
  open?: boolean;
  /** Logo image src (rendered white). Falls back to the "Alberta" wordmark. */
  logoSrc?: string;
  /** Top navigation slot — GoabWorkSideMenuItem / GoabWorkSideMenuGroup elements. */
  primaryContent?: React.ReactNode;
  /** Secondary navigation slot, below a divider. */
  secondaryContent?: React.ReactNode;
  /** Account / settings slot, pinned to the bottom of the scroll area. */
  accountContent?: React.ReactNode;
  /** Pinned user profile name. */
  userName?: string;
  /** Secondary line under the user name (role, org, email). */
  userSecondaryText?: string;
  /** Navigation callback fired by items and sub-items. */
  onNavigate?: (item: { label?: string; url?: string }) => void;
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  testId?: string;
  [key: string]: unknown;
}

const CSS = `
.goab-wsm { display: flex; flex-direction: column; width: 260px; height: 100%; min-height: 100%; box-sizing: border-box;
  background: var(--goa-color-greyscale-900, #1f1f1f); color: var(--goa-color-greyscale-100, #f1f1f1);
  font-family: var(--goa-font-family-sans, sans-serif); }
.goab-wsm__header { display: flex; flex-direction: column; gap: 4px; padding: var(--goa-space-l) var(--goa-space-l) var(--goa-space-m); }
.goab-wsm__brand { display: inline-flex; align-items: center; gap: var(--goa-space-xs); text-decoration: none; color: inherit; }
.goab-wsm__brand:focus-visible { outline: var(--goa-border-width-l, 2px) solid var(--goa-color-interactive-focus, #feba35); outline-offset: 2px; }
.goab-wsm__logo { height: 24px; width: auto; display: block; filter: brightness(0) invert(1); }
.goab-wsm__wordmark { font-weight: 700; font-size: 24px; line-height: 1; color: var(--goa-color-greyscale-white, #fff); letter-spacing: -0.01em; }
.goab-wsm__heading { margin: 0; font: var(--goa-typography-body-s, 400 14px/20px sans-serif); font-weight: var(--goa-font-weight-semi-bold, 600); color: var(--goa-color-greyscale-300, #b3b3b3); }
.goab-wsm__scroll { flex: 1 1 auto; overflow-y: auto; display: flex; flex-direction: column; }
.goab-wsm__slot { padding: var(--goa-space-2xs) 0; }
.goab-wsm__slot--account { margin-top: auto; }
.goab-wsm__list { list-style: none; margin: 0; padding: 0; }
.goab-wsm__divider { height: 1px; background: rgba(255,255,255,0.16); margin: var(--goa-space-2xs) var(--goa-space-l); }

.goab-wsm__link { display: flex; align-items: center; gap: var(--goa-space-s); width: 100%; box-sizing: border-box;
  padding: var(--goa-space-s) var(--goa-space-l); text-align: left; cursor: pointer; text-decoration: none;
  background: none; border: none; border-left: var(--goa-border-width-xl, 4px) solid transparent;
  color: var(--goa-color-greyscale-200, #d6d6d6); font: var(--goa-typography-body-m, 400 16px/24px sans-serif); }
.goab-wsm__link:hover { background: rgba(255,255,255,0.08); color: var(--goa-color-greyscale-white, #fff); }
.goab-wsm__link:focus-visible { outline: var(--goa-border-width-l, 2px) solid var(--goa-color-interactive-focus, #feba35); outline-offset: -3px; }
.goab-wsm__link--current { background: rgba(255,255,255,0.12); color: var(--goa-color-greyscale-white, #fff);
  border-left-color: var(--goa-color-primary, #c8eefa); font-weight: var(--goa-font-weight-semi-bold, 600); }
.goab-wsm__link ion-icon { font-size: var(--goa-icon-size-l, 22px); flex: 0 0 auto; }
.goab-wsm__label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.goab-wsm__chevron { font-size: var(--goa-icon-size-s, 16px); flex: 0 0 auto; opacity: 0.7; transition: transform 0.15s ease; }
.goab-wsm__chevron--open { transform: rotate(90deg); }

.goab-wsm__badge { flex: 0 0 auto; border-radius: 999px; font-size: 12px; font-weight: 700; line-height: 1; padding: 3px 8px;
  background: rgba(255,255,255,0.18); color: var(--goa-color-greyscale-white, #fff); }
.goab-wsm__badge--emergency { background: var(--goa-color-emergency-default, #ec040b); color: var(--goa-color-greyscale-white, #fff); }
.goab-wsm__badge--success { background: var(--goa-color-success-default, #00853f); color: var(--goa-color-greyscale-white, #fff); }

.goab-wsm__sublist { list-style: none; margin: 0; padding: 0; }
.goab-wsm__sublink { display: block; box-sizing: border-box; width: 100%; text-align: left; cursor: pointer; text-decoration: none;
  padding: var(--goa-space-xs) var(--goa-space-l) var(--goa-space-xs) calc(var(--goa-space-l) + var(--goa-icon-size-l, 22px) + var(--goa-space-s));
  background: none; border: none; border-left: var(--goa-border-width-xl, 4px) solid transparent;
  color: var(--goa-color-greyscale-300, #b3b3b3); font: var(--goa-typography-body-s, 400 14px/20px sans-serif); }
.goab-wsm__sublink:hover { background: rgba(255,255,255,0.06); color: var(--goa-color-greyscale-white, #fff); }
.goab-wsm__sublink--current { color: var(--goa-color-greyscale-white, #fff); border-left-color: var(--goa-color-primary, #c8eefa); font-weight: var(--goa-font-weight-semi-bold, 600); }

.goab-wsm__group-heading { display: flex; align-items: center; gap: var(--goa-space-s); width: 100%; box-sizing: border-box;
  padding: var(--goa-space-s) var(--goa-space-l); background: none; border: none; cursor: pointer; text-align: left;
  color: var(--goa-color-greyscale-300, #b3b3b3); font: var(--goa-typography-body-m, 400 16px/24px sans-serif); }
.goab-wsm__group-heading:hover { color: var(--goa-color-greyscale-white, #fff); }
.goab-wsm__group-heading ion-icon[name] { font-size: var(--goa-icon-size-l, 22px); flex: 0 0 auto; }
.goab-wsm__group-chevron { margin-left: auto; font-size: var(--goa-icon-size-s, 16px); transition: transform 0.15s ease; }
.goab-wsm__group-chevron--open { transform: rotate(90deg); }

.goab-wsm__user { display: flex; align-items: center; gap: var(--goa-space-s); padding: var(--goa-space-m) var(--goa-space-l); border-top: 1px solid rgba(255,255,255,0.16); }
.goab-wsm__avatar { flex: 0 0 auto; width: 36px; height: 36px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
  background: var(--goa-color-interactive-default, #0070c4); color: var(--goa-color-greyscale-white, #fff); font-size: 13px; font-weight: 700; }
.goab-wsm__user-text { min-width: 0; }
.goab-wsm__user-name { font: var(--goa-typography-body-s, 400 14px/20px sans-serif); font-weight: var(--goa-font-weight-semi-bold, 600); color: var(--goa-color-greyscale-white, #fff); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goab-wsm__user-secondary { font-size: 12px; line-height: 16px; color: var(--goa-color-greyscale-400, #9b9b9b); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goab-wsm--collapsed { width: 72px; }
.goab-wsm--collapsed .goab-wsm__label, .goab-wsm--collapsed .goab-wsm__wordmark, .goab-wsm--collapsed .goab-wsm__heading, .goab-wsm--collapsed .goab-wsm__badge, .goab-wsm--collapsed .goab-wsm__user-text, .goab-wsm--collapsed .goab-wsm__chevron, .goab-wsm--collapsed .goab-wsm__group-chevron { display: none; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "work-side-menu");
  el.textContent = CSS;
  document.head.appendChild(el);
}

interface MenuCtxValue {
  onNavigate?: (item: { label?: string; url?: string }) => void;
}

const MenuCtx = React.createContext<MenuCtxValue>({ onNavigate: undefined });

function initials(name?: string) {
  if (!name || typeof name !== "string") return "";
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (!p.length) return "";
  return (p.length === 1 ? p[0].slice(0, 2) : p[0][0] + p[p.length - 1][0]).toUpperCase();
}

export function GoabWorkSideMenu({
  heading,
  url = "#",
  logoSrc,
  open = true,
  primaryContent,
  secondaryContent,
  accountContent,
  userName,
  userSecondaryText,
  onNavigate,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabWorkSideMenuProps) {
  useStyles();
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);

  return (
    <MenuCtx.Provider value={{ onNavigate }}>
      <nav
        className={`goab-wsm${open ? "" : " goab-wsm--collapsed"}`}
        style={Object.keys(style).length ? style : undefined}
        data-testid={testId}
        {...(rest as React.HTMLAttributes<HTMLElement>)}
      >
        <div className="goab-wsm__header">
          <a
            className="goab-wsm__brand"
            href={url}
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate({ url });
              }
            }}
          >
            {logoSrc ? (
              <img className="goab-wsm__logo" src={logoSrc} alt="Government of Alberta" />
            ) : (
              <span className="goab-wsm__wordmark">Alberta</span>
            )}
          </a>
          {heading ? <h2 className="goab-wsm__heading">{heading}</h2> : null}
        </div>

        <div className="goab-wsm__scroll">
          {primaryContent ? (
            <div className="goab-wsm__slot">
              <ul className="goab-wsm__list">{primaryContent}</ul>
            </div>
          ) : null}
          {secondaryContent ? (
            <div className="goab-wsm__slot">
              <div className="goab-wsm__divider" role="separator"></div>
              <ul className="goab-wsm__list">{secondaryContent}</ul>
            </div>
          ) : null}
          {accountContent ? (
            <div className="goab-wsm__slot goab-wsm__slot--account">
              <div className="goab-wsm__divider" role="separator"></div>
              <ul className="goab-wsm__list">{accountContent}</ul>
            </div>
          ) : null}
        </div>

        {userName ? (
          <div className="goab-wsm__user">
            <span className="goab-wsm__avatar" aria-hidden="true">
              {initials(userName)}
            </span>
            <div className="goab-wsm__user-text">
              <div className="goab-wsm__user-name">{userName}</div>
              {userSecondaryText ? (
                <div className="goab-wsm__user-secondary">{userSecondaryText}</div>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>
    </MenuCtx.Provider>
  );
}

export default GoabWorkSideMenu;
