import * as React from "react";
import { GoabFormStepper, GoabFormStep } from "../../components/layout/GoabFormStepper";

/** A single step label rendered as a GoabFormStep. */
export interface StepperFieldStep {
  text?: React.ReactNode;
  sublabel?: React.ReactNode;
}

export interface StepperFieldProps {
  step?: number;
  steps?: StepperFieldStep[];
  onChange?: (step: number) => void;
}

/**
 * Form stepper wrapper — GoabFormStepper drives its GoabFormStep children
 * through props, so they mount in one tree. Pages pass a `steps` array.
 */
export function StepperField({ step, steps, onChange }: StepperFieldProps) {
  return (
    <GoabFormStepper step={step} onChange={onChange}>
      {(steps || []).map((s, i) => (
        <GoabFormStep key={i} text={s.text} sublabel={s.sublabel} />
      ))}
    </GoabFormStepper>
  );
}

export default StepperField;
