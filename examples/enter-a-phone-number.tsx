import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Enter a phone number
 * Tel input with a leading country code
 */
export function EnterAPhoneNumberExample() {
  const [phone, setPhone] = useState("");
  return (
    <form>
      <GoabFormItem label="Phone number">
        <GoabInput
          type="tel"
          name="phoneNumber"
          value={phone}
          leadingContent="+1"
          onChange={setPhone}
        />
      </GoabFormItem>
    </form>
  );
}

export default EnterAPhoneNumberExample;
