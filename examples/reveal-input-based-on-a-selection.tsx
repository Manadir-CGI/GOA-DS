import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Reveal input based on a selection
 * Progressively reveal fields as the user chooses
 */
export function RevealInputBasedOnASelectionExample() {
  const [c, setC] = useState("email");
  return (
    <div>
      <p className="lbl">Reveal a field based on a selection</p>
      <div style={{ maxWidth: 380 }}>
        <GoabFormItem label="How should we contact you?">
          <GoabRadioGroup name="contact" value={c} onChange={setC}>
            <GoabRadioItem value="email" text="Email" />
            <GoabRadioItem value="phone" text="Phone" />
            <GoabRadioItem value="mail" text="Mail" />
          </GoabRadioGroup>
        </GoabFormItem>
        {c === "phone" && (
          <div className="reveal">
            <GoabFormItem label="Phone number" helpText="Include area code.">
              <GoabInput type="tel" leadingIcon="call" placeholder="780-555-0123" />
            </GoabFormItem>
          </div>
        )}
        {c === "mail" && (
          <div className="reveal">
            <GoabFormItem label="Mailing address">
              <GoabInput placeholder="Street address" />
            </GoabFormItem>
          </div>
        )}
      </div>
    </div>
  );
}

export default RevealInputBasedOnASelectionExample;
