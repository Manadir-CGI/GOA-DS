import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export type GoabFormItemRequirement = "optional" | "required";
export type GoabFormItemType = "text" | "checkbox" | "radio" | "slot";

/**
 * Government of Alberta form item — wraps a control with its label, an
 * optional marker, helper text and error messaging.
 */
export interface GoabFormItemProps {
  /** Field label shown above the control. */
  label?: string;
  /** Larger label, e.g. "large" for a section-style group label. */
  labelSize?: "regular" | "large";
  /** Marks the field "(optional)" beside the label. */
  requirement?: GoabFormItemRequirement;
  /** Supporting hint shown below the control when there's no error. */
  helpText?: string;
  /** Error text; when present it replaces the help text and shows a warning icon. */
  error?: string;
  /** Sets the id attribute on the form item element. */
  id?: string;
  /** Maximum width of the form item. Default "none". */
  maxWidth?: string;
  /** Shorter label used within a form summary. */
  name?: string;
  /** Input type, for appropriate message spacing (used with checkbox/radio). */
  type?: GoabFormItemType;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Government of Alberta — Form item (goa-form-item).
 * Provides the label, optional/required marker, helper text and
 * error messaging around a form control.
 */

const CSS = `
.goab-form-item { display: flex; flex-direction: column; }
.goab-form-item__label {
  font: var(--goa-form-item-label-typography);
  color: var(--goa-color-text-default);
  padding-bottom: var(--goa-form-item-label-padding-bottom);
  display: inline-flex;
  gap: var(--goa-space-xs);
  align-items: baseline;
}
.goab-form-item__label--large { font: var(--goa-typography-heading-m); padding-bottom: var(--goa-space-s); }
.goab-form-item__optional {
  font: var(--goa-form-item-optional-label-typography);
  color: var(--goa-form-item-optional-label-color);
}
.goab-form-item__help {
  font: var(--goa-form-item-message-typography);
  color: var(--goa-form-item-help-message-color);
  margin-top: var(--goa-form-item-message-margin-top-regular);
}
.goab-form-item__error {
  display: inline-flex;
  align-items: center;
  gap: var(--goa-space-2xs);
  font: var(--goa-form-item-message-typography);
  font-weight: var(--goa-font-weight-bold);
  color: var(--goa-form-item-error-message-color);
  margin-top: var(--goa-form-item-message-margin-top-regular);
}
.goab-form-item__error ion-icon { font-size: var(--goa-icon-size-1); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "form-item");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabFormItem({
  label,
  requirement,
  helpText,
  error,
  children,
  labelSize,
  id,
  maxWidth,
  name,
  type,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabFormItemProps) {
  useStyles();
  const style: React.CSSProperties = {};
  if (maxWidth != null && maxWidth !== "none") style.maxWidth = maxWidth;
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <div
      className="goab-form-item"
      id={id}
      style={Object.keys(style).length ? style : undefined}
      data-testid={testId}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {label && (
        <label
          className={
            "goab-form-item__label" + (labelSize === "large" ? " goab-form-item__label--large" : "")
          }
        >
          {label}
          {requirement === "optional" && (
            <span className="goab-form-item__optional">(optional)</span>
          )}
        </label>
      )}
      {children}
      {error && (
        <span className="goab-form-item__error">
          <ion-icon name="warning"></ion-icon>
          {error}
        </span>
      )}
      {!error && helpText && <span className="goab-form-item__help">{helpText}</span>}
    </div>
  );
}

export default GoabFormItem;
