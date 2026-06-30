import * as React from "react";
import { useState } from "react";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Search
 * A search input with an icon and button
 */
export function SearchExample() {
  const [q, setQ] = useState("");
  const [submitted, setSubmitted] = useState("");
  return (
    <div>
      <p className="lbl">Search input with an icon and button</p>
      <div
        className="row"
        style={{ flexWrap: "nowrap", maxWidth: 460 }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setSubmitted(q);
          }
        }}
      >
        <GoabInput leadingIcon="search" value={q} onChange={setQ} placeholder="Search services" />
        <GoabButton type="primary" onClick={() => setSubmitted(q)}>
          Search
        </GoabButton>
      </div>
      {submitted && <p className="muted">Searching for: {submitted}</p>}
    </div>
  );
}

export default SearchExample;
