import * as React from "react";
import { useState } from "react";
import { GoabPushDrawer } from "../src/components/feedback/GoabPushDrawer";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabCheckbox } from "../src/components/forms/GoabCheckbox";
import { GoabBadge, GoabBadgeType } from "../src/components/core/GoabBadge";

/**
 * Filter a list using a push drawer
 * Keep filters beside a list with a push drawer
 */
export function FilterAListUsingAPushDrawerExample() {
  const ALL = [
    { id: "CCS-48217", s: "New" },
    { id: "ASB-19044", s: "In review" },
    { id: "IS-77310", s: "On hold" },
    { id: "CCS-48190", s: "Approved" },
  ];
  const B: Record<string, GoabBadgeType> = {
    New: "information",
    "In review": "important",
    "On hold": "midtone",
    Approved: "success",
  };
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState<Record<string, boolean>>({
    New: true,
    "In review": true,
    "On hold": true,
    Approved: true,
  });
  const vis = ALL.filter((c) => show[c.s]);
  return (
    <div>
      <p
        style={{
          font: "var(--goa-typography-body-xs)",
          color: "var(--goa-color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          margin: "0 0 12px",
        }}
      >
        Filter a list using a push drawer
      </p>
      <GoabPushDrawer
        open={open}
        heading="Filter cases"
        position="right"
        maxSize="280px"
        onClose={() => setOpen(false)}
        drawer={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.keys(show).map((k) => (
              <GoabCheckbox
                key={k}
                text={k}
                checked={show[k]}
                onChange={(c) => setShow((s) => Object.assign({}, s, { [k]: c }))}
              />
            ))}
          </div>
        }
      >
        <div style={{ paddingRight: 16 }}>
          <div style={{ marginBottom: 12 }}>
            <GoabButton
              type="tertiary"
              size="compact"
              leadingIcon="filter"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide filters" : "Show filters"}
            </GoabButton>
          </div>
          {vis.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--goa-color-greyscale-100)",
              }}
            >
              <span>{c.id}</span>
              <GoabBadge type={B[c.s]} content={c.s} emphasis="subtle" />
            </div>
          ))}
          {vis.length === 0 && (
            <p
              style={{
                font: "var(--goa-typography-body-s)",
                color: "var(--goa-color-text-secondary)",
                margin: "12px 0 0",
              }}
            >
              No cases match.
            </p>
          )}
        </div>
      </GoabPushDrawer>
    </div>
  );
}

export default FilterAListUsingAPushDrawerExample;
