import * as React from "react";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabButton } from "../src/components/core/GoabButton";

const data = [
  { status: { type: "information", text: "In progress" }, name: "Ivan Schmidt", id: "76954" },
  { status: { type: "success", text: "Completed" }, name: "Luz Lakin", id: "53364" },
  { status: { type: "information", text: "In progress" }, name: "Keith McGlynn", id: "41345" },
  { status: { type: "success", text: "Completed" }, name: "Melody Frami", id: "56175" },
  { status: { type: "important", text: "Updated" }, name: "Frederick Skiles", id: "70418" },
  { status: { type: "success", text: "Completed" }, name: "Dana Pfannerstill", id: "06857" },
];

/**
 * Zebra stripes in a table
 * Alternating row colours for scannability
 */
export function ZebraStripesInATableExample() {
  return (
    <GoabTable
      width="100%"
      striped
      headers={["Status", "Assigned to", { label: "Number", numeric: true }, "Actions"]}
      rows={data.map((item) => [
        <GoabBadge type={item.status.type as any} content={item.status.text} />,
        item.name,
        item.id,
        <GoabButton type="tertiary">Action</GoabButton>,
      ])}
    />
  );
}

export default ZebraStripesInATableExample;
