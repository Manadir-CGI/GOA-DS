import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabLink } from "../src/components/core/GoabLink";

/**
 * Slotted helper text in a form item
 * Formatted helper text with a link
 */
export function SlottedHelperTextInAFormItemExample() {
  return (
    <div>
      <p className="lbl">Formatted (slotted) helper text in a form item</p>
      <div style={{ maxWidth: 420 }}>
        <GoabFormItem label="Business number">
          <GoabInput placeholder="123456789 RT0001" />
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-text-secondary)",
              margin: "6px 0 0",
            }}
          >
            9 digits plus a program account.{" "}
            <GoabLink href="#" onClick={(e) => e.preventDefault()}>
              Where do I find this?
            </GoabLink>
          </p>
        </GoabFormItem>
      </div>
    </div>
  );
}

export default SlottedHelperTextInAFormItemExample;
