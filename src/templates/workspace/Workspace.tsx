import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideMenuSubItem,
} from "../../components/navigation/GoabWorkSideMenu";
import { GoabButton } from "../../components/core/GoabButton";
import { WorkQueue } from "./WorkQueue";

/**
 * GoA Workspace — internal worker application shell, rebuilt from the GoA
 * goa-workspace-playground reference: a dark collapsible work side menu (logo
 * header, grouped primary/secondary/account items, notifications, user
 * profile), a floating white content card with a sticky page header and
 * scroll shadow, filter chips, tabs, and a sortable, selectable case table
 * with a selection action bar. Includes a whole-screen light/dark theme
 * switch. The starting point for staff-facing case-management and admin
 * tools.
 */
export interface WorkspaceProps {
  /** Initially selected tab in the case table. Default "To do". */
  defaultTab?: "All cases" | "To do" | "In progress" | "Completed";
  /** Notification count shown on the side menu's Notifications item. Default 3. */
  unreadCount?: number;
  /** Whether the Activity item is shown in the side menu's secondary section. Default true. */
  showActivity?: boolean;
}

interface NavItem {
  label: string;
  current?: boolean;
}

const TAB_MAP: Record<string, number> = {
  "All cases": 1,
  "To do": 2,
  "In progress": 3,
  Completed: 4,
};

export function Workspace({
  defaultTab = "To do",
  unreadCount = 3,
  showActivity = true,
}: WorkspaceProps) {
  const [current, setCurrent] = useState("Cases");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onScroll = () => setScrolled(card.scrollTop > 4);
    card.addEventListener("scroll", onScroll);
    return () => card.removeEventListener("scroll", onScroll);
  }, []);

  const mark = (label: string): NavItem => ({ label, current: label === current });

  const onNavigate = (item: { label?: string; url?: string }) => {
    if (item && item.label && item.label !== "Log out") setCurrent(item.label);
  };
  const onToggle = () => setCollapsed((c) => !c);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const initialTab = TAB_MAP[defaultTab] || 2;
  const dark = theme === "dark";
  const themeIcon = dark ? "sunny-outline" : "moon-outline";
  const themeLabel = dark ? "Light" : "Dark";
  const headerSubtitle = "14 active applications · assigned across 4 regions";

  return (
    <div className="ws-app" data-theme={theme} style={WS_APP_STYLE}>
      <style>{WS_CSS}</style>

      <div style={{ flex: "0 0 auto", height: "100%" }}>
        <GoabWorkSideMenu
          heading="Workspace Demo"
          url="/"
          logoSrc="../../assets/goa-logo.svg"
          open={!collapsed}
          onNavigate={onNavigate}
          onToggle={onToggle}
          userName="Edna Mode"
          userSecondaryText="edna.mode@gov.ab.ca"
          primaryContent={
            <>
              <GoabWorkSideMenuItem {...mark("Dashboard")} icon="grid-outline" />
              <GoabWorkSideMenuItem {...mark("Search")} icon="search-outline" />
              <GoabWorkSideMenuItem {...mark("Cases")} icon="list-outline" badge={14} />
              <GoabWorkSideMenuItem
                {...mark("Documents")}
                icon="document-text-outline"
                badge="New"
                badgeType="success"
              >
                <GoabWorkSideMenuSubItem label="Templates" />
                <GoabWorkSideMenuSubItem label="Archive" />
                <GoabWorkSideMenuSubItem label="Shared with me" />
              </GoabWorkSideMenuItem>
              <GoabWorkSideMenuItem {...mark("Reports")} icon="bar-chart-outline" />
            </>
          }
          secondaryContent={
            <>
              <GoabWorkSideMenuItem
                {...mark("Notifications")}
                icon="notifications-outline"
                badge={unreadCount > 0 ? unreadCount : undefined}
                badgeType="emergency"
                divider
              />
              {showActivity && <GoabWorkSideMenuItem {...mark("Activity")} icon="pulse-outline" />}
            </>
          }
          accountContent={
            <>
              <GoabWorkSideMenuItem {...mark("Settings")} icon="settings-outline" />
              <GoabWorkSideMenuItem {...mark("Log out")} icon="log-out-outline" />
            </>
          }
        />
      </div>

      <div className="ws-card-container">
        <div className="ws-card" ref={cardRef}>
          <header
            ref={headerRef}
            className={`page-header${scrolled ? " page-header--scrolled" : ""}`}
          >
            <div className="page-header__content">
              <div style={{ minWidth: 0 }}>
                <h1 className="page-header__title">Cases</h1>
                <p className="page-header__subtitle">{headerSubtitle}</p>
              </div>
              <span className="page-header__spacer"></span>
              <div className="page-header__actions">
                <button
                  className="ws-iconbtn"
                  onClick={toggleTheme}
                  aria-label="Toggle colour theme"
                >
                  <ion-icon name={themeIcon}></ion-icon>
                  <span>{themeLabel}</span>
                </button>
                <GoabButton type="tertiary" size="compact" trailingIcon="chevron-down">
                  View settings
                </GoabButton>
                <GoabButton type="primary" leadingIcon="add" size="compact">
                  New case
                </GoabButton>
              </div>
            </div>
          </header>

          <div className="content-padding">
            <WorkQueue initialTab={initialTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

const WS_APP_STYLE: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  background: "var(--goa-color-surface-0, #f8f8f8)",
  fontFamily: "var(--goa-font-family-sans)",
  color: "var(--goa-color-text-default)",
};

/* Whole-screen dark theme remap + floating content card + sticky page header
   styling, ported verbatim from the canvas template's <style> block. */
const WS_CSS = `
html, body { margin: 0; padding: 0; height: 100%; }
[data-theme="dark"] {
  --goa-color-greyscale-white: #1e252e;
  --goa-color-greyscale-50: #232b34;
  --goa-color-greyscale-100: #161b21;
  --goa-color-greyscale-150: #2d3640;
  --goa-color-greyscale-200: #3a444f;
  --goa-color-greyscale-300: #56616d;
  --goa-color-surface-50: #1e252e;
  --goa-color-surface-0: #12161b;
  --goa-color-text-default: #eef1f4;
  --goa-color-text-secondary: #aab3bd;
  --goa-table-color-bg-heading: #232b34;
  --goa-table-color-heading: #eef1f4;
  color-scheme: dark;
}
[data-theme="dark"] .goab-worksidemenu {
  --goa-color-greyscale-900: #12161b;
  --goa-color-greyscale-white: #ffffff;
  --goa-color-greyscale-200: #d6d6d6;
  --goa-color-greyscale-300: #b3b3b3;
  --goa-color-greyscale-400: #9b9b9b;
}
.ws-card-container { flex: 1; min-width: 0; overflow: hidden; padding: 20px 20px 20px 0; box-sizing: border-box; }
.ws-card { height: 100%; background: var(--goa-color-greyscale-white); border: 1px solid var(--goa-color-greyscale-150); border-radius: var(--goa-border-radius-3xl, 24px); overflow: auto; display: flex; flex-direction: column; }
.page-header { position: sticky; top: 0; z-index: 100; background: var(--goa-color-greyscale-white); padding: var(--goa-space-l) var(--goa-space-xl) var(--goa-space-m); transition: box-shadow .15s ease, border-color .15s ease; border-bottom: 1px solid transparent; }
.page-header--scrolled { border-bottom-color: var(--goa-color-greyscale-150); box-shadow: 0 6px 10px -8px rgba(0,0,0,0.25); }
.page-header__content { display: flex; align-items: center; gap: var(--goa-space-m); flex-wrap: wrap; }
.page-header__title { font: var(--goa-typography-heading-l); margin: 0; }
.page-header__subtitle { font: var(--goa-typography-body-s); color: var(--goa-color-text-secondary); margin: var(--goa-space-3xs) 0 0; }
.page-header__spacer { flex: 1; min-width: var(--goa-space-m); }
.page-header__actions { display: flex; align-items: center; gap: var(--goa-space-s); flex-wrap: wrap; }
.content-padding { padding: 0 var(--goa-space-xl) var(--goa-space-xl); }
.ws-iconbtn { display: inline-flex; align-items: center; gap: var(--goa-space-2xs); height: 40px; padding: 0 var(--goa-space-s); border-radius: var(--goa-border-radius-m, 4px); background: none; border: 1px solid var(--goa-color-greyscale-200); cursor: pointer; color: var(--goa-color-text-secondary); font: var(--goa-typography-body-s); font-family: var(--goa-font-family-sans); }
.ws-iconbtn:hover { background: var(--goa-color-greyscale-100); color: var(--goa-color-text-default); }
.ws-iconbtn ion-icon { font-size: 18px; }
@media (max-width: 720px) { .ws-card-container { padding: 0; } .ws-card { border-radius: 0; border: none; } }
`;

export default Workspace;
