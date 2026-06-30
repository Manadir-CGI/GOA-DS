import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Notification banner (goa-notification-banner).
 * Full-width semantic message strip with an icon, message, optional
 * action link and a dismiss button.
 */

export type GoabNotificationType = "information" | "important" | "emergency" | "event";
export type GoabNotificationEmphasis = "high" | "low";
export type GoabAriaLiveType = "off" | "polite" | "assertive";

/**
 * Government of Alberta notification banner — a full-width, page-level message
 * strip for site-wide or page-wide announcements (outages, deadlines, alerts).
 */
export interface GoabNotificationBannerProps {
  type?: GoabNotificationType;
  /** Visual prominence. "high" (default, full background) or "low" (white with a coloured accent). */
  emphasis?: GoabNotificationEmphasis;
  /** When true, reduces padding for a more compact banner. */
  compact?: boolean;
  /** How assistive tech announces updates. Default "polite". */
  ariaLive?: GoabAriaLiveType;
  /** Maximum width of the content area. Default "100%". */
  maxContentWidth?: string;
  /** Optional inline action link text. */
  actionText?: string;
  onAction?: () => void;
  /** Show the dismiss (close) button. Default true. */
  dismissible?: boolean;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

const CSS = `
.goab-notification {
  display: flex; align-items: center; gap: var(--goa-notification-banner-gap);
  padding: var(--goa-notification-banner-padding-tb) var(--goa-notification-banner-padding-lr-large-screen);
  font-family: var(--goa-font-family-sans);
  font: var(--goa-typography-body-m);
}
.goab-notification__icon { font-size: var(--goa-icon-size-4); flex: 0 0 auto; }
.goab-notification__msg { flex: 1; }
.goab-notification__action { color: inherit; font-weight: var(--goa-font-weight-bold); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; background: none; border: none; font: inherit; }
.goab-notification__close { background: none; border: none; cursor: pointer; font-size: var(--goa-icon-size-l); color: inherit; line-height: 0; padding: 4px; border-radius: var(--goa-border-radius-s); flex: 0 0 auto; }

.goab-notification--information { background: var(--goa-notification-banner-information-color-bg); color: var(--goa-notification-banner-information-color-text); }
.goab-notification--event { background: var(--goa-notification-banner-event-color-bg); color: var(--goa-notification-banner-event-color-text); }
.goab-notification--emergency { background: var(--goa-notification-banner-emergency-color-bg); color: var(--goa-notification-banner-emergency-color-text); }
.goab-notification--important { background: var(--goa-notification-banner-important-color-bg); color: var(--goa-notification-banner-important-color-text); }
.goab-notification--compact { padding-top: var(--goa-space-xs); padding-bottom: var(--goa-space-xs); }
.goab-notification__inner { display: flex; align-items: center; gap: var(--goa-notification-banner-gap); width: 100%; margin: 0 auto; }
.goab-notification--low { background: var(--goa-color-greyscale-white); color: var(--goa-color-text-default); }
.goab-notification--low.goab-notification--information { box-shadow: inset 4px 0 0 var(--goa-notification-banner-information-color-bg); }
.goab-notification--low.goab-notification--information .goab-notification__icon { color: var(--goa-notification-banner-information-color-bg); }
.goab-notification--low.goab-notification--event { box-shadow: inset 4px 0 0 var(--goa-notification-banner-event-color-bg); }
.goab-notification--low.goab-notification--event .goab-notification__icon { color: var(--goa-notification-banner-event-color-bg); }
.goab-notification--low.goab-notification--emergency { box-shadow: inset 4px 0 0 var(--goa-notification-banner-emergency-color-bg); }
.goab-notification--low.goab-notification--emergency .goab-notification__icon { color: var(--goa-notification-banner-emergency-color-bg); }
.goab-notification--low.goab-notification--important { box-shadow: inset 4px 0 0 var(--goa-notification-banner-important-color-bg); }
.goab-notification--low.goab-notification--important .goab-notification__icon { color: var(--goa-notification-banner-important-color-bg); }
.goab-notification__close:hover { background: rgba(0,0,0,.12); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "notification");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const ICONS: Record<string, string> = {
  information: "information-circle",
  event: "calendar",
  emergency: "alert-circle",
  important: "warning",
};

export function GoabNotificationBanner({
  type = "information",
  emphasis = "high",
  compact = false,
  ariaLive = "polite",
  maxContentWidth = "100%",
  actionText,
  onAction,
  dismissible = true,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabNotificationBannerProps) {
  useStyles();
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <div
      className={`goab-notification goab-notification--${type}${emphasis === "low" ? " goab-notification--low" : ""}${compact ? " goab-notification--compact" : ""}`}
      role="status"
      aria-live={ariaLive}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <div className="goab-notification__inner" style={{ maxWidth: maxContentWidth }}>
        <ion-icon class="goab-notification__icon" name={ICONS[type]}></ion-icon>
        <span className="goab-notification__msg">{children}</span>
        {actionText && (
          <button className="goab-notification__action" onClick={onAction}>
            {actionText}
          </button>
        )}
        {dismissible && (
          <button
            className="goab-notification__close"
            aria-label="Dismiss"
            onClick={() => setShown(false)}
          >
            <ion-icon name="close"></ion-icon>
          </button>
        )}
      </div>
    </div>
  );
}

export default GoabNotificationBanner;
