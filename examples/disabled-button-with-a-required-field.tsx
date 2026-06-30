import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Disabled button with a required field
 * Disable submit until required fields are complete
 */
export function DisabledButtonWithARequiredFieldExample() {
  const [v, setV] = useState("");
  return (
    <div>
      <p className="lbl">Disable submit until a required field is complete</p>
      <div className="stack" style={{ maxWidth: 360 }}>
        <GoabFormItem label="Email address" requirement="required">
          <GoabInput type="email" value={v} onChange={setV} placeholder="you@example.ca" />
        </GoabFormItem>
        <div>
          <GoabButton type="primary" disabled={!v.trim()}>
            Submit
          </GoabButton>
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {v.trim() ? "Ready to submit." : "Enter your email to enable Submit."}
        </p>
      </div>
    </div>
  );
}

export default DisabledButtonWithARequiredFieldExample;
