import * as React from "react";
import { GoabContainer } from "../src/components/core/GoabContainer";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Show status on a card
 * Show a status badge in a card's actions area
 */
export function ShowStatusOnACardExample() {
  return (
    <div>
      <p className="lbl">Show a status indicator on a card</p>
      <div style={{ maxWidth: 420 }}>
        <GoabContainer type="interactive" accent="thick">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <h3 style={{ font: "var(--goa-typography-heading-s)", margin: 0 }}>
              Application CCS-48217
            </h3>
            <GoabBadge type="important" content="Action required" emphasis="subtle" icon />
          </div>
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 12px",
            }}
          >
            Child care subsidy - submitted June 22
          </p>
          <GoabButton type="tertiary" size="compact" trailingIcon="arrow-forward">
            View application
          </GoabButton>
        </GoabContainer>
      </div>
    </div>
  );
}

export default ShowStatusOnACardExample;
