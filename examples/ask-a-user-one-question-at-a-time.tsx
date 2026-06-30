import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Ask a user one question at a time
 * Present one question per screen
 */
export function AskAUserOneQuestionAtATimeExample() {
  const [step, setStep] = useState(1);
  const [a1, setA1] = useState("");
  return (
    <div>
      <p className="lbl">Ask one question per screen</p>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16 }}>
        Question {Math.min(step, 2)} of 2
      </p>
      {step === 1 && (
        <GoabFormItem label="Are you currently employed?">
          <GoabRadioGroup name="emp" value={a1} onChange={setA1}>
            <GoabRadioItem value="y" text="Yes" />
            <GoabRadioItem value="n" text="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      )}
      {step === 2 && (
        <GoabFormItem label="What is your postal code?">
          <GoabInput defaultValue="" placeholder="T5J 2N3" width="160px" />
        </GoabFormItem>
      )}
      {step === 3 && (
        <p style={{ font: "var(--goa-typography-body-m)" }}>That's everything - thank you.</p>
      )}
      <div className="row" style={{ marginTop: 24 }}>
        {step > 1 && step < 3 && (
          <GoabButton
            type="tertiary"
            leadingIcon="arrow-back"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </GoabButton>
        )}
        {step < 3 && (
          <GoabButton
            type="primary"
            trailingIcon="arrow-forward"
            onClick={() => setStep((s) => s + 1)}
          >
            Continue
          </GoabButton>
        )}
        {step === 3 && (
          <GoabButton type="secondary" onClick={() => setStep(1)}>
            Start over
          </GoabButton>
        )}
      </div>
    </div>
  );
}

export default AskAUserOneQuestionAtATimeExample;
