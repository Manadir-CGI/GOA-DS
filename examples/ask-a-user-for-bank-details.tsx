import * as React from "react";
import { useState } from "react";
import { GoabBlock } from "../src/components/layout/GoabBlock";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Ask a user for bank details
 * Grouped fields under a section label
 */
export function AskAUserForBankDetailsExample() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  return (
    <GoabFormItem label="Bank account details" labelSize="large">
      <GoabBlock gap="m" direction="column">
        <GoabFormItem label="Name on account">
          <GoabInput onChange={setName} value={name} name="name" width="100%" />
        </GoabFormItem>
        <GoabFormItem label="Account number">
          <GoabInput onChange={setAccount} value={account} name="account" width="167px" />
        </GoabFormItem>
        <GoabFormItem label="Bank number" helpText="Must be between 6 and 8 digits long">
          <GoabInput onChange={setBank} value={bank} name="bank" width="167px" maxLength={8} />
        </GoabFormItem>
      </GoabBlock>
    </GoabFormItem>
  );
}

export default AskAUserForBankDetailsExample;
