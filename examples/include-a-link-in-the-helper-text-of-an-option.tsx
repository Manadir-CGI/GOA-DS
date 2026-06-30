import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabCheckboxList } from "../src/components/forms/GoabCheckboxList";
import { GoabLink } from "../src/components/core/GoabLink";

/**
 * Include a link in the helper text of an option
 * Add a link within an option's description
 */
export function IncludeALinkInTheHelperTextOfAnOptionExample() {
  const [v, setV] = useState<string[]>([]);
  return (
    <div>
      <p className="lbl">Include a link in an option&apos;s helper text</p>
      <div style={{ maxWidth: 480 }}>
        <GoabFormItem label="Choose any that apply">
          <GoabCheckboxList
            name="opts"
            value={v}
            onChange={setV}
            items={[
              {
                value: "gis",
                text: "Guaranteed Income Supplement",
                description: (
                  <span>
                    Top-up for low-income seniors.{" "}
                    <GoabLink href="#" onClick={(e) => e.preventDefault()}>
                      Check if you qualify
                    </GoabLink>
                  </span>
                ),
              },
              { value: "oas", text: "Old Age Security" },
              {
                value: "cpp",
                text: "Canada Pension Plan",
                description: (
                  <span>
                    See{" "}
                    <GoabLink href="#" onClick={(e) => e.preventDefault()}>
                      how payments are calculated
                    </GoabLink>
                    .
                  </span>
                ),
              },
            ]}
          />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default IncludeALinkInTheHelperTextOfAnOptionExample;
