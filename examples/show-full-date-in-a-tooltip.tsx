import * as React from "react";
import { GoabTooltip } from "../src/components/feedback/GoabTooltip";

/**
 * Show full date in a tooltip
 * Relative time with the full date on hover
 */
export function ShowFullDateInATooltipExample() {
  return (
    <div>
      <p className="lbl">Show the full date in a tooltip</p>
      <p style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>
        Last updated{" "}
        <GoabTooltip content="June 22, 2026 at 4:13 pm MT">
          <span
            style={{ borderBottom: "1px dotted var(--goa-color-text-secondary)", cursor: "help" }}
          >
            4 hours ago
          </span>
        </GoabTooltip>
      </p>
    </div>
  );
}

export default ShowFullDateInATooltipExample;
