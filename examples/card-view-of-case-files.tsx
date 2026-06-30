import * as React from "react";
import { GoabContainer } from "../src/components/core/GoabContainer";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Card view of case files
 * A scannable card overview of case files
 */
const CASES = [
  { id: "CCS-48217", name: "Jordan Nakamura", type: "Child care", status: "New", b: "information" },
  { id: "ASB-19044", name: "Priya Sandhu", type: "Seniors", status: "In review", b: "important" },
  {
    id: "IS-77310",
    name: "Marcus Cardinal",
    type: "Income support",
    status: "On hold",
    b: "midtone",
  },
] as const;

export function CardViewOfCaseFilesExample() {
  return (
    <div>
      <p className="lbl">Card view of case files</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        {CASES.map((c) => (
          <GoabContainer key={c.id} type="interactive" accent="thin">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
            >
              <span style={{ font: "var(--goa-typography-heading-2xs)" }}>{c.id}</span>
              <GoabBadge type={c.b} content={c.status} emphasis="subtle" />
            </div>
            <p style={{ font: "var(--goa-typography-body-m)", margin: "0 0 2px" }}>{c.name}</p>
            <p
              style={{
                font: "var(--goa-typography-body-s)",
                color: "var(--goa-color-text-secondary)",
                margin: "0 0 12px",
              }}
            >
              {c.type}
            </p>
            <GoabButton type="tertiary" size="compact" trailingIcon="arrow-forward">
              Open case
            </GoabButton>
          </GoabContainer>
        ))}
      </div>
    </div>
  );
}

export default CardViewOfCaseFilesExample;
