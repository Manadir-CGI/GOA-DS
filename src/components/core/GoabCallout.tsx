import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Callout (goa-callout), version 2 layout.
 * A bordered, rounded container with a tinted HEADING BAND across the top
 * (status icon + bold heading) and the body below — matching the current GoA
 * design. `emphasis` sets prominence: "medium" (default, subtle band),
 * "high" (saturated), "low" (minimal, transparent band). Tokens and anatomy
 * mirror libs/web-components/.../Callout.svelte exactly.
 */

export type GoabCalloutType = "information" | "important" | "emergency" | "success" | "event";
export type GoabCalloutSize = "medium" | "large";
export type GoabCalloutEmphasis = "high" | "medium" | "low";
export type GoabCalloutIconTheme = "outline" | "filled";
export type GoabCalloutAriaLive = "off" | "polite" | "assertive";

/**
 * Government of Alberta callout — draws attention to important information with
 * a semantic colour, a leading status icon, an optional heading and body content.
 */
export interface GoabCalloutProps {
  /** Context and colour. Defaults to "information". */
  type?: GoabCalloutType;
  /** "medium" uses reduced padding and type size for tighter areas. Defaults to "large". */
  size?: GoabCalloutSize;
  /** Visual prominence. "high" = full background, "medium" = subtle (default), "low" = minimal. */
  emphasis?: GoabCalloutEmphasis;
  /** Icon theme. "outline" (default) for stroked icons, "filled" for solid. */
  iconTheme?: GoabCalloutIconTheme;
  /** How assistive tech announces updates to the live region. Defaults to "off". */
  ariaLive?: GoabCalloutAriaLive;
  /** Optional bold heading shown above the content. */
  heading?: string;
  /** Maximum width of the callout (any CSS length). */
  maxWidth?: string;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Callout body content. */
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CSS = `
.goab-callout {
  box-sizing: border-box;
  font-family: var(--goa-font-family-sans);
  display: flex; flex-direction: column; overflow: hidden;
  border: var(--goa-callout-border);
  border-radius: var(--goa-callout-border-radius);
}
.goab-callout__heading {
  display: flex; flex-direction: row; align-items: flex-start;
  gap: var(--goa-callout-heading-gap);
  padding: var(--goa-callout-heading-padding);
  color: var(--goa-callout-heading-color);
}
.goab-callout__icon { flex: 0 0 auto; font-size: var(--goa-icon-size-4, 24px); line-height: 1; }
.goab-callout__label { margin: var(--goa-space-3xs) 0; font: var(--goa-callout-heading-typography); }
.goab-callout__body {
  padding: var(--goa-callout-body-padding);
  color: var(--goa-callout-body-color);
  font: var(--goa-callout-body-typography);
}
.goab-callout__body > :first-child { margin-top: 0; }
.goab-callout__body > :last-child { margin-bottom: 0; }

/* medium emphasis (default): tinted container + heading band, coloured icon */
.goab-callout--information, .goab-callout--event { background-color: var(--goa-callout-info-content-bg-color); }
.goab-callout--information .goab-callout__heading, .goab-callout--event .goab-callout__heading { background-color: var(--goa-callout-info-heading-bg-color); }
.goab-callout--information .goab-callout__icon, .goab-callout--event .goab-callout__icon { color: var(--goa-callout-info-icon-color); }
.goab-callout--important { background-color: var(--goa-callout-important-content-bg-color); }
.goab-callout--important .goab-callout__heading { background-color: var(--goa-callout-important-heading-bg-color); }
.goab-callout--important .goab-callout__icon { color: var(--goa-callout-important-icon-color); }
.goab-callout--emergency { background-color: var(--goa-callout-emergency-content-bg-color); }
.goab-callout--emergency .goab-callout__heading { background-color: var(--goa-callout-emergency-heading-bg-color); }
.goab-callout--emergency .goab-callout__icon { color: var(--goa-callout-emergency-icon-color); }
.goab-callout--success { background-color: var(--goa-callout-success-content-bg-color); }
.goab-callout--success .goab-callout__heading { background-color: var(--goa-callout-success-heading-bg-color); }
.goab-callout--success .goab-callout__icon { color: var(--goa-callout-success-icon-color); }

/* high emphasis: saturated container + heading band, contrast heading text */
.goab-callout--high.goab-callout--information, .goab-callout--high.goab-callout--event { border-color: var(--goa-callout-h-info-border-color); background-color: var(--goa-callout-h-info-content-bg-color); }
.goab-callout--high.goab-callout--information .goab-callout__heading, .goab-callout--high.goab-callout--event .goab-callout__heading { background-color: var(--goa-callout-h-info-heading-bg-color); color: var(--goa-callout-h-info-heading-color); }
.goab-callout--high.goab-callout--information .goab-callout__icon, .goab-callout--high.goab-callout--event .goab-callout__icon { color: var(--goa-callout-h-info-icon-color); }
.goab-callout--high.goab-callout--important { border-color: var(--goa-callout-h-important-border-color); background-color: var(--goa-callout-h-important-content-bg-color); }
.goab-callout--high.goab-callout--important .goab-callout__heading { background-color: var(--goa-callout-h-important-heading-bg-color); color: var(--goa-callout-h-important-heading-color); }
.goab-callout--high.goab-callout--important .goab-callout__icon { color: var(--goa-callout-h-important-icon-color); }
.goab-callout--high.goab-callout--emergency { border-color: var(--goa-callout-h-emergency-border-color); background-color: var(--goa-callout-h-emergency-content-bg-color); }
.goab-callout--high.goab-callout--emergency .goab-callout__heading { background-color: var(--goa-callout-h-emergency-heading-bg-color); color: var(--goa-callout-h-emergency-heading-color); }
.goab-callout--high.goab-callout--emergency .goab-callout__icon { color: var(--goa-callout-h-emergency-icon-color); }
.goab-callout--high.goab-callout--success { border-color: var(--goa-callout-h-success-border-color); background-color: var(--goa-callout-h-success-content-bg-color); }
.goab-callout--high.goab-callout--success .goab-callout__heading { background-color: var(--goa-callout-h-success-heading-bg-color); color: var(--goa-callout-h-success-heading-color); }
.goab-callout--high.goab-callout--success .goab-callout__icon { color: var(--goa-callout-h-success-icon-color); }

/* low emphasis: minimal tint + transparent heading band */
.goab-callout--low.goab-callout--information, .goab-callout--low.goab-callout--event { border-color: var(--goa-callout-l-info-border-color); background-color: var(--goa-callout-l-info-content-bg-color); }
.goab-callout--low.goab-callout--important { border-color: var(--goa-callout-l-important-border-color); background-color: var(--goa-callout-l-important-content-bg-color); }
.goab-callout--low.goab-callout--emergency { border-color: var(--goa-callout-l-emergency-border-color); background-color: var(--goa-callout-l-emergency-content-bg-color); }
.goab-callout--low.goab-callout--success { border-color: var(--goa-callout-l-success-border-color); background-color: var(--goa-callout-l-success-content-bg-color); }
.goab-callout--low .goab-callout__heading { background-color: transparent; }
.goab-callout--low .goab-callout__body { padding: var(--goa-callout-l-with-heading-body-padding); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "callout");
  el.textContent = CSS;
  document.head.appendChild(el);
}

// Filled icon per type; "-outline" appended for high emphasis (per Callout.svelte).
const ICONS: Record<string, string> = {
  information: "information-circle",
  event: "calendar",
  important: "warning",
  emergency: "alert-circle",
  success: "checkmark-circle",
};

export function GoabCallout({
  type = "information",
  size = "large",
  emphasis = "medium",
  iconTheme,
  heading,
  maxWidth = "none",
  ariaLive = "off",
  mt,
  mr,
  mb = "l",
  ml,
  testId,
  children,
  ...rest
}: GoabCalloutProps) {
  useStyles();

  const style: React.CSSProperties = {};
  if (maxWidth && maxWidth !== "none") style.maxWidth = maxWidth;
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);

  const base = ICONS[type] || ICONS.information;
  // v2 derives icon theme from emphasis (high = outline, otherwise filled);
  // an explicit iconTheme prop still wins if provided.
  const useOutline = iconTheme ? iconTheme === "outline" : emphasis === "high";
  const iconName = useOutline ? `${base}-outline` : base;

  return (
    <div
      className={`goab-callout goab-callout--${type} goab-callout--${emphasis}`}
      role="region"
      aria-live={ariaLive !== "off" ? ariaLive : undefined}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      <div className="goab-callout__heading">
        <ion-icon class="goab-callout__icon" name={iconName}></ion-icon>
        {heading ? <h3 className="goab-callout__label">{heading}</h3> : null}
      </div>
      <div className="goab-callout__body">{children}</div>
    </div>
  );
}

export default GoabCallout;
