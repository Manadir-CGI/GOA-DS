import * as React from "react";
import { GoabAccordion } from "../src/components/layout/GoabAccordion";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Expand or collapse part of a form
 * Use accordions to organize form sections
 */
export function ExpandOrCollapsePartOfAFormExample() {
  const items = [
    {
      heading: "Personal details",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GoabFormItem label="Full name">
            <GoabInput defaultValue="Jordan Nakamura" />
          </GoabFormItem>
          <GoabFormItem label="Email">
            <GoabInput defaultValue="jordan.n@example.ca" />
          </GoabFormItem>
        </div>
      ),
      open: true,
    },
    {
      heading: "Income",
      content: (
        <GoabFormItem label="Annual household income">
          <GoabInput defaultValue="62000" leadingIcon="cash-outline" width="200px" />
        </GoabFormItem>
      ),
    },
  ];
  return (
    <div>
      <p
        style={{
          font: "var(--goa-typography-body-xs)",
          color: "var(--goa-color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          margin: "0 0 12px",
        }}
      >
        Expand or collapse parts of a form
      </p>
      <GoabAccordion items={items} allowMultiple />
    </div>
  );
}

export default ExpandOrCollapsePartOfAFormExample;
