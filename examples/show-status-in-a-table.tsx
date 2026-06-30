import * as React from "react";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabBadge } from "../src/components/core/GoabBadge";

/**
 * Show status in a table
 * Show item state with badges in rows
 */
export function ShowStatusInATableExample() {
  const B: Record<string, string> = {
    Pending: "information",
    Approved: "success",
    Denied: "emergency",
    "On hold": "midtone",
  };
  const rows = [
    ["CCS-48217", "Jordan Nakamura", "Pending"],
    ["ASB-19044", "Priya Sandhu", "Approved"],
    ["IS-77310", "Marcus Cardinal", "On hold"],
    ["CCS-48155", "Fatima Noor", "Denied"],
  ].map((r) => [
    r[0],
    r[1],
    <GoabBadge type={B[r[2]] as any} content={r[2]} emphasis="subtle" icon />,
  ]);
  return (
    <div>
      <p className="lbl">Show status within table rows using badges</p>
      <GoabTable headers={["Case ID", "Applicant", "Status"]} rows={rows} />
    </div>
  );
}

export default ShowStatusInATableExample;
