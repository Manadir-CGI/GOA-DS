import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Accordion (goa-accordion).
 * Expandable disclosure with a chevron. Supports the documented single-item
 * API (`heading` + children, optional `secondaryText`, `headingSize`,
 * `headingType`, `iconPosition`, `open`) and a convenience `items` array for
 * rendering a stacked list of accordions.
 */

export type GoabAccordionHeadingSize = "small" | "medium" | "large";
export type GoabAccordionHeadingType = "normal" | "filled";
export type GoabAccordionIconPosition = "left" | "right";

export interface GoabAccordionItem {
  heading: React.ReactNode;
  content: React.ReactNode;
  /** Secondary text shown alongside the heading. */
  secondaryText?: React.ReactNode;
  /** Start expanded. */
  open?: boolean;
}

/**
 * Government of Alberta accordion — an expandable disclosure for grouping
 * progressive-disclosure content. Use the single-item API (`heading` +
 * children) per the GoA docs, or the `items` convenience to stack several.
 */
export interface GoabAccordionProps {
  /** Heading text (single-accordion mode). */
  heading?: React.ReactNode;
  /** Secondary text displayed alongside the heading. */
  secondaryText?: React.ReactNode;
  /** Heading size. Default "small". */
  headingSize?: GoabAccordionHeadingSize;
  /** Heading style variant. Default "normal". */
  headingType?: GoabAccordionHeadingType;
  /** Position of the expand/collapse icon. Default "left". */
  iconPosition?: GoabAccordionIconPosition;
  /** Maximum width (CSS length). Default "none". */
  maxWidth?: string;
  /** Controlled open state (single mode). */
  open?: boolean;
  /** Initial open state (single mode, uncontrolled). */
  defaultOpen?: boolean;
  /** Fired when the open state changes (single mode). */
  onChange?: (open: boolean) => void;
  /** Convenience: render a stacked list of accordions from data. */
  items?: GoabAccordionItem[];
  /** (List mode) Allow more than one panel open at once. Default false. */
  allowMultiple?: boolean;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

const CSS = `
.goab-accordion { border: var(--goa-accordion-border); border-radius: var(--goa-accordion-border-radius); overflow: hidden; background: var(--goa-accordion-color-bg-content); font-family: var(--goa-font-family-sans); }
.goab-accordion__item + .goab-accordion__item { border-top: var(--goa-accordion-divider); }
.goab-accordion__header {
  display: flex; align-items: center; gap: var(--goa-space-s);
  width: 100%; box-sizing: border-box;
  padding: var(--goa-space-m) var(--goa-space-l);
  background: var(--goa-accordion-color-bg-heading);
  border: none; cursor: pointer; text-align: left;
  font: var(--goa-accordion-heading);
  color: var(--goa-color-text-default);
  min-height: var(--goa-accordion-heading-min-height);
}
.goab-accordion__header:hover { background: var(--goa-accordion-color-bg-heading-hover); }
.goab-accordion__header:focus-visible { outline: var(--goa-accordion-border-focus); outline-offset: -3px; }
.goab-accordion__header--filled { background: var(--goa-color-greyscale-100); }
.goab-accordion__heading--medium { font: var(--goa-typography-heading-s); }
.goab-accordion__heading--large { font: var(--goa-typography-heading-m); }
.goab-accordion__secondary { color: var(--goa-color-text-secondary); font: var(--goa-typography-body-s); }
.goab-accordion__chevron { font-size: var(--goa-icon-size-m); color: var(--goa-accordion-icon-color); transition: transform .2s ease; flex: 0 0 auto; }
.goab-accordion__header--icon-left .goab-accordion__chevron { margin-right: var(--goa-space-2xs); }
.goab-accordion__header--icon-right .goab-accordion__chevron { margin-left: auto; order: 9; }
.goab-accordion__item--open .goab-accordion__chevron { transform: rotate(180deg); }
.goab-accordion__panel { padding: var(--goa-accordion-padding-content-narrow); font: var(--goa-typography-body-m); color: var(--goa-color-text-default); border-top: var(--goa-accordion-divider); }
.goab-accordion__panel p { margin: 0; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "accordion");
  el.textContent = CSS;
  document.head.appendChild(el);
}

interface HeaderProps {
  heading: React.ReactNode;
  secondaryText?: React.ReactNode;
  headingSize?: GoabAccordionHeadingSize;
  headingType?: GoabAccordionHeadingType;
  iconPosition?: GoabAccordionIconPosition;
  isOpen: boolean;
  onClick: () => void;
}

function Header({
  heading,
  secondaryText,
  headingSize,
  headingType,
  iconPosition,
  isOpen,
  onClick,
}: HeaderProps) {
  return (
    <button
      className={`goab-accordion__header goab-accordion__header--icon-${iconPosition} goab-accordion__header--${headingType}`}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <ion-icon className="goab-accordion__chevron" name="chevron-down"></ion-icon>
      <span className={`goab-accordion__heading--${headingSize}`}>{heading}</span>
      {secondaryText && <span className="goab-accordion__secondary">{secondaryText}</span>}
    </button>
  );
}

interface AccordionSingleProps {
  heading?: React.ReactNode;
  secondaryText?: React.ReactNode;
  headingSize?: GoabAccordionHeadingSize;
  headingType?: GoabAccordionHeadingType;
  iconPosition?: GoabAccordionIconPosition;
  controlledOpen?: boolean;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  rootStyle: React.CSSProperties;
  testId?: string;
  children?: React.ReactNode;
}

// Single-accordion mode — the documented GoA API.
function AccordionSingle({
  heading,
  secondaryText,
  headingSize,
  headingType,
  iconPosition,
  controlledOpen,
  defaultOpen,
  onChange,
  rootStyle,
  testId,
  children,
}: AccordionSingleProps) {
  const isControlled = controlledOpen !== undefined;
  const [internal, setInternal] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internal;
  const toggle = () => {
    if (!isControlled) setInternal((o) => !o);
    onChange && onChange(!open);
  };
  return (
    <div
      className="goab-accordion"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <div className={`goab-accordion__item${open ? " goab-accordion__item--open" : ""}`}>
        <Header
          heading={heading}
          secondaryText={secondaryText}
          headingSize={headingSize}
          headingType={headingType}
          iconPosition={iconPosition}
          isOpen={!!open}
          onClick={toggle}
        />
        {open && <div className="goab-accordion__panel">{children}</div>}
      </div>
    </div>
  );
}

interface AccordionListProps {
  items: GoabAccordionItem[];
  allowMultiple?: boolean;
  headingSize?: GoabAccordionHeadingSize;
  headingType?: GoabAccordionHeadingType;
  iconPosition?: GoabAccordionIconPosition;
  rootStyle: React.CSSProperties;
  testId?: string;
}

// List mode — convenience for stacking several accordions from data.
function AccordionList({
  items,
  allowMultiple,
  headingSize,
  headingType,
  iconPosition,
  rootStyle,
  testId,
}: AccordionListProps) {
  const [open, setOpen] = useState(
    () => new Set(items.map((it, i) => (it.open ? i : null)).filter((v) => v !== null) as number[])
  );
  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
  return (
    <div
      className="goab-accordion"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={i}
            className={`goab-accordion__item${isOpen ? " goab-accordion__item--open" : ""}`}
          >
            <Header
              heading={it.heading}
              secondaryText={it.secondaryText}
              headingSize={headingSize}
              headingType={headingType}
              iconPosition={iconPosition}
              isOpen={isOpen}
              onClick={() => toggle(i)}
            />
            {isOpen && <div className="goab-accordion__panel">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function GoabAccordion({
  items,
  heading,
  secondaryText,
  headingSize = "small",
  headingType = "normal",
  iconPosition = "left",
  maxWidth,
  open,
  defaultOpen = false,
  allowMultiple = false,
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabAccordionProps) {
  useStyles();
  const rootStyle: React.CSSProperties = {};
  if (maxWidth != null && maxWidth !== "none") rootStyle.maxWidth = maxWidth;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  if (items === undefined && (heading != null || children != null)) {
    return (
      <AccordionSingle
        heading={heading}
        secondaryText={secondaryText}
        headingSize={headingSize}
        headingType={headingType}
        iconPosition={iconPosition}
        controlledOpen={open}
        defaultOpen={defaultOpen}
        onChange={onChange}
        rootStyle={rootStyle}
        testId={testId}
      >
        {children}
      </AccordionSingle>
    );
  }
  return (
    <AccordionList
      items={items || []}
      allowMultiple={allowMultiple}
      headingSize={headingSize}
      headingType={headingType}
      iconPosition={iconPosition}
      rootStyle={rootStyle}
      testId={testId}
    />
  );
}

export default GoabAccordion;
