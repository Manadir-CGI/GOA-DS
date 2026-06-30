import React, { useState, useRef, useEffect } from "react";

/**
 * Government of Alberta — Popover (goa-popover).
 * A small overlay anchored to a trigger element, opened on click. Used to
 * build menus, filter panels and contextual help. Closes on outside click
 * or Escape.
 */

/**
 * Government of Alberta popover — a small overlay anchored to a trigger,
 * opened on click. The building block for menus, filter panels and
 * contextual help. Closes on outside click or Escape.
 */
export interface GoabPopoverRenderProps {
  close: () => void;
}
export interface GoabPopoverProps {
  /** The trigger element the panel anchors to. */
  target: React.ReactNode;
  position?: "below" | "above";
  align?: "start" | "end";
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: string;
  /** Maximum width of the popover container. Defaults to "320px". */
  maxWidth?: string;
  /** Minimum width of the popover container. */
  minWidth?: string;
  /** Whether the popover has padding. Set false for content flush with the borders. Default true. */
  padded?: boolean;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Panel content, or a render fn receiving { close }. */
  children?: React.ReactNode | ((p: GoabPopoverRenderProps) => React.ReactNode);
  [key: string]: unknown;
}

const CSS = `
.goab-popover { position: relative; display: inline-block; }
.goab-popover__panel {
  position: absolute; z-index: 70; min-width: 200px;
  background: var(--goa-popover-color-bg);
  border: var(--goa-popover-border);
  border-radius: var(--goa-popover-border-radius);
  box-shadow: var(--goa-popover-box-shadow);
  padding: var(--goa-popover-padding);
  font-family: var(--goa-font-family-sans);
  color: var(--goa-color-text-default);
}
.goab-popover__panel--below { top: calc(100% + var(--goa-space-2xs)); }
.goab-popover__panel--above { bottom: calc(100% + var(--goa-space-2xs)); }
.goab-popover__panel--start { left: 0; }
.goab-popover__panel--end { right: 0; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "popover");
  el.textContent = CSS;
  document.head.appendChild(el);
}

const space = (v?: string): string | undefined =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabPopover({
  target,
  position = "below",
  align = "start",
  open: controlled,
  onOpenChange,
  width,
  maxWidth = "320px",
  minWidth,
  padded = true,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabPopoverProps) {
  useStyles();
  const ref = useRef<HTMLSpanElement>(null);
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = useState(false);
  const open = isControlled ? controlled : internal;

  function setOpen(v: boolean) {
    if (!isControlled) setInternal(v);
    onOpenChange && onOpenChange(v);
  }

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  });

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <span
      className="goab-popover"
      ref={ref}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <span onClick={() => setOpen(!open)}>{target}</span>
      {open && (
        <div
          className={`goab-popover__panel goab-popover__panel--${position} goab-popover__panel--${align}`}
          role="dialog"
          style={{ width, maxWidth, minWidth, ...(padded ? null : { padding: 0 }) }}
        >
          {typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
        </div>
      )}
    </span>
  );
}

export default GoabPopover;
