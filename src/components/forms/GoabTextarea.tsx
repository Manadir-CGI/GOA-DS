import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

export type GoabTextAreaSize = "default" | "compact";
export type GoabTextAreaCountBy = "character" | "word";

/**
 * Government of Alberta textarea — a multi-line text field with optional
 * character counter. Wrap in a GoabFormItem for label/help/error.
 */
export interface GoabTextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  /** Shows a live character counter when set. */
  maxLength?: number;
  /** Maximum number of characters or words allowed (with `countBy`). */
  maxCount?: number;
  /** Whether the counter counts characters or words. */
  countBy?: GoabTextAreaCountBy;
  error?: boolean;
  /** Sets the input to a disabled state. */
  disabled?: boolean;
  /** Sets the input to a read-only state. */
  readOnly?: boolean;
  /** Visual size variant of the text area. */
  size?: GoabTextAreaSize;
  /** Sets the id attribute on the textarea element. */
  id?: string;
  /** aria-label for the screen reader. */
  ariaLabel?: string;
  /** autocomplete attribute for the textarea. */
  autoComplete?: string;
  /** Width of the text area. Default "100%". */
  width?: string;
  /** Maximum width of the text area. Default "60ch". */
  maxWidth?: string;
  name?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Margin tokens applied to the top / right / bottom / left of the component. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  [key: string]: unknown;
}

/**
 * Government of Alberta — Textarea (goa-textarea).
 * Multi-line text input matching the GoA field styling, with an
 * optional character counter.
 */

const CSS = `
.goab-textarea {
  display: block; width: 100%; box-sizing: border-box;
  min-height: 96px; resize: vertical;
  padding: var(--goa-text-area-padding, var(--goa-space-m));
  background: var(--goa-text-area-color-bg);
  border: none; border-radius: var(--goa-text-area-border-radius);
  box-shadow: var(--goa-text-area-border);
  font: var(--goa-text-area-typography);
  color: var(--goa-color-text-default);
  transition: box-shadow .05s ease-in;
}
.goab-textarea:hover { box-shadow: var(--goa-text-area-border-hover); }
.goab-textarea:focus { outline: none; box-shadow: var(--goa-text-area-border-focus); }
.goab-textarea--error { box-shadow: var(--goa-text-area-border-error); background: var(--goa-input-color-background-error); }
.goab-textarea--compact { min-height: 64px; }
.goab-textarea:disabled { background: var(--goa-text-input-color-bg-disabled); color: var(--goa-text-input-color-text-disabled); pointer-events: none; }
.goab-textarea::placeholder { color: var(--goa-text-area-color-text-placeholder); }
.goab-textarea-counter { display: block; text-align: right; margin-top: var(--goa-space-2xs); font: var(--goa-text-area-typography-counter); color: var(--goa-text-area-color-text-counter); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "textarea");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabTextarea({
  value,
  defaultValue,
  placeholder,
  rows = 4,
  maxLength,
  maxCount,
  countBy = "character",
  error = false,
  disabled = false,
  readOnly = false,
  size,
  id,
  ariaLabel,
  autoComplete,
  width = "100%",
  maxWidth = "60ch",
  onChange,
  name,
  mt,
  mr,
  mb,
  ml,
  testId,
  ...rest
}: GoabTextareaProps) {
  useStyles();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const limit = maxCount ?? maxLength;
  const text = current || "";
  const count =
    countBy === "word" ? (text.trim() ? text.trim().split(/\s+/).length : 0) : text.length;
  const style: React.CSSProperties = { width, maxWidth };
  if (mt != null) style.marginTop = space(mt);
  if (mr != null) style.marginRight = space(mr);
  if (mb != null) style.marginBottom = space(mb);
  if (ml != null) style.marginLeft = space(ml);
  return (
    <div style={Object.keys(style).length ? style : undefined} data-testid={testId}>
      <textarea
        className={`goab-textarea${error ? " goab-textarea--error" : ""}${size === "compact" ? " goab-textarea--compact" : ""}`}
        name={name}
        id={id}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-label={ariaLabel}
        autoComplete={autoComplete}
        maxLength={maxCount == null ? maxLength : undefined}
        placeholder={placeholder}
        value={current}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.value);
          onChange && onChange(e.target.value, e);
        }}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {limit != null && (
        <span className="goab-textarea-counter">
          {count}/{limit}
          {countBy === "word" ? " words" : ""}
        </span>
      )}
    </div>
  );
}

export default GoabTextarea;
