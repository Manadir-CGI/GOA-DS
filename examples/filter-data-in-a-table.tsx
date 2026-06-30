import * as React from "react";
import { useState } from "react";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabFilterChip } from "../src/components/core/GoabFilterChip";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabBadge, GoabBadgeType } from "../src/components/core/GoabBadge";

/**
 * Filter data in a table
 * Filter table rows with search and chips
 */
export function FilterDataInATableExample() {
  const ALL = [
    { id: "CCS-48217", name: "Jordan Nakamura", s: "New" },
    { id: "ASB-19044", name: "Priya Sandhu", s: "In review" },
    { id: "IS-77310", name: "Marcus Cardinal", s: "On hold" },
    { id: "CCS-48190", name: "Wei Zhang", s: "Approved" },
  ];
  const B: Record<string, GoabBadgeType> = {
    New: "information",
    "In review": "important",
    "On hold": "midtone",
    Approved: "success",
  };
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const rows = ALL.filter(
    (r) =>
      (f === "All" || r.s === f) &&
      (r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.id.toLowerCase().includes(q.toLowerCase()))
  );
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
        Filter table data with search and filter chips
      </p>
      <div style={{ maxWidth: 320, marginBottom: 12 }}>
        <GoabInput
          leadingIcon="search"
          value={q}
          onChange={setQ}
          placeholder="Search by name or ID"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        {["All", "New", "In review", "Approved"].map((c) => (
          <GoabFilterChip key={c} content={c} selected={f === c} onClick={() => setF(c)} />
        ))}
      </div>
      <GoabTable
        headers={["Case ID", "Applicant", "Status"]}
        rows={rows.map((r) => [
          r.id,
          r.name,
          <GoabBadge type={B[r.s]} content={r.s} emphasis="subtle" />,
        ])}
      />
      {rows.length === 0 && (
        <p
          style={{
            font: "var(--goa-typography-body-s)",
            color: "var(--goa-color-text-secondary)",
            margin: "12px 0 0",
          }}
        >
          No matching cases.
        </p>
      )}
    </div>
  );
}

export default FilterDataInATableExample;
