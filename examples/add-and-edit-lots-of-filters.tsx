import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabDrawer } from "../src/components/feedback/GoabDrawer";
import { GoabCheckbox } from "../src/components/forms/GoabCheckbox";
import { GoabFilterChip } from "../src/components/core/GoabFilterChip";
import { GoabBlock } from "../src/components/layout/GoabBlock";

/**
 * Add and edit lots of filters
 * Manage many filters in a drawer
 */
export function AddAndEditLotsOfFiltersExample() {
  const OPTS = [
    "New",
    "In review",
    "On hold",
    "Approved",
    "Child care",
    "Seniors",
    "Income support",
    "Edmonton",
    "Calgary",
  ];
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(["New", "Child care"]);
  const [draft, setDraft] = useState(sel);
  const toggle = (o: string) =>
    setDraft((d) => (d.includes(o) ? d.filter((x) => x !== o) : d.concat([o])));
  const apply = () => {
    setSel(draft);
    setOpen(false);
  };
  return (
    <div>
      <p className="lbl">Add and edit many filters in a drawer</p>
      <div className="row" style={{ marginBottom: 14 }}>
        <GoabButton
          type="secondary"
          leadingIcon="options"
          onClick={() => {
            setDraft(sel);
            setOpen(true);
          }}
        >
          Edit filters
        </GoabButton>
      </div>
      <GoabBlock gap="2xs" wrap>
        {sel.length ? (
          sel.map((s) => (
            <GoabFilterChip
              key={s}
              content={s}
              onClick={() => setSel((x) => x.filter((y) => y !== s))}
            />
          ))
        ) : (
          <span className="muted" style={{ margin: 0 }}>
            No filters applied
          </span>
        )}
      </GoabBlock>
      <GoabDrawer
        open={open}
        heading="Filters"
        position="right"
        maxSize="360px"
        onClose={() => setOpen(false)}
        actions={
          <React.Fragment>
            <GoabButton type="tertiary" onClick={() => setDraft([])}>
              Clear all
            </GoabButton>
            <GoabButton type="primary" onClick={apply}>
              Apply filters
            </GoabButton>
          </React.Fragment>
        }
      >
        <div className="stack" style={{ gap: 12 }}>
          {OPTS.map((o) => (
            <GoabCheckbox key={o} text={o} checked={draft.includes(o)} onChange={() => toggle(o)} />
          ))}
        </div>
      </GoabDrawer>
    </div>
  );
}

export default AddAndEditLotsOfFiltersExample;
