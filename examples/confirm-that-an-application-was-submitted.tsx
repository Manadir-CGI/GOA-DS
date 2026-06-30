import * as React from "react";
import { GoabCallout } from "../src/components/core/GoabCallout";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Confirm that an application was submitted
 * A confirmation that submission succeeded
 */
export function ConfirmThatAnApplicationWasSubmittedExample() {
  return (
    <div>
      <p className="lbl">Confirm an application was submitted</p>
      <GoabCallout type="success" heading="Application submitted">
        <p style={{ margin: 0 }}>
          Your reference number is <strong>CCS-2026-48217</strong>. We have emailed a copy to
          jordan.n@example.ca.
        </p>
      </GoabCallout>
      <div className="row" style={{ marginTop: 20 }}>
        <GoabButton type="primary">Go to my account</GoabButton>
        <GoabButton type="tertiary" leadingIcon="print">
          Print confirmation
        </GoabButton>
      </div>
    </div>
  );
}

export default ConfirmThatAnApplicationWasSubmittedExample;
