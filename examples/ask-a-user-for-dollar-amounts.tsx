import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Ask a user for dollar amounts
 * Enter monetary values consistently
 */
export function AskAUserForDollarAmountsExample() {
  return (
    <div>
      <p className="lbl">Enter monetary values consistently</p>
      <div className="stack" style={{ maxWidth: 320 }}>
        <GoabFormItem label="Monthly income" helpText="Enter a dollar amount, before tax.">
          <GoabInput type="number" leadingIcon="cash-outline" defaultValue="1420" width="200px" />
        </GoabFormItem>
        <GoabFormItem label="Monthly rent">
          <GoabInput type="number" leadingIcon="cash-outline" defaultValue="1150" width="200px" />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default AskAUserForDollarAmountsExample;
