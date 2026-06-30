import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Group related questions together on a question page
 * Collect related fields on one page
 */
export function GroupRelatedQuestionsTogetherOnAQuestionPageExample() {
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
        Group related questions on one page
      </p>
      <h2 style={{ font: "var(--goa-typography-heading-m)", margin: "0 0 4px" }}>
        Your contact details
      </h2>
      <p
        style={{
          font: "var(--goa-typography-body-s)",
          color: "var(--goa-color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        We use these to send updates about your application.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 460 }}>
        <GoabFormItem label="Email address">
          <GoabInput type="email" defaultValue="jordan.n@example.ca" />
        </GoabFormItem>
        <GoabFormItem label="Phone number">
          <GoabInput type="tel" defaultValue="780-555-0148" />
        </GoabFormItem>
        <GoabFormItem label="Preferred contact method">
          <GoabDropdown items={["Email", "Phone", "Mail"]} defaultValue="Email" />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default GroupRelatedQuestionsTogetherOnAQuestionPageExample;
