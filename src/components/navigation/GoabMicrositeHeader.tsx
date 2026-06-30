import React from "react";

/**
 * Government of Alberta — Microsite header (goa-microsite-header).
 * A slim strip above the app header that links back to Alberta.ca, shows the
 * service phase (alpha / beta) and offers a feedback link.
 */

export type GoabLinkTarget = "self" | "blank";

/**
 * Government of Alberta microsite header — a slim strip above the app header
 * that links back to Alberta.ca, communicates the service phase (alpha/beta)
 * and offers a feedback link.
 */
export interface GoabMicrositeHeaderProps {
  /** Service phase. "live" hides the phase tag. */
  type?: "alpha" | "beta" | "live";
  /** Optional version label, e.g. "v2.1". */
  version?: React.ReactNode;
  feedbackHref?: string;
  /** URL to a feedback page (alias of feedbackHref). */
  feedbackUrl?: string;
  /** target for the feedback link. Default "blank". */
  feedbackUrlTarget?: GoabLinkTarget;
  /** target for the Alberta.ca header link. Default "blank". */
  headerUrlTarget?: GoabLinkTarget;
  /** Maximum width of the content area. Default "100%". */
  maxContentWidth?: string;
  feedbackText?: React.ReactNode;
  onFeedback?: () => void;
  /** Alberta.ca home link. */
  homeHref?: string;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
.goab-microsite {
  display: flex; align-items: center; gap: var(--goa-space-m);
  padding: var(--goa-space-2xs) var(--goa-space-l);
  background: var(--goa-color-greyscale-white);
  border-bottom: var(--goa-border-width-2xs, 1px) solid var(--goa-color-greyscale-200);
  font-family: var(--goa-font-family-sans); font: var(--goa-typography-body-s);
  color: var(--goa-color-text-default); min-height: 40px; box-sizing: border-box;
}
.goab-microsite__home { display: inline-flex; align-items: center; gap: var(--goa-space-2xs); color: var(--goa-color-interactive-default); text-decoration: none; font-weight: var(--goa-font-weight-bold); }
.goab-microsite__home:hover { text-decoration: underline; }
.goab-microsite__home ion-icon { font-size: var(--goa-icon-size-s); }
.goab-microsite__phase {
  display: inline-flex; align-items: center; padding: 2px var(--goa-space-xs);
  border-radius: var(--goa-border-radius-m); text-transform: uppercase;
  font-weight: var(--goa-font-weight-bold); font-size: 12px; letter-spacing: .04em;
  background: var(--goa-microsite-header-beta-badge-color, var(--goa-color-brand-default)); color: var(--goa-microsite-header-beta-badge-color-text, var(--goa-color-text-light));
}
.goab-microsite__phase--alpha { background: var(--goa-microsite-header-alpha-badge-color, var(--goa-color-warning-default)); color: var(--goa-microsite-header-alpha-badge-color-text, var(--goa-color-text-default)); }
.goab-microsite__phase--beta { background: var(--goa-microsite-header-beta-badge-color, var(--goa-color-brand-default)); color: var(--goa-microsite-header-beta-badge-color-text, var(--goa-color-text-light)); }
.goab-microsite__spacer { flex: 1; }
.goab-microsite__feedback { color: var(--goa-color-interactive-default); text-decoration: underline; text-underline-offset: 2px; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "microsite");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabMicrositeHeader({
  type = "live",
  version,
  feedbackHref,
  feedbackUrl,
  feedbackText = "Give feedback",
  feedbackUrlTarget = "blank",
  headerUrlTarget = "blank",
  homeHref = "https://www.alberta.ca",
  maxContentWidth,
  onFeedback,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabMicrositeHeaderProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (maxContentWidth && maxContentWidth !== "100%") {
    rootStyle.maxWidth = maxContentWidth;
    rootStyle.marginLeft = "auto";
    rootStyle.marginRight = "auto";
  }
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  const fbHref = feedbackHref || feedbackUrl;
  return (
    <div
      className="goab-microsite"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <a
        className="goab-microsite__home"
        href={homeHref}
        target={headerUrlTarget === "blank" ? "_blank" : undefined}
        rel={headerUrlTarget === "blank" ? "noopener noreferrer" : undefined}
      >
        <ion-icon name="arrow-back"></ion-icon> Alberta.ca
      </a>
      {type !== "live" && (
        <span className={`goab-microsite__phase goab-microsite__phase--${type}`}>{type}</span>
      )}
      {version && <span style={{ color: "var(--goa-color-text-secondary)" }}>{version}</span>}
      <span className="goab-microsite__spacer"></span>
      {(fbHref || onFeedback) && (
        <a
          className="goab-microsite__feedback"
          href={fbHref || "#"}
          target={feedbackUrlTarget === "blank" ? "_blank" : undefined}
          rel={feedbackUrlTarget === "blank" ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (onFeedback) {
              e.preventDefault();
              onFeedback();
            }
          }}
        >
          {feedbackText}
        </a>
      )}
    </div>
  );
}

export default GoabMicrositeHeader;
