import React from "react";

/**
 * Government of Alberta — Link button (goa-link-button / button styled as a
 * link). An anchor with the GoA interactive colour and underline, with
 * optional leading/trailing icons. For secondary, low-emphasis actions.
 */

/**
 * Government of Alberta link button — a button styled as a link for
 * secondary, low-emphasis actions. Renders an <a> when `href` is given,
 * otherwise a <button>.
 */
export interface GoabLinkButtonProps {
  href?: string;
  size?: "normal" | "compact";
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const CSS = `
.goab-linkbtn {
  display: inline-flex; align-items: center; gap: var(--goa-space-2xs);
  background: none; border: none; padding: 0; cursor: pointer;
  font: var(--goa-typography-body-m);
  color: var(--goa-color-interactive-default);
  text-decoration: underline; text-underline-offset: 3px;
  font-family: var(--goa-font-family-sans);
}
.goab-linkbtn:hover { color: var(--goa-color-interactive-hover); text-decoration-thickness: 2px; }
.goab-linkbtn:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: 2px; border-radius: var(--goa-border-radius-s, 4px); }
.goab-linkbtn:disabled { color: var(--goa-color-interactive-disabled); pointer-events: none; }
.goab-linkbtn--compact { font: var(--goa-typography-body-s); }
.goab-linkbtn ion-icon { font-size: var(--goa-icon-size-m); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "linkbutton");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string): string | undefined =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabLinkButton({
  href,
  size = "normal",
  leadingIcon,
  trailingIcon,
  disabled = false,
  mt,
  mr,
  mb,
  ml,
  testId,
  onClick,
  children,
  ...rest
}: GoabLinkButtonProps) {
  useStyles();
  const cls = `goab-linkbtn${size === "compact" ? " goab-linkbtn--compact" : ""}`;
  const style: React.CSSProperties = {};
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  const sx = Object.keys(style).length ? style : undefined;
  const inner = (
    <>
      {leadingIcon && <ion-icon name={leadingIcon}></ion-icon>}
      <span>{children}</span>
      {trailingIcon && <ion-icon name={trailingIcon}></ion-icon>}
    </>
  );
  if (href && !disabled) {
    return (
      <a
        className={cls}
        href={href}
        onClick={onClick}
        style={sx}
        data-testid={testId}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
      style={sx}
      data-testid={testId}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}

export default GoabLinkButton;
