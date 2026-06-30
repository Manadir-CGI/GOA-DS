import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabCheckboxList } from "../src/components/forms/GoabCheckboxList";

/**
 * Include descriptions for items in a checkbox list
 * Add descriptive text to each option
 */
export function IncludeDescriptionsForItemsInACheckboxListExample() {
  const [v, setV] = useState<string[]>(["email"]);
  return (
    <div>
      <p className="lbl">Include descriptions for checkbox options</p>
      <div style={{ maxWidth: 480 }}>
        <GoabFormItem label="How would you like to be notified?">
          <GoabCheckboxList
            name="notify"
            value={v}
            onChange={setV}
            items={[
              {
                value: "email",
                text: "Email",
                description: "Updates about your application status",
              },
              {
                value: "sms",
                text: "Text message",
                description: "Standard message rates may apply",
              },
              { value: "mail", text: "Mail", description: "Adds 5 to 7 business days" },
            ]}
          />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default IncludeDescriptionsForItemsInACheckboxListExample;
