import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Details (goa-details).
 * An inline expand/collapse disclosure: an underlined summary that
 * reveals supporting content. Lighter weight than an accordion.
 */

/**
 * Government of Alberta details — a lightweight inline expand/collapse
 * disclosure with an underlined summary.
 */
export interface GoabDetailsProps {
  /** The clickable summary label. */
  heading: React.ReactNode;
  defaultOpen?: boolean;
  /** Controlled open/expanded state. */
  open?: boolean;
  /** Maximum width (CSS length). Default "75ch". */
  maxWidth?: string;
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
.goab-details { font-family: var(--goa-font-family-sans); }
.goab-details__summary {
  display: inline-flex; align-items: center; gap: var(--goa-space-2xs);
  background: none; border: none; cursor: pointer; padding: var(--goa-space-2xs) 0;
  font: var(--goa-details-typography);
  color: var(--goa-details-color-text);
  text-decoration: var(--goa-details-text-decoration);
  text-underline-offset: 3px;
}
.goab-details__summary:hover { color: var(--goa-details-color-text-hover); }
.goab-details__summary:focus-visible { outline: var(--goa-details-focus-border); outline-offset: 2px; border-radius: var(--goa-border-radius-s); }
.goab-details__chevron { font-size: var(--goa-icon-size-s); transition: transform .2s ease; }
.goab-details--open .goab-details__chevron { transform: rotate(180deg); }
.goab-details__content {
  margin: var(--goa-space-s) 0 0 var(--goa-details-content-margin-left);
  padding-left: var(--goa-space-m);
  border-left: var(--goa-details-content-left-border);
  font: var(--goa-details-content-typography);
  color: var(--goa-color-text-default);
}
.goab-details__content p { margin: 0; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "details");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabDetails({
  heading,
  defaultOpen = false,
  open: controlledOpen,
  maxWidth = "75ch",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabDetailsProps) {
  useStyles();
  const isControlled = controlledOpen !== undefined;
  const [internal, setInternal] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internal;
  const rootStyle: React.CSSProperties = {};
  if (maxWidth != null) rootStyle.maxWidth = maxWidth;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <div
      className={`goab-details${open ? " goab-details--open" : ""}`}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <button
        className="goab-details__summary"
        aria-expanded={open}
        onClick={() => {
          if (!isControlled) setInternal((o) => !o);
        }}
      >
        <ion-icon className="goab-details__chevron" name="chevron-down"></ion-icon>
        {heading}
      </button>
      {open && <div className="goab-details__content">{children}</div>}
    </div>
  );
}

export default GoabDetails;
