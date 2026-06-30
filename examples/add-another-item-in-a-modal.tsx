import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabModal } from "../src/components/feedback/GoabModal";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";

/**
 * Add another item in a modal
 * Add a new item without navigating away
 */
export function AddAnotherItemInAModalExample() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(["Birth certificate"]);
  const [val, setVal] = useState("");
  const add = () => {
    if (val.trim()) setItems((i) => i.concat([val.trim()]));
    setVal("");
    setOpen(false);
  };
  return (
    <div>
      <p className="lbl">Add a new item without losing context</p>
      <ul
        style={{
          margin: "0 0 14px",
          paddingLeft: 18,
          font: "var(--goa-typography-body-m)",
          lineHeight: 1.7,
        }}
      >
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      <GoabButton type="secondary" leadingIcon="add" onClick={() => setOpen(true)}>
        Add a document
      </GoabButton>
      <GoabModal
        open={open}
        heading="Add a document"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" onClick={add}>
              Add
            </GoabButton>
          </React.Fragment>
        }
      >
        <GoabFormItem label="Document name">
          <GoabInput value={val} onChange={setVal} placeholder="e.g. Proof of address" />
        </GoabFormItem>
      </GoabModal>
    </div>
  );
}

export default AddAnotherItemInAModalExample;
