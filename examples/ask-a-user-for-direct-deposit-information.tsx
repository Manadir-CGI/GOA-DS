import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabCallout } from "../src/components/core/GoabCallout";

/**
 * Ask a user for direct deposit information
 * Gather banking details for direct deposit
 */
export function AskAUserForDirectDepositInformationExample() {
  return (
    <div>
      <p className="lbl">Gather banking details for direct deposit</p>
      <div className="stack" style={{ maxWidth: 460 }}>
        <div className="two" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <GoabFormItem label="Transit number" helpText="5 digits">
            <GoabInput defaultValue="" placeholder="00000" width="140px" />
          </GoabFormItem>
          <GoabFormItem label="Institution number" helpText="3 digits">
            <GoabInput defaultValue="" placeholder="000" width="120px" />
          </GoabFormItem>
        </div>
        <GoabFormItem label="Account number" helpText="7 to 12 digits">
          <GoabInput defaultValue="" placeholder="0000000" width="220px" />
        </GoabFormItem>
        <GoabCallout type="information" heading="Where to find these">
          <p style={{ margin: 0 }}>
            You can find your transit, institution and account numbers on a cheque or in your online
            banking.
          </p>
        </GoabCallout>
      </div>
    </div>
  );
}

export default AskAUserForDirectDepositInformationExample;
