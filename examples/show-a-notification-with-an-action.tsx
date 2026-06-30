import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabTemporaryNotification } from "../src/components/feedback/GoabTemporaryNotification";

/**
 * Show a notification with an action
 * A toast with an action button (Undo)
 */
export function ShowANotificationWithAnActionExample() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div>
      <p className="lbl">Show a notification with an action button</p>
      <GoabButton
        type="primary"
        onClick={() => {
          setOpen(true);
          setMsg("");
        }}
      >
        Delete item
      </GoabButton>
      {msg && <p className="muted">{msg}</p>}
      <GoabTemporaryNotification
        open={open}
        type="information"
        message="Item deleted"
        actionText="Undo"
        duration={6000}
        onAction={() => {
          setMsg("Delete undone.");
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default ShowANotificationWithAnActionExample;
