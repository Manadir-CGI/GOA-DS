import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabDetails } from "../src/components/layout/GoabDetails";

/**
 * Ask a user for an Indian registration number
 * Request a registration number with validation and context
 */
export function AskAUserForAnIndianRegistrationNumberExample() {
  const [v, setV] = useState("");
  const clean = v.replace(/\D/g, "");
  const err = v.length > 0 && clean.length !== 10;
  return (
    <div>
      <p className="lbl">Indian registration number with validation</p>
      <GoabFormItem
        label="Indian registration number"
        helpText="10 digits, found on your status card."
        error={err ? "Enter all 10 digits" : undefined}
      >
        <GoabInput value={v} onChange={setV} error={err} placeholder="0000 00 0000" width="240px" />
      </GoabFormItem>
      <div style={{ marginTop: 12 }}>
        <GoabDetails heading="Where do I find this number?">
          <p style={{ margin: 0 }}>
            Your registration number is printed on the front of your Secure Certificate of Indian
            Status (status card).
          </p>
        </GoabDetails>
      </div>
    </div>
  );
}

export default AskAUserForAnIndianRegistrationNumberExample;
