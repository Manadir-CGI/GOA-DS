import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";

/**
 * Confirm a change
 * Ask the user to confirm a change before it applies
 */
export function ConfirmAChangeExample() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <p className="lbl">Confirm a change before applying it</p>
      <GoabButton type="secondary" onClick={() => setOpen(true)}>
        Change mailing address
      </GoabButton>
      {msg && <p className="muted">{msg}</p>}
      <GoabModal
        open={open}
        heading="Save changes to this application?"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton
              type="primary"
              onClick={() => {
                setMsg("Changes saved.");
                setOpen(false);
              }}
            >
              Save changes
            </GoabButton>
          </React.Fragment>
        }
      >
        <p style={{ margin: 0 }}>
          Your updated address will be applied immediately and recorded in the case history.
        </p>
      </GoabModal>
    </div>
  );
}

export default ConfirmAChangeExample;
