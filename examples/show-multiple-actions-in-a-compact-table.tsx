import * as React from "react";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabIconButton } from "../src/components/core/GoabIconButton";
import { GoabTooltip } from "../src/components/feedback/GoabTooltip";

/**
 * Show multiple actions in a compact table
 * Use icon buttons for compact row actions
 */
export function ShowMultipleActionsInACompactTableExample() {
  const act = (
    <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
      <GoabTooltip content="View">
        <GoabIconButton icon="eye-outline" size="small" ariaLabel="View" />
      </GoabTooltip>
      <GoabTooltip content="Edit">
        <GoabIconButton icon="create-outline" size="small" ariaLabel="Edit" />
      </GoabTooltip>
      <GoabTooltip content="Delete">
        <GoabIconButton
          icon="trash-outline"
          size="small"
          variant="destructive"
          ariaLabel="Delete"
        />
      </GoabTooltip>
    </div>
  );
  return (
    <div>
      <p className="lbl">Multiple actions in a compact table</p>
      <GoabTable
        headers={["Case ID", "Applicant", { label: "Actions", numeric: true }]}
        rows={[
          ["CCS-48217", "Jordan Nakamura", act],
          ["ASB-19044", "Priya Sandhu", act],
        ]}
      />
    </div>
  );
}

export default ShowMultipleActionsInACompactTableExample;
