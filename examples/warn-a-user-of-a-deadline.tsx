import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabButtonGroup } from "../src/components/core/GoabButtonGroup";
import { GoabModal } from "../src/components/feedback/GoabModal";

/**
 * Warn a user of a deadline
 * Use a callout modal to flag an important deadline
 */
export function WarnAUserOfADeadlineExample() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <GoabButton type="secondary" onClick={() => setOpen(true)}>
        Save for later
      </GoabButton>
      <GoabModal
        heading="Complete submission prior to 1PM"
        calloutVariant="important"
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="primary" onClick={() => setOpen(false)}>
              I understand
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>
          You&apos;ve selected to adjourn a matter that is required to appear today. This Calgary
          court location does not accept adjournment requests past 1PM MST. Please submit your
          adjournment request as soon as possible.
        </p>
      </GoabModal>
    </div>
  );
}

export default WarnAUserOfADeadlineExample;
