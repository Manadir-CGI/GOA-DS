import React, { useEffect, useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Temporary notification (goa-temporary-notification).
 * A toast that slides up from the bottom of the screen with a message, an
 * optional action link and an optional auto-dismiss progress bar.
 */

/**
 * Government of Alberta temporary notification — a toast that slides up from
 * the bottom of the screen with a message, an optional action and an optional
 * auto-dismiss progress bar.
 */
export interface GoabTemporaryNotificationProps {
  open?: boolean;
  type?: "information" | "success" | "failure";
  message?: React.ReactNode;
  /** Optional inline action label (e.g. "Undo"). */
  actionText?: React.ReactNode;
  onAction?: () => void;
  /** Auto-dismiss after this many ms (shows a progress bar). 0 = manual. */
  duration?: number;
  onClose?: () => void;
  /** Horizontal position of the toast. Default "center". */
  horizontalPosition?: "left" | "center" | "right";
  /** Vertical position of the toast. Default "bottom". */
  verticalPosition?: "top" | "bottom";
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
@keyframes goab-toast-in { from { transform: translate(-50%, 120%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
.goab-toast {
  position: fixed; left: 50%; bottom: var(--goa-space-xl); transform: translateX(-50%);
  z-index: 1100; box-sizing: border-box;
  min-width: var(--goa-temporary-notification-min-width-desktop, 360px);
  max-width: var(--goa-temporary-notification-max-width, 640px);
  padding: var(--goa-temporary-notification-padding, 16px 24px);
  border-radius: var(--goa-temporary-notification-border-radius, 8px);
  box-shadow: var(--goa-temporary-notification-shadow, 0 16px 32px -8px rgba(0,0,0,0.35));
  background: var(--goa-temporary-notification-color-bg-basic, #333333);
  color: var(--goa-color-greyscale-white);
  font-family: var(--goa-font-family-sans);
  animation: goab-toast-in var(--goa-temporary-notification-transition-duration, .3s) cubic-bezier(0.25,0.8,0.25,1);
  overflow: hidden;
}
.goab-toast--success { background: var(--goa-temporary-notification-color-bg-success, var(--goa-color-success-default)); }
.goab-toast--failure { background: var(--goa-temporary-notification-color-bg-failure, var(--goa-color-emergency-default)); }
.goab-toast__row { display: flex; align-items: center; gap: var(--goa-temporary-notification-column-gap, 12px); }
.goab-toast__icon { font-size: var(--goa-temporary-notification-icon-size, 28px); flex: 0 0 auto; }
.goab-toast__msg { flex: 1; font: var(--goa-typography-body-m); }
.goab-toast__action { background: none; border: none; cursor: pointer; color: var(--goa-color-greyscale-white); font: var(--goa-font-weight-bold) var(--goa-font-size-3, 16px)/1.2 var(--goa-font-family-sans); text-decoration: underline; text-underline-offset: 3px; white-space: nowrap; }
.goab-toast__close { background: none; border: none; cursor: pointer; color: var(--goa-color-greyscale-white); line-height: 0; padding: 4px; flex: 0 0 auto; }
.goab-toast__close ion-icon { font-size: var(--goa-icon-size-m); }
.goab-toast__track { position: absolute; left: 0; bottom: 0; height: var(--goa-temporary-notification-progress-bar-height, 6px); width: 100%; background: var(--goa-temporary-notification-progress-bar-color-bg, rgba(255,255,255,0.3)); }
.goab-toast__bar { height: 100%; background: var(--goa-temporary-notification-progress-bar-color-fill, #fff); transition: width .1s linear; }
@keyframes goab-toast-fade { from { opacity: 0; } to { opacity: 1; } }
.goab-toast--top { top: var(--goa-space-xl); bottom: auto; }
.goab-toast--left { left: var(--goa-space-xl); right: auto; transform: none; animation-name: goab-toast-fade; }
.goab-toast--right { left: auto; right: var(--goa-space-xl); transform: none; animation-name: goab-toast-fade; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "toast");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const ICONS: Record<string, string> = {
  information: "information-circle",
  success: "checkmark-circle",
  failure: "alert-circle",
};

export function GoabTemporaryNotification({
  open = false,
  type = "information",
  message,
  actionText,
  onAction,
  duration = 0,
  onClose,
  horizontalPosition = "center",
  verticalPosition = "bottom",
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabTemporaryNotificationProps) {
  useStyles();
  const [pct, setPct] = useState(100);

  useEffect(() => {
    if (!open || !duration) return;
    setPct(100);
    const start = Date.now();
    const iv = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setPct(remaining);
      if (remaining <= 0) {
        clearInterval(iv);
        onClose && onClose();
      }
    }, 50);
    return () => clearInterval(iv);
  }, [open, duration]);

  if (!open) return null;

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className={`goab-toast goab-toast--${type} goab-toast--${verticalPosition} goab-toast--${horizontalPosition}`}
      role="status"
      aria-live="polite"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <div className="goab-toast__row">
        <ion-icon className="goab-toast__icon" name={ICONS[type] || ICONS.information}></ion-icon>
        <span className="goab-toast__msg">{message}</span>
        {actionText && (
          <button type="button" className="goab-toast__action" onClick={onAction}>
            {actionText}
          </button>
        )}
        {onClose && (
          <button
            type="button"
            className="goab-toast__close"
            aria-label="Dismiss"
            onClick={onClose}
          >
            <ion-icon name="close"></ion-icon>
          </button>
        )}
      </div>
      {duration > 0 && (
        <div className="goab-toast__track">
          <div className="goab-toast__bar" style={{ width: pct + "%" }} />
        </div>
      )}
    </div>
  );
}

export default GoabTemporaryNotification;
