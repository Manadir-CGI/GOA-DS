import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Slotted error text in a form item
 * Formatted error message in a form item
 */
export function SlottedErrorTextInAFormItemExample() {
  return (
    <div>
      <p className="lbl">Formatted (slotted) error text in a form item</p>
      <div style={{ maxWidth: 380 }}>
        <GoabFormItem label="Postal code">
          <GoabInput error defaultValue="T5J" />
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-emergency-default, #c8102e)",
              margin: "6px 0 0",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <ion-icon name="warning"></ion-icon>
            <span>
              <strong>Enter a valid postal code</strong>, for example T5J 2N3
            </span>
          </p>
        </GoabFormItem>
      </div>
    </div>
  );
}

export default SlottedErrorTextInAFormItemExample;
