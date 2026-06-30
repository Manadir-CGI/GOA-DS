import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabDetails } from "../src/components/layout/GoabDetails";

/**
 * Show more information to help answer a question
 * Use Details to explain why a question is asked
 */
export function ShowMoreInformationToHelpAnswerAQuestionExample() {
  return (
    <div>
      <p className="lbl">Show more information to help answer a question</p>
      <div style={{ maxWidth: 440 }}>
        <GoabFormItem label="Social Insurance Number" helpText="9 digits, no spaces.">
          <GoabInput placeholder="000 000 000" width="220px" />
        </GoabFormItem>
        <div style={{ marginTop: 12 }}>
          <GoabDetails heading="Why do we ask for this?">
            <p style={{ margin: 0 }}>
              We use your SIN to verify your income with the CRA. It is never shared with third
              parties.
            </p>
          </GoabDetails>
        </div>
      </div>
    </div>
  );
}

export default ShowMoreInformationToHelpAnswerAQuestionExample;
