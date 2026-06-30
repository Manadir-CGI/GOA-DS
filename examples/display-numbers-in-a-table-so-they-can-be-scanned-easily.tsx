import * as React from "react";
import { GoabTable } from "../src/components/data/GoabTable";

/**
 * Display numbers in a table so they can be scanned easily
 * Right-align numeric columns to compare them
 */
export function DisplayNumbersInATableSoTheyCanBeScannedEasilyExample() {
  const rows = [
    ["Child care subsidy", "$266.00"],
    ["Seniors benefit", "$1,320.00"],
    ["Income support", "$845.50"],
    ["Total", "$2,431.50"],
  ];
  return (
    <div>
      <p className="lbl">Right-align numeric columns so they scan</p>
      <GoabTable headers={["Program", { label: "Monthly amount", numeric: true }]} rows={rows} />
    </div>
  );
}

export default DisplayNumbersInATableSoTheyCanBeScannedEasilyExample;
