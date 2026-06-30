import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";

/**
 * Confirm before navigating away
 * Warn about unsaved changes before leaving
 */
export function ConfirmBeforeNavigatingAwayExample() {
  const [val, setVal] = useState("Draft answer...");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <p className="lbl">Confirm before navigating away with unsaved changes</p>
      <GoabFormItem label="Your notes (unsaved)">
        <GoabInput value={val} onChange={setVal} />
      </GoabFormItem>
      <div className="row" style={{ marginTop: 16 }}>
        <GoabButton type="tertiary" leadingIcon="arrow-back" onClick={() => setOpen(true)}>
          Leave this page
        </GoabButton>
      </div>
      {msg && <p className="muted">{msg}</p>}
      <GoabModal
        open={open}
        heading="Leave without saving?"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setOpen(false)}>
              Stay on page
            </GoabButton>
            <GoabButton
              type="primary"
              variant="destructive"
              onClick={() => {
                setMsg("Left the page - changes discarded.");
                setOpen(false);
              }}
            >
              Leave and discard
            </GoabButton>
          </React.Fragment>
        }
      >
        <p style={{ margin: 0 }}>
          You have unsaved changes. If you leave now, your notes will be lost.
        </p>
      </GoabModal>
    </div>
  );
}

export default ConfirmBeforeNavigatingAwayExample;
