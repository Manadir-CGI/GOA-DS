import * as React from "react";
import { useState } from "react";
import { GoabFormStepper, GoabFormStep } from "../src/components/layout/GoabFormStepper";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Set the status of step on a form stepper
 * Indicate completion progress per step
 */
export function SetTheStatusOfStepOnAFormStepperExample() {
  const [step, setStep] = useState(3);
  const labels = ["Eligibility", "Your details", "Income", "Review"];
  return (
    <div>
      <p className="lbl">Set the status of each step (complete / current / upcoming)</p>
      <GoabFormStepper step={step}>
        {labels.map((l, i) => {
          const n = i + 1;
          const sl = n < step ? "Complete" : n === step ? "In progress" : "Not started";
          return <GoabFormStep key={n} text={l} sublabel={sl} />;
        })}
      </GoabFormStepper>
      <div className="row" style={{ marginTop: 20 }}>
        <GoabButton
          type="tertiary"
          size="compact"
          disabled={step <= 1}
          onClick={() => setStep((s) => s - 1)}
        >
          Back a step
        </GoabButton>
        <GoabButton
          type="secondary"
          size="compact"
          disabled={step >= 4}
          onClick={() => setStep((s) => s + 1)}
        >
          Complete this step
        </GoabButton>
      </div>
    </div>
  );
}

export default SetTheStatusOfStepOnAFormStepperExample;
