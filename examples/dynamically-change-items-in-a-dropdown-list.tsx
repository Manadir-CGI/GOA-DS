import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Dynamically change items in a dropdown list
 * Cascading / dependent dropdowns
 */
export function DynamicallyChangeItemsInADropdownListExample() {
  const SUB: Record<string, string[]> = {
    Health: ["Health card", "Coverage", "Find a doctor"],
    Family: ["Child care subsidy", "Income support", "Parenting"],
    Business: ["Register a business", "Grants", "Permits"],
  };
  const [cat, setCat] = useState("Family");
  const [sub, setSub] = useState(SUB.Family[0]);
  const onCat = (v: string) => {
    setCat(v);
    setSub(SUB[v][0]);
  };
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
        Cascading dropdowns - options depend on the first choice
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
        <GoabFormItem label="Category">
          <GoabDropdown items={Object.keys(SUB)} value={cat} onChange={onCat} />
        </GoabFormItem>
        <GoabFormItem label="Topic" helpText="Updates with the category above.">
          <GoabDropdown items={SUB[cat]} value={sub} onChange={setSub} />
        </GoabFormItem>
      </div>
    </div>
  );
}

export default DynamicallyChangeItemsInADropdownListExample;
