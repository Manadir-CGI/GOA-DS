import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabDrawer } from "../src/components/feedback/GoabDrawer";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabDropdown } from "../src/components/forms/GoabDropdown";

/**
 * Add a record using a drawer
 * Enter data in a side drawer without leaving the page
 */
export function AddARecordUsingADrawerExample() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([{ name: "Ana Bello", rel: "Spouse" }]);
  const [name, setName] = useState("");
  const save = () => {
    if (name.trim()) setRows((r) => r.concat([{ name: name.trim(), rel: "Dependent" }]));
    setName("");
    setOpen(false);
  };
  return (
    <div>
      <p className="lbl">Add a record without leaving the page</p>
      <div className="stack" style={{ maxWidth: 380 }}>
        {rows.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid var(--goa-color-greyscale-100)",
            }}
          >
            <span>{p.name}</span>
            <span style={{ color: "var(--goa-color-text-secondary)" }}>{p.rel}</span>
          </div>
        ))}
        <div>
          <GoabButton type="secondary" leadingIcon="add" onClick={() => setOpen(true)}>
            Add a person
          </GoabButton>
        </div>
      </div>
      <GoabDrawer
        open={open}
        heading="Add a person"
        position="right"
        maxSize="380px"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" onClick={save}>
              Add person
            </GoabButton>
          </React.Fragment>
        }
      >
        <div className="stack">
          <GoabFormItem label="Full name">
            <GoabInput value={name} onChange={setName} placeholder="First and last name" />
          </GoabFormItem>
          <GoabFormItem label="Relationship">
            <GoabDropdown items={["Dependent", "Spouse", "Guardian"]} defaultValue="Dependent" />
          </GoabFormItem>
        </div>
      </GoabDrawer>
    </div>
  );
}

export default AddARecordUsingADrawerExample;
