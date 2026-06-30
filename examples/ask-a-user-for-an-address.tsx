import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Ask a user for an address
 * Collect a complete mailing address
 */
export function AskAUserForAnAddressExample() {
  return (
    <div>
      <p className="lbl">Collect a complete mailing address</p>
      <div className="stack" style={{ maxWidth: 460 }}>
        <GoabFormItem label="Street address">
          <GoabInput defaultValue="114 4 Street NW" />
        </GoabFormItem>
        <GoabFormItem label="Unit or suite" requirement="optional">
          <GoabInput defaultValue="" placeholder="Apt, suite, unit" />
        </GoabFormItem>
        <div className="two">
          <GoabFormItem label="City">
            <GoabInput defaultValue="Edmonton" />
          </GoabFormItem>
          <GoabFormItem label="Postal code">
            <GoabInput defaultValue="T5J 2N3" />
          </GoabFormItem>
        </div>
        <GoabFormItem label="Province or territory">
          <GoabDropdown
            items={["Alberta", "British Columbia", "Saskatchewan", "Manitoba", "Ontario"]}
            defaultValue="Alberta"
          />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default AskAUserForAnAddressExample;
