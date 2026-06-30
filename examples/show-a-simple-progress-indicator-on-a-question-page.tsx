import * as React from "react";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";

/**
 * Show a simple progress indicator on a question page
 * Help users see their progress through a form
 */
export function ShowASimpleProgressIndicatorOnAQuestionPageExample() {
  return (
    <div>
      <p className="lbl">Show a simple progress indicator on a question page</p>
      <p
        style={{
          font: "var(--goa-typography-heading-2xs)",
          color: "var(--goa-color-text-secondary)",
          margin: "0 0 16px",
        }}
      >
        Question 2 of 5
      </p>
      <h1 style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 16px" }}>
        Are you a Canadian citizen?
      </h1>
      <GoabRadioGroup name="cit" defaultValue="">
        <GoabRadioItem value="y" text="Yes" />
        <GoabRadioItem value="n" text="No, I am a permanent resident" />
      </GoabRadioGroup>
    </div>
  );
}

export default ShowASimpleProgressIndicatorOnAQuestionPageExample;
