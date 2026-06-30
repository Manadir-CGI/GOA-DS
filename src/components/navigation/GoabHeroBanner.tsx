import React from "react";

/**
 * Government of Alberta — Hero banner (goa-hero-banner).
 * A full-width band with a heading, supporting text and an optional call to
 * action, over a solid colour or background image with a readability scrim.
 */

/**
 * Government of Alberta hero banner — a full-width band with a heading,
 * supporting text and an optional call to action, over a solid colour or a
 * background image with a readability scrim.
 */
export interface GoabHeroBannerProps {
  heading?: React.ReactNode;
  /** Background image URL (adds a left-to-right scrim by default). */
  backgroundUrl?: string;
  /** Solid background colour (used when no image). */
  backgroundColor?: string;
  minHeight?: string;
  /** Toggle the readability scrim over an image. Default true. */
  scrim?: boolean;
  /** Maximum width of the content area. Default "100%". */
  maxContentWidth?: string;
  /** Text colour within the hero banner (any CSS colour). */
  textColor?: string;
  /** Supporting body text. */
  children?: React.ReactNode;
  /** Action row, typically GoabButtons. */
  actions?: React.ReactNode;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
.goab-hero {
  position: relative; box-sizing: border-box; width: 100%;
  display: flex; flex-direction: column; justify-content: flex-end;
  background-color: var(--goa-color-brand-default, #0081a2);
  background-size: cover; background-position: center;
  color: var(--goa-color-greyscale-white);
  font-family: var(--goa-font-family-sans);
  overflow: hidden;
}
.goab-hero__scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 41.67%, rgba(0,0,0,0.6) 100%); }
.goab-hero__inner { position: relative; max-width: 1224px; margin: 0 auto; width: 100%; padding: var(--goa-space-2xl) var(--goa-space-3xl); }
.goab-hero__content { max-width: 640px; }
.goab-hero__title { font: var(--goa-typography-heading-2xl, 700 48px/1.1 var(--goa-font-family-sans)); margin: 0 0 var(--goa-space-s); color: inherit; }
.goab-hero__text { font: var(--goa-typography-body-l); margin: 0 0 var(--goa-space-l); text-wrap: pretty; }
.goab-hero__actions { display: flex; gap: var(--goa-space-m); flex-wrap: wrap; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "hero");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabHeroBanner({
  heading,
  backgroundUrl,
  backgroundColor,
  minHeight = "320px",
  scrim = true,
  maxContentWidth = "100%",
  textColor,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  actions,
}: GoabHeroBannerProps) {
  useStyles();
  const style: React.CSSProperties = { minHeight };
  if (backgroundUrl) style.backgroundImage = `url("${backgroundUrl}")`;
  if (backgroundColor) style.backgroundColor = backgroundColor;
  if (textColor) style.color = textColor;
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <section className="goab-hero" style={style} data-testid={testId}>
      {backgroundUrl && scrim && <div className="goab-hero__scrim"></div>}
      <div className="goab-hero__inner" style={{ maxWidth: maxContentWidth }}>
        <div className="goab-hero__content">
          {heading && <h1 className="goab-hero__title">{heading}</h1>}
          {children && <div className="goab-hero__text">{children}</div>}
          {actions && <div className="goab-hero__actions">{actions}</div>}
        </div>
      </div>
    </section>
  );
}

export default GoabHeroBanner;
