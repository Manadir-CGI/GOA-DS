import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Modal dialog (goa-modal).
 * Centered white panel over a 50% black overlay, with heading,
 * content and an actions footer.
 */

/**
 * Government of Alberta modal dialog — a centered panel over a dimmed overlay
 * for focused tasks, confirmations and destructive-action checks.
 */
export interface GoabModalProps {
  /** Controls visibility. */
  open?: boolean;
  /** Title shown in the header row. */
  heading?: React.ReactNode;
  /** Called when the overlay or close button is clicked. */
  onClose?: () => void;
  /** Footer actions (typically GoabButtons), right-aligned. */
  actions?: React.ReactNode;
  /** Render as a callout modal with a coloured header band and status icon. */
  calloutVariant?: "emergency" | "important" | "information" | "success" | "event" | null;
  /** Show the close icon and allow background-click to close. Defaults to false for callout modals, true for plain modals with onClose. */
  closable?: boolean;
  /** Open/close animation transition. "fast" or "slow"; omit for the default speed. */
  transition?: "fast" | "slow";
  /** Max width of the modal pane. Defaults to GOA's standard width. */
  maxWidth?: string;
  /** Margin tokens (none, 3xs…4xl) applied to the top / right / bottom / left of the pane. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

const CSS = `
.goab-modal__overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: var(--goa-color-greyscale-black);
  /* overlay opacity applied inline */
  display: flex; align-items: center; justify-content: center;
  padding: var(--goa-space-l);
}
.goab-modal {
  background: var(--goa-modal-color-bg);
  border-radius: var(--goa-modal-border-radius);
  box-shadow: var(--goa-modal-shadow);
  max-width: var(--goa-modal-max-width); width: 100%;
  max-height: 90vh; overflow: auto;
  font-family: var(--goa-font-family-sans);
}
.goab-modal__head {
  display: flex; align-items: flex-start; justify-content: space-between; gap: var(--goa-space-m);
  padding: var(--goa-modal-heading-padding);
  border-bottom: var(--goa-modal-heading-border-bottom);
}
.goab-modal__title { font: var(--goa-modal-header-typography); color: var(--goa-color-text-default); margin: 0; }
.goab-modal__close { background: none; border: none; cursor: pointer; font-size: var(--goa-icon-size-l); color: var(--goa-color-greyscale-600); line-height: 0; padding: 4px; border-radius: var(--goa-border-radius-m); }
.goab-modal__close:hover { background: var(--goa-color-greyscale-100); color: var(--goa-color-interactive-hover); }
.goab-modal__body { padding: var(--goa-modal-content-padding); padding-left: var(--goa-space-l); padding-right: var(--goa-space-l); font: var(--goa-typography-body-m); color: var(--goa-color-text-default); }
.goab-modal__body p { margin: 0; }
.goab-modal__actions { display: flex; justify-content: flex-end; gap: var(--goa-space-m); padding: var(--goa-modal-actions-padding); }

/* Callout modal header (calloutVariant) */
.goab-modal__callouthead {
  display: flex; align-items: flex-start; gap: var(--goa-space-xs);
  padding: var(--goa-space-m) var(--goa-space-l);
  border-radius: var(--goa-modal-border-radius) var(--goa-modal-border-radius) 0 0;
  border-bottom: 1px solid transparent;
}
.goab-modal__callouthead ion-icon { font-size: 24px; margin-top: 2px; flex: 0 0 auto; }
.goab-modal__callouthead .goab-modal__title { font: var(--goa-modal-header-typography); }
.goab-modal--important .goab-modal__callouthead { background: var(--goa-color-warning-background); border-bottom-color: var(--goa-color-warning-border); }
.goab-modal--important .goab-modal__callouthead ion-icon { color: var(--goa-color-warning-dark); }
.goab-modal--emergency .goab-modal__callouthead { background: var(--goa-color-emergency-background); border-bottom-color: var(--goa-color-emergency-border); }
.goab-modal--emergency .goab-modal__callouthead ion-icon { color: var(--goa-color-emergency-default); }
.goab-modal--information .goab-modal__callouthead { background: var(--goa-color-info-background); border-bottom-color: var(--goa-color-info-border); }
.goab-modal--information .goab-modal__callouthead ion-icon { color: var(--goa-color-info-default); }
.goab-modal--success .goab-modal__callouthead { background: var(--goa-color-success-background); border-bottom-color: var(--goa-color-success-border); }
.goab-modal--success .goab-modal__callouthead ion-icon { color: var(--goa-color-success-default); }
.goab-modal--event .goab-modal__callouthead { background: var(--goa-color-info-background); border-bottom-color: var(--goa-color-info-border); }
.goab-modal--event .goab-modal__callouthead ion-icon { color: var(--goa-color-info-default); }
.goab-modal--callout .goab-modal__body { padding-top: var(--goa-space-l); }
@keyframes goab-modal-in { from { opacity: 0; transform: translateY(8px) scale(.985); } to { opacity: 1; transform: none; } }
.goab-modal--anim { animation: goab-modal-in var(--goab-modal-dur, .2s) ease-out; }
`;

const CALLOUT_ICON: Record<string, string> = {
  emergency: "warning",
  important: "alert-circle",
  information: "information-circle",
  success: "checkmark-circle",
  event: "calendar",
};

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "modal");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabModal({
  open = false,
  heading,
  onClose,
  actions,
  children,
  calloutVariant = null,
  closable,
  transition,
  maxWidth = "var(--goa-modal-max-width)",
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabModalProps) {
  useStyles();
  if (!open) return null;
  const isCallout = calloutVariant != null;
  // Show the close icon when explicitly closable, or (legacy) when onClose is given on a plain modal.
  const showClose = closable != null ? !!closable : !isCallout && !!onClose;
  return (
    <div
      className="goab-modal__overlay"
      style={{ opacity: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={closable === false ? undefined : onClose}
    >
      <div
        className={`goab-modal${isCallout ? " goab-modal--callout goab-modal--" + calloutVariant : ""}${transition ? " goab-modal--anim" : ""}`}
        style={
          {
            maxWidth,
            "--goab-modal-dur":
              transition === "fast" ? ".12s" : transition === "slow" ? ".35s" : ".2s",
            marginTop: space(mt),
            marginRight: space(mr),
            marginBottom: space(mb),
            marginLeft: space(ml),
          } as React.CSSProperties
        }
        role="dialog"
        aria-modal="true"
        data-testid={testId}
        onClick={(e) => e.stopPropagation()}
      >
        {isCallout
          ? (heading || showClose) && (
              <div className="goab-modal__callouthead">
                <ion-icon
                  name={CALLOUT_ICON[calloutVariant as string] || "alert-circle"}
                ></ion-icon>
                <h2 className="goab-modal__title">{heading}</h2>
                {showClose && (
                  <button
                    className="goab-modal__close"
                    aria-label="Close"
                    onClick={onClose}
                    style={{ marginLeft: "auto" }}
                  >
                    <ion-icon name="close"></ion-icon>
                  </button>
                )}
              </div>
            )
          : heading && (
              <div className="goab-modal__head">
                <h2 className="goab-modal__title">{heading}</h2>
                {showClose && (
                  <button className="goab-modal__close" aria-label="Close" onClick={onClose}>
                    <ion-icon name="close"></ion-icon>
                  </button>
                )}
              </div>
            )}
        <div className="goab-modal__body">{children}</div>
        {actions && <div className="goab-modal__actions">{actions}</div>}
      </div>
    </div>
  );
}

export default GoabModal;
