import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";
import { GoabCallout } from "../src/components/core/GoabCallout";

/**
 * Require user action before continuing
 * Block progress until the user confirms
 */
export function RequireUserActionBeforeContinuingExample() {
  const [open, setOpen] = useState(true);
  const [done, setDone] = useState(false);
  return (
    <div>
      <p className="lbl">Require the user to act before continuing</p>
      {!open && !done && (
        <GoabButton type="secondary" onClick={() => setOpen(true)}>
          Reopen dialog
        </GoabButton>
      )}
      {done && (
        <p className="muted" style={{ margin: 0 }}>
          You accepted the declaration and can continue.
        </p>
      )}
      <GoabModal open={open} heading="Accept the declaration to continue">
        <GoabCallout type="important" heading="Action required">
          <p style={{ margin: 0 }}>
            You must accept the declaration before you can submit your application.
          </p>
        </GoabCallout>
        <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <GoabButton type="tertiary" onClick={() => setOpen(false)}>
            Not now
          </GoabButton>
          <GoabButton
            type="primary"
            onClick={() => {
              setOpen(false);
              setDone(true);
            }}
          >
            Accept and continue
          </GoabButton>
        </div>
      </GoabModal>
    </div>
  );
}

export default RequireUserActionBeforeContinuingExample;
