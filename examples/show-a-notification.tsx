import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabTemporaryNotification } from "../src/components/feedback/GoabTemporaryNotification";

/**
 * Show a notification
 * Confirm an action with a temporary toast
 */
export function ShowANotificationExample() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="lbl">Show a temporary notification (toast)</p>
      <GoabButton type="primary" onClick={() => setOpen(true)}>
        Save
      </GoabButton>
      <GoabTemporaryNotification
        open={open}
        type="success"
        message="Your changes have been saved"
        duration={4000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default ShowANotificationExample;
