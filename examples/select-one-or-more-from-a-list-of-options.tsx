import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabCheckboxList } from "../src/components/forms/GoabCheckboxList";

/**
 * Select one or more from a list of options
 * Use checkboxes for multiple valid selections
 */
export function SelectOneOrMoreFromAListOfOptionsExample() {
  const [v, setV] = useState<string[]>(["Canada Pension Plan"]);
  return (
    <div>
      <p className="lbl">Select one or more options</p>
      <div style={{ maxWidth: 420 }}>
        <GoabFormItem label="Which benefits do you receive?">
          <GoabCheckboxList
            name="b"
            value={v}
            onChange={setV}
            items={[
              "Canada Pension Plan",
              "Old Age Security",
              "Guaranteed Income Supplement",
              "None of these",
            ]}
          />
        </GoabFormItem>
        <p className="muted">Selected: {v.length ? v.join(", ") : "none"}</p>
      </div>
    </div>
  );
}

export default SelectOneOrMoreFromAListOfOptionsExample;
