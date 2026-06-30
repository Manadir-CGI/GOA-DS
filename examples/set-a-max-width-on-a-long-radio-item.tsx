import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";

/**
 * Set a max width on a long radio item
 * Constrain a long radio label's line wrapping
 */
export function SetAMaxWidthOnALongRadioItemExample() {
  return (
    <div>
      <p className="lbl">Set a max width on a long radio item</p>
      <div style={{ maxWidth: 300 }}>
        <GoabFormItem label="Consent">
          <GoabRadioGroup name="consent" defaultValue="a">
            <GoabRadioItem
              value="a"
              text="I consent to the Canada Revenue Agency verifying my reported income for this application"
            />
            <GoabRadioItem value="b" text="I will provide proof of income myself" />
          </GoabRadioGroup>
        </GoabFormItem>
      </div>
    </div>
  );
}

export default SetAMaxWidthOnALongRadioItemExample;
