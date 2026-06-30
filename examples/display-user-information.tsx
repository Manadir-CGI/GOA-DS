import * as React from "react";
import { GoabContainer } from "../src/components/core/GoabContainer";

/**
 * Display user information
 * Show contact information with clear hierarchy
 */
export function DisplayUserInformationExample() {
  const Row = (p: { k: string; v: string }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid var(--goa-color-greyscale-100)",
      }}
    >
      <span
        style={{ font: "var(--goa-typography-body-s)", color: "var(--goa-color-text-secondary)" }}
      >
        {p.k}
      </span>
      <span style={{ font: "var(--goa-typography-body-m)" }}>{p.v}</span>
    </div>
  );
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
        Display user contact information
      </p>
      <div style={{ maxWidth: 420 }}>
        <GoabContainer type="non-interactive" accent="thin" heading="Contact details">
          <Row k="Name" v="Jordan Nakamura" />
          <Row k="Email" v="jordan.n@example.ca" />
          <Row k="Phone" v="780-555-0148" />
          <Row k="Address" v="114 4 St, Edmonton" />
        </GoabContainer>
      </div>
    </div>
  );
}

export default DisplayUserInformationExample;
