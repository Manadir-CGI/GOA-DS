import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDatePicker } from "../src/components/forms/GoabDatePicker";

/**
 * Ask a user for a birthday
 * Collect a date of birth with the date picker
 */
export function AskAUserForABirthdayExample() {
  return (
    <div>
      <p className="lbl">Ask for a birthday with the date picker</p>
      <GoabFormItem label="Date of birth" helpText="For example, 14 03 1958">
        <GoabDatePicker placeholder="DD MM YYYY" max={new Date()} />
      </GoabFormItem>
    </div>
  );
}

export default AskAUserForABirthdayExample;
