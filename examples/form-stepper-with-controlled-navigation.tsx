import * as React from "react";
import { useState } from "react";
import { GoabFormStepper, GoabFormStep } from "../src/components/layout/GoabFormStepper";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Form stepper with controlled navigation
 * Multi-step form with Previous / Next
 */
export function FormStepperWithControlledNavigationExample() {
  const [step, setStep] = useState(2);
  return (
    <div>
      <p
        style={{
          font: "var(--goa-typography-body-xs)",
          color: "var(--goa-color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          margin: "0 0 12px",
        }}
      >
        Form stepper with Previous / Next navigation
      </p>
      <GoabFormStepper step={step} onChange={setStep}>
        <GoabFormStep text="Eligibility" />
        <GoabFormStep text="Your details" />
        <GoabFormStep text="Income" />
        <GoabFormStep text="Review" />
      </GoabFormStepper>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 24 }}
      >
        <GoabButton
          type="tertiary"
          leadingIcon="arrow-back"
          disabled={step <= 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
        >
          Previous
        </GoabButton>
        <GoabButton
          type="primary"
          trailingIcon="arrow-forward"
          disabled={step >= 4}
          onClick={() => setStep((s) => Math.min(4, s + 1))}
        >
          Next
        </GoabButton>
      </div>
    </div>
  );
}

export default FormStepperWithControlledNavigationExample;
