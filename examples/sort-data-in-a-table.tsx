import * as React from "react";
import { useState, useMemo } from "react";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Sort data in a table
 * Sort table rows by a column
 */
export function SortDataInATableExample() {
  const D = [
    { n: "Jordan Nakamura", amt: 266 },
    { n: "Priya Sandhu", amt: 1320 },
    { n: "Marcus Cardinal", amt: 845 },
    { n: "Wei Zhang", amt: 532 },
  ];
  const [asc, setAsc] = useState(true);
  const sorted = useMemo(
    () => D.slice().sort((a, b) => (asc ? a.amt - b.amt : b.amt - a.amt)),
    [asc]
  );
  return (
    <div>
      <p className="lbl">Sort table data by a column</p>
      <div style={{ marginBottom: 12 }}>
        <GoabButton
          type="tertiary"
          size="compact"
          leadingIcon={asc ? "arrow-up" : "arrow-down"}
          onClick={() => setAsc((v) => !v)}
        >
          Amount: {asc ? "low to high" : "high to low"}
        </GoabButton>
      </div>
      <GoabTable
        striped
        headers={["Applicant", { label: "Amount", numeric: true }]}
        rows={sorted.map((r) => [r.n, "$" + r.amt.toLocaleString()])}
      />
    </div>
  );
}

export default SortDataInATableExample;
