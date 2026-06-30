import * as React from "react";
import { useState } from "react";
import { GoabAccordion } from "../src/components/layout/GoabAccordion";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Hide and show many sections of information
 * Expand or collapse all sections at once
 */
export function HideAndShowManySectionsOfInformationExample() {
  const [allOpen, setAllOpen] = useState(false);
  const [nonce, setNonce] = useState(0);
  const toggle = () => {
    setAllOpen((v) => !v);
    setNonce((n) => n + 1);
  };
  const items = [
    {
      heading: "Eligibility",
      content: (
        <p style={{ margin: 0 }}>You must be an Alberta resident and meet the income threshold.</p>
      ),
      open: allOpen,
    },
    {
      heading: "Documents",
      content: <p style={{ margin: 0 }}>Notice of Assessment, photo ID, and proof of address.</p>,
      open: allOpen,
    },
    {
      heading: "After you apply",
      content: <p style={{ margin: 0 }}>We review your application within 15 business days.</p>,
      open: allOpen,
    },
  ];
  return (
    <div>
      <p className="lbl">Hide and show many sections at once</p>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <GoabButton
          type="tertiary"
          size="compact"
          leadingIcon={allOpen ? "chevron-up" : "chevron-down"}
          onClick={toggle}
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </GoabButton>
      </div>
      <GoabAccordion key={nonce} items={items} allowMultiple />
    </div>
  );
}

export default HideAndShowManySectionsOfInformationExample;
