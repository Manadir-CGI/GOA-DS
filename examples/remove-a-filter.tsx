import * as React from "react";
import { useState } from "react";
import { GoabFilterChip } from "../src/components/core/GoabFilterChip";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabBlock } from "../src/components/layout/GoabBlock";

/**
 * Remove a filter
 * Remove active filters by clicking a chip
 */
export function RemoveAFilterExample() {
  const [tags, setTags] = useState(["New", "Child care", "Edmonton"]);
  return (
    <div>
      <p className="lbl">Remove an active filter by clicking its chip</p>
      <GoabBlock gap="2xs" wrap>
        {tags.length ? (
          tags.map((t) => (
            <GoabFilterChip
              key={t}
              content={t}
              onClick={() => setTags((x) => x.filter((y) => y !== t))}
            />
          ))
        ) : (
          <span className="muted" style={{ margin: 0 }}>
            No active filters
          </span>
        )}
      </GoabBlock>
      {tags.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <GoabButton type="tertiary" size="compact" onClick={() => setTags([])}>
            Clear all filters
          </GoabButton>
        </div>
      )}
    </div>
  );
}

export default RemoveAFilterExample;
