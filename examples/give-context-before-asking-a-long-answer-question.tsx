import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabTextarea } from "../src/components/forms/GoabTextarea";

/**
 * Give context before asking a long answer question
 * Guide users before a long-answer field
 */
export function GiveContextBeforeAskingALongAnswerQuestionExample() {
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
        Give context before a long-answer question
      </p>
      <div style={{ maxWidth: 520 }}>
        <p style={{ font: "var(--goa-typography-body-m)", margin: "0 0 12px" }}>
          Tell us about any circumstances that affect your ability to work. Include dates and
          details where you can - this helps a caseworker assess your situation.
        </p>
        <GoabFormItem label="Your circumstances" helpText="There is no right or wrong answer.">
          <GoabTextarea rows={4} maxLength={500} placeholder="Type your answer..." />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default GiveContextBeforeAskingALongAnswerQuestionExample;
