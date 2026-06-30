import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Dynamically add an item to a dropdown list
 * Let users add new options to a dropdown
 */
export function DynamicallyAddAnItemToADropdownListExample() {
  const [opts, setOpts] = useState(["Edmonton", "Calgary", "Red Deer"]);
  const [city, setCity] = useState("Edmonton");
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !opts.includes(v)) {
      setOpts((o) => o.concat([v]));
      setCity(v);
    }
    setDraft("");
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
        Add a new option to a dropdown dynamically
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
        <GoabFormItem label="City">
          <GoabDropdown items={opts} value={city} onChange={setCity} />
        </GoabFormItem>
        <GoabFormItem label="Add another city">
          <div
            style={{ display: "flex", flexWrap: "nowrap", gap: 12, alignItems: "center" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          >
            <GoabInput value={draft} onChange={setDraft} placeholder="Type a city" />
            <GoabButton type="secondary" size="compact" leadingIcon="add" onClick={add}>
              Add
            </GoabButton>
          </div>
        </GoabFormItem>
      </div>
    </div>
  );
}

export default DynamicallyAddAnItemToADropdownListExample;
