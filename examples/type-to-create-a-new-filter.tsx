import * as React from "react";
import { useState } from "react";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabFilterChip } from "../src/components/core/GoabFilterChip";
import { GoabBlock } from "../src/components/layout/GoabBlock";

/**
 * Type to create a new filter
 * Type a value and press Enter to create a chip
 */
export function TypeToCreateANewFilterExample() {
  const [tags, setTags] = useState(["Edmonton"]);
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !tags.includes(v)) setTags((t) => t.concat([v]));
    setDraft("");
  };
  return (
    <div>
      <p className="lbl">Type to create a new filter (press Enter)</p>
      <div
        style={{ maxWidth: 340 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
      >
        <GoabInput
          leadingIcon="pricetag-outline"
          value={draft}
          onChange={setDraft}
          placeholder="Type a value and press Enter"
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <GoabBlock gap="2xs" wrap>
          {tags.map((t) => (
            <GoabFilterChip
              key={t}
              content={t}
              onClick={() => setTags((x) => x.filter((y) => y !== t))}
            />
          ))}
        </GoabBlock>
      </div>
    </div>
  );
}

export default TypeToCreateANewFilterExample;
