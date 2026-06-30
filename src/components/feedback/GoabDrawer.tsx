import React, { useState, useEffect } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Drawer (goa-drawer / push drawer).
 * A panel that slides in from the right (default), left or bottom over a
 * dimmed overlay, with a heading, scrolling content and an actions footer.
 */

export type GoabDrawerPosition = "right" | "left" | "bottom";

/**
 * Government of Alberta drawer — a panel that slides in over a dimmed overlay
 * for secondary tasks and detail views without leaving the page (filters,
 * record details, help). Closes on overlay click or the close button.
 */
export interface GoabDrawerProps {
  open?: boolean;
  heading?: React.ReactNode;
  /** Edge the drawer slides from. Default "right". */
  position?: GoabDrawerPosition;
  /** CSS size — width for right/left, height for bottom. */
  maxSize?: string;
  /** Footer actions row (typically GoabButtons). */
  actions?: React.ReactNode;
  onClose?: () => void;
  /** Margin tokens (none, 3xs…4xl) applied to the top / right / bottom / left of the panel. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

const CSS = `
.goab-drawer__overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.5);
  opacity: 0; transition: opacity var(--goa-push-drawer-transition-time) ease;
  display: flex;
}
.goab-drawer__overlay--in { opacity: 1; }
.goab-drawer__overlay--right { justify-content: flex-end; }
.goab-drawer__overlay--left { justify-content: flex-start; }
.goab-drawer__overlay--bottom { align-items: flex-end; }
.goab-drawer {
  display: flex; flex-direction: column;
  background: var(--goa-color-greyscale-white);
  box-shadow: var(--goa-shadow-modal);
  font-family: var(--goa-font-family-sans);
  transition: transform var(--goa-push-drawer-transition-time) cubic-bezier(0.25, 0.8, 0.25, 1);
  max-width: 100%;
}
.goab-drawer--right, .goab-drawer--left { height: 100%; width: 420px; }
.goab-drawer--right { transform: translateX(100%); }
.goab-drawer--left { transform: translateX(-100%); }
.goab-drawer--bottom { width: 100%; max-height: 80vh; transform: translateY(100%); border-radius: var(--goa-border-radius-l) var(--goa-border-radius-l) 0 0; }
.goab-drawer--in { transform: none; }
.goab-drawer__head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: var(--goa-space-m);
  padding: var(--goa-push-drawer-padding) var(--goa-push-drawer-content-padding-horizontal);
  border-bottom: var(--goa-border-width-2xs) solid var(--goa-color-greyscale-200);
}
.goab-drawer__title { font: var(--goa-push-drawer-heading-typography); color: var(--goa-color-text-default); margin: 0; }
.goab-drawer__close { background: none; border: none; cursor: pointer; font-size: var(--goa-icon-size-l); color: var(--goa-color-greyscale-600); line-height: 0; padding: 4px; border-radius: var(--goa-border-radius-m); }
.goab-drawer__close:hover { background: var(--goa-color-greyscale-100); color: var(--goa-color-interactive-hover); }
.goab-drawer__body {
  flex: 1; overflow-y: auto;
  padding: var(--goa-push-drawer-content-padding-vertical) var(--goa-push-drawer-content-padding-horizontal);
  font: var(--goa-typography-body-m); color: var(--goa-color-text-default);
}
.goab-drawer__body p { margin: 0 0 var(--goa-space-m); }
.goab-drawer__actions {
  display: flex; gap: var(--goa-space-m);
  padding: var(--goa-push-drawer-actions-padding-top) var(--goa-push-drawer-content-padding-horizontal) var(--goa-push-drawer-actions-padding-bottom);
  border-top: var(--goa-border-width-2xs) solid var(--goa-color-greyscale-200);
}
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "drawer");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabDrawer({
  open = false,
  heading,
  position = "right",
  onClose,
  actions,
  maxSize,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabDrawerProps) {
  useStyles();
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf: number, timer: ReturnType<typeof setTimeout>;
    if (open) {
      setMounted(true);
      raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    } else {
      setShown(false);
      timer = setTimeout(() => setMounted(false), 260);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [open]);

  if (!mounted) return null;

  const sizeStyle: React.CSSProperties = {};
  if (maxSize) {
    if (position === "bottom") sizeStyle.height = maxSize;
    else sizeStyle.width = maxSize;
  }
  if (mt != null) sizeStyle.marginTop = space(mt);
  if (mr != null) sizeStyle.marginRight = space(mr);
  if (mb != null) sizeStyle.marginBottom = space(mb);
  if (ml != null) sizeStyle.marginLeft = space(ml);

  return (
    <div
      className={`goab-drawer__overlay goab-drawer__overlay--${position}${shown ? " goab-drawer__overlay--in" : ""}`}
      onClick={onClose}
    >
      <div
        className={`goab-drawer goab-drawer--${position}${shown ? " goab-drawer--in" : ""}`}
        role="dialog"
        aria-modal="true"
        style={sizeStyle}
        data-testid={testId}
        onClick={(e) => e.stopPropagation()}
      >
        {heading && (
          <div className="goab-drawer__head">
            <h2 className="goab-drawer__title">{heading}</h2>
            {onClose && (
              <button className="goab-drawer__close" aria-label="Close" onClick={onClose}>
                <ion-icon name="close"></ion-icon>
              </button>
            )}
          </div>
        )}
        <div className="goab-drawer__body">{children}</div>
        {actions && <div className="goab-drawer__actions">{actions}</div>}
      </div>
    </div>
  );
}

export default GoabDrawer;
