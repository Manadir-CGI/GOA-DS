import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Push drawer (goa-push-drawer).
 * A side panel that PUSHES the main page content aside on wide screens
 * (the layout splits in two) and overlays it on narrow screens. Wrap the
 * page content and pass the panel via `drawer`.
 */

/**
 * Government of Alberta push drawer — a side panel that pushes the main page
 * content aside on wide screens and overlays it on narrow screens. Wrap the
 * page content as children; pass the panel content via `drawer`.
 */
export interface GoabPushDrawerProps {
  open?: boolean;
  heading?: React.ReactNode;
  position?: "right" | "left";
  /** Panel width. Default "492px". */
  width?: string;
  /** Panel width (legacy alias of `width`). */
  maxSize?: string;
  onClose?: () => void;
  /** Panel content. */
  drawer?: React.ReactNode;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Main page content. */
  children?: React.ReactNode;
}

const CSS = `
.goab-pushdrawer { display: flex; width: 100%; position: relative; align-items: stretch; }
.goab-pushdrawer--left { flex-direction: row-reverse; }
.goab-pushdrawer__content { flex: 1; min-width: 0; transition: margin var(--goa-push-drawer-transition-time, .25s) ease; }
.goab-pushdrawer__panel {
  flex: 0 0 auto; width: 0; overflow: hidden;
  background: var(--goa-color-greyscale-white);
  border-left: var(--goa-border-width-2xs, 1px) solid var(--goa-color-greyscale-200);
  transition: width var(--goa-push-drawer-transition-time, .25s) cubic-bezier(0.25,0.8,0.25,1);
  font-family: var(--goa-font-family-sans);
}
.goab-pushdrawer--left .goab-pushdrawer__panel { border-left: none; border-right: var(--goa-border-width-2xs, 1px) solid var(--goa-color-greyscale-200); }
.goab-pushdrawer__panel--open { width: var(--goab-pushdrawer-w, 360px); }
.goab-pushdrawer__inner { width: var(--goab-pushdrawer-w, 360px); box-sizing: border-box; display: flex; flex-direction: column; height: 100%; }
.goab-pushdrawer__head { display: flex; align-items: center; justify-content: space-between; gap: var(--goa-space-m); padding: var(--goa-space-l); border-bottom: var(--goa-border-width-2xs,1px) solid var(--goa-color-greyscale-200); }
.goab-pushdrawer__title { font: var(--goa-typography-heading-s); margin: 0; color: var(--goa-color-text-default); }
.goab-pushdrawer__close { background: none; border: none; cursor: pointer; line-height: 0; padding: 4px; border-radius: var(--goa-border-radius-m,4px); color: var(--goa-color-greyscale-600); }
.goab-pushdrawer__close:hover { background: var(--goa-color-greyscale-100); }
.goab-pushdrawer__close ion-icon { font-size: var(--goa-icon-size-l); }
.goab-pushdrawer__body { padding: var(--goa-space-l); overflow-y: auto; font: var(--goa-typography-body-m); color: var(--goa-color-text-default); }

@media (max-width: 768px) {
  .goab-pushdrawer__panel { position: absolute; top: 0; bottom: 0; right: 0; z-index: 80; box-shadow: var(--goa-shadow-modal, 0 16px 32px -8px rgba(0,0,0,0.35)); }
  .goab-pushdrawer--left .goab-pushdrawer__panel { right: auto; left: 0; }
}
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "pushdrawer");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabPushDrawer({
  open = false,
  heading,
  position = "right",
  width,
  maxSize,
  onClose,
  drawer,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabPushDrawerProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {
    "--goab-pushdrawer-w": width ?? maxSize ?? "492px",
  } as React.CSSProperties;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <div
      className={`goab-pushdrawer goab-pushdrawer--${position}`}
      style={rootStyle}
      data-testid={testId}
    >
      <div className="goab-pushdrawer__content">{children}</div>
      <div
        className={`goab-pushdrawer__panel${open ? " goab-pushdrawer__panel--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="goab-pushdrawer__inner">
          {heading && (
            <div className="goab-pushdrawer__head">
              <h2 className="goab-pushdrawer__title">{heading}</h2>
              {onClose && (
                <button className="goab-pushdrawer__close" aria-label="Close" onClick={onClose}>
                  <ion-icon name="close"></ion-icon>
                </button>
              )}
            </div>
          )}
          <div className="goab-pushdrawer__body">{drawer}</div>
        </div>
      </div>
    </div>
  );
}

export default GoabPushDrawer;
