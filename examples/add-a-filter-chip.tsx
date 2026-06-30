import * as React from "react";
import { useState } from "react";
import { GoabFilterChip } from "../src/components/core/GoabFilterChip";

/**
 * Add a filter chip
 * Apply filters with selectable chips
 */
export function AddAFilterChipExample() {
  const CATS = ["Health", "Family", "Seniors", "Business", "Housing"];
  const [a, setA] = useState(["Family"]);
  const tog = (c: string) =>
    setA((x) => (x.includes(c) ? x.filter((y) => y !== c) : x.concat([c])));
  return (
    <div>
      <p className="lbl">Click a chip to apply or remove a filter</p>
      <div className="row">
        {CATS.map((c) => (
          <GoabFilterChip key={c} content={c} selected={a.includes(c)} onClick={() => tog(c)} />
        ))}
      </div>
      <p className="muted">
        {a.length ? "Showing results for: " + a.join(", ") : "No filters applied"}
      </p>
    </div>
  );
}

export default AddAFilterChipExample;
