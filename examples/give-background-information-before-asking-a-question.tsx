import * as React from "react";
import { GoabCallout } from "../src/components/core/GoabCallout";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";

/**
 * Give background information before asking a question
 * Explain context before a question
 */
export function GiveBackgroundInformationBeforeAskingAQuestionExample() {
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
        Give background before asking a question
      </p>
      <div style={{ maxWidth: 520 }}>
        <GoabCallout type="information" heading="Why we ask this">
          <p style={{ margin: 0 }}>
            Your answer helps us route your application to the right program. It does not affect
            your eligibility.
          </p>
        </GoabCallout>
        <div style={{ marginTop: 16 }}>
          <GoabFormItem label="Have you applied for this benefit before?">
            <GoabRadioGroup name="prev" defaultValue="">
              <GoabRadioItem value="y" text="Yes" />
              <GoabRadioItem value="n" text="No" />
            </GoabRadioGroup>
          </GoabFormItem>
        </div>
      </div>
    </div>
  );
}

export default GiveBackgroundInformationBeforeAskingAQuestionExample;
