import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";

/**
 * Basic modal with close
 * A simple modal closed with the close icon
 */
export function BasicModalWithCloseExample() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <GoabButton onClick={() => setOpen(true)}>Open Basic Modal</GoabButton>
      <GoabModal heading="Modal" open={open} onClose={() => setOpen(false)}>
        <p>This modal uses an icon button to close it.</p>
      </GoabModal>
    </div>
  );
}

export default BasicModalWithCloseExample;
