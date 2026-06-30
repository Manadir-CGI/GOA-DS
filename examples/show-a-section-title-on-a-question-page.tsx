import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Show a section title on a question page
 * Tell users which part of the form they're in
 */
export function ShowASectionTitleOnAQuestionPageExample() {
  return (
    <div>
      <p className="lbl">Show a section title on a question page</p>
      <p
        style={{
          font: "var(--goa-typography-body-s)",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          color: "var(--goa-color-text-secondary)",
          margin: "0 0 4px",
        }}
      >
        Section 2 of 4: Your income
      </p>
      <h1 style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 16px" }}>
        What is your annual household income?
      </h1>
      <GoabFormItem
        label="Income before tax"
        helpText="From your most recent Notice of Assessment."
      >
        <GoabInput type="number" leadingIcon="cash-outline" defaultValue="62000" width="220px" />
      </GoabFormItem>
    </div>
  );
}

export default ShowASectionTitleOnAQuestionPageExample;
