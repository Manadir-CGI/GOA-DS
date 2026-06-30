import React, { Children, useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Form stepper (goa-form-stepper / goa-form-step).
 * A horizontal progress header for multi-step service flows. Compose with
 * GoabFormStep children; the current step is driven by `step` (1-based).
 * Steps before the current one are marked complete with a checkmark.
 */

/**
 * Government of Alberta form stepper — a horizontal progress header for
 * multi-step service flows (eligibility → details → review → confirmation).
 * Compose with GoabFormStep children; the current step is driven by `step`.
 */
export interface GoabFormStepperProps {
  /** 1-based index of the current step. Earlier steps render complete. */
  step?: number;
  /** Fires with the 1-based step number when a step is clicked. */
  onChange?: (step: number) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
}

export interface GoabFormStepProps {
  /** Step label, e.g. "Your details". */
  text?: React.ReactNode;
  /** Optional secondary line below the label. */
  sublabel?: React.ReactNode;
}

const CSS = `
.goab-stepper { font-family: var(--goa-font-family-sans); display: flex; width: 100%; }
.goab-stepper__step {
  flex: 1 1 0; position: relative;
  display: flex; flex-direction: column; align-items: center; gap: var(--goa-space-xs);
  padding: var(--goa-space-s) var(--goa-space-2xs) 0;
  background: none; border: none; cursor: pointer; text-align: center;
}
.goab-stepper__step:disabled { cursor: default; }
.goab-stepper__step::before, .goab-stepper__step::after {
  content: ""; position: absolute; top: calc(var(--goa-space-s) + var(--goa-step-size) / 2);
  height: var(--goa-stepper-line-thickness); background: var(--goa-stepper-color-line); z-index: 0;
}
.goab-stepper__step::before { left: 0; right: 50%; }
.goab-stepper__step::after { left: 50%; right: 0; }
.goab-stepper__step:first-child::before, .goab-stepper__step:last-child::after { display: none; }
.goab-stepper__step--done::before, .goab-stepper__step--done::after,
.goab-stepper__step--current::before { background: var(--goa-stepper-color-line-active); }
.goab-stepper__circle {
  position: relative; z-index: 1;
  width: var(--goa-step-size); height: var(--goa-step-size); border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--goa-step-color-bg); color: var(--goa-step-color-step-number);
  box-shadow: inset 0 0 0 var(--goa-border-width-s) var(--goa-step-color-border);
  font: var(--goa-step-typography-step-number);
}
.goab-stepper__step--current .goab-stepper__circle {
  box-shadow: inset 0 0 0 var(--goa-border-width-xl) var(--goa-step-color-border-active);
  color: var(--goa-color-interactive-default);
}
.goab-stepper__step--done .goab-stepper__circle {
  background: var(--goa-step-color-bg-complete); color: var(--goa-color-greyscale-white);
  box-shadow: none;
}
.goab-stepper__step--done .goab-stepper__circle ion-icon { font-size: 20px; }
.goab-stepper__label { font: var(--goa-step-typography-label); color: var(--goa-step-color-label); }
.goab-stepper__step--current .goab-stepper__label { font: var(--goa-step-typography-label-active); }
.goab-stepper__sublabel { font: var(--goa-step-typography-sublabel); color: var(--goa-step-color-sublabel); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "stepper");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabFormStep({ text, sublabel }: GoabFormStepProps) {
  return (
    <>
      {text}
      {sublabel}
    </>
  );
}

export function GoabFormStepper({
  step = 1,
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabFormStepperProps) {
  useStyles();
  const steps = Children.toArray(children).filter(Boolean);
  const [internal, setInternal] = useState(step);
  const isControlled = step !== undefined && onChange !== undefined;
  const current = isControlled ? step : internal;

  function go(n: number) {
    if (!isControlled) setInternal(n);
    onChange && onChange(n);
  }

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className="goab-stepper"
      role="list"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      {steps.map((s, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "current" : "todo";
        const { text, sublabel } = (s as React.ReactElement<GoabFormStepProps>).props;
        return (
          <button
            key={n}
            type="button"
            role="listitem"
            className={`goab-stepper__step goab-stepper__step--${state}`}
            aria-current={state === "current" ? "step" : undefined}
            onClick={() => go(n)}
          >
            <span className="goab-stepper__circle">
              {state === "done" ? <ion-icon name="checkmark-sharp"></ion-icon> : n}
            </span>
            <span className="goab-stepper__label">{text}</span>
            {sublabel && <span className="goab-stepper__sublabel">{sublabel}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default GoabFormStepper;
