import * as React from "react";
import { GoabTabs, GoabTab } from "../src/components/layout/GoabTabs";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabBadge, GoabBadgeType } from "../src/components/core/GoabBadge";

/**
 * Show different views of data in a table
 * Use tabs to show table views with counts
 */
export function ShowDifferentViewsOfDataInATableExample() {
  const D = [
    { id: "CCS-48217", n: "Jordan Nakamura", s: "New" },
    { id: "ASB-19044", n: "Priya Sandhu", s: "In review" },
    { id: "IS-77310", n: "Marcus Cardinal", s: "On hold" },
    { id: "CCS-48190", n: "Wei Zhang", s: "Approved" },
    { id: "ASB-18992", n: "Ana Bello", s: "In review" },
  ];
  const B: Record<string, GoabBadgeType> = {
    New: "information",
    "In review": "important",
    "On hold": "midtone",
    Approved: "success",
  };
  const V = (rows: typeof D) => (
    <GoabTable
      headers={["Case ID", "Applicant", "Status"]}
      rows={rows.map((r) => [
        r.id,
        r.n,
        <GoabBadge type={B[r.s]} content={r.s} emphasis="subtle" />,
      ])}
    />
  );
  const review = D.filter((r) => r.s === "In review");
  const appr = D.filter((r) => r.s === "Approved");
  return (
    <div>
      <p className="lbl">Different views of table data with counts</p>
      <GoabTabs initialTab={1}>
        <GoabTab heading={"All (" + D.length + ")"}>{V(D)}</GoabTab>
        <GoabTab heading={"Needs review (" + review.length + ")"}>{V(review)}</GoabTab>
        <GoabTab heading={"Approved (" + appr.length + ")"}>{V(appr)}</GoabTab>
      </GoabTabs>
    </div>
  );
}

export default ShowDifferentViewsOfDataInATableExample;
