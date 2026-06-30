import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Choose one option from a list
 * A basic dropdown for single selection
 */
export function ChooseOneOptionFromAListExample() {
  const [value, setValue] = useState("");
  return (
    <GoabFormItem label="Basic dropdown">
      <GoabDropdown
        name="item"
        value={value}
        placeholder="--Select--"
        onChange={setValue}
        items={[
          { value: "add", label: "Add" },
          { value: "remove", label: "Remove" },
          { value: "modify", label: "Modify" },
        ]}
      />
    </GoabFormItem>
  );
}

export default ChooseOneOptionFromAListExample;
