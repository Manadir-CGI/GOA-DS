import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Show a simple progress indicator on a question page with multiple questions
 * Simple progress when grouping related questions
 */
export function ShowASimpleProgressIndicatorOnAQuestionPageWithMultipleQuestionsExample() {
  return (
    <div>
      <p className="lbl">Simple progress on a page with multiple questions</p>
      <p
        style={{
          font: "var(--goa-typography-heading-2xs)",
          color: "var(--goa-color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        Step 3 of 6
      </p>
      <h1 style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 4px" }}>
        Your contact details
      </h1>
      <p
        style={{
          font: "var(--goa-typography-body-s)",
          color: "var(--goa-color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        Three related questions on one page.
      </p>
      <div className="stack" style={{ maxWidth: 420 }}>
        <GoabFormItem label="Email">
          <GoabInput defaultValue="jordan.n@example.ca" />
        </GoabFormItem>
        <GoabFormItem label="Phone">
          <GoabInput defaultValue="780-555-0148" />
        </GoabFormItem>
        <GoabFormItem label="Best time to call">
          <GoabInput defaultValue="Mornings" />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default ShowASimpleProgressIndicatorOnAQuestionPageWithMultipleQuestionsExample;
