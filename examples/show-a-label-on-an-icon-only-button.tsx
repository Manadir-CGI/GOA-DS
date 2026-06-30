import * as React from "react";
import { GoabTooltip } from "../src/components/feedback/GoabTooltip";
import { GoabIconButton } from "../src/components/core/GoabIconButton";

/**
 * Show a label on an icon only button
 * Reveal a label on hover with a tooltip
 */
export function ShowALabelOnAnIconOnlyButtonExample() {
  return (
    <div>
      <p className="lbl">Show a label on an icon-only button (hover)</p>
      <div className="row">
        <GoabTooltip content="Download PDF">
          <GoabIconButton icon="download-outline" ariaLabel="Download PDF" />
        </GoabTooltip>
        <GoabTooltip content="Print">
          <GoabIconButton icon="print-outline" ariaLabel="Print" />
        </GoabTooltip>
        <GoabTooltip content="Delete" position="bottom">
          <GoabIconButton icon="trash-outline" variant="destructive" ariaLabel="Delete" />
        </GoabTooltip>
      </div>
    </div>
  );
}

export default ShowALabelOnAnIconOnlyButtonExample;
