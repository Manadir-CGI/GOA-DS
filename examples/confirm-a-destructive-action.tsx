import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";

/**
 * Confirm a destructive action
 * Confirm before deleting to prevent data loss
 */
export function ConfirmADestructiveActionExample() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <p className="lbl">Confirm a destructive action</p>
      <GoabButton
        type="secondary"
        variant="destructive"
        leadingIcon="trash"
        onClick={() => setOpen(true)}
      >
        Delete record
      </GoabButton>
      {msg && <p className="muted">{msg}</p>}
      <GoabModal
        open={open}
        heading="Delete this record?"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setOpen(false)}>
              Keep record
            </GoabButton>
            <GoabButton
              type="primary"
              variant="destructive"
              onClick={() => {
                setMsg("Record deleted.");
                setOpen(false);
              }}
            >
              Delete permanently
            </GoabButton>
          </React.Fragment>
        }
      >
        <p style={{ margin: 0 }}>
          This permanently removes case IS-77310 and all attached documents. This cannot be undone.
        </p>
      </GoabModal>
    </div>
  );
}

export default ConfirmADestructiveActionExample;
