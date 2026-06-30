import * as React from "react";
import { useState } from "react";
import { GoabTabs, GoabTab } from "../src/components/layout/GoabTabs";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Set a specific tab to be active
 * Open a chosen tab on load with initialTab
 */
export function SetASpecificTabToBeActiveExample() {
  const [t, setT] = useState(1);
  const [k, setK] = useState(0);
  const jump = (n: number) => {
    setT(n);
    setK((x) => x + 1);
  };
  return (
    <div>
      <p className="lbl">Set a specific tab active on load (initialTab)</p>
      <div className="row" style={{ marginBottom: 14 }}>
        <GoabButton type="secondary" size="compact" onClick={() => jump(1)}>
          Open tab 1
        </GoabButton>
        <GoabButton type="secondary" size="compact" onClick={() => jump(2)}>
          Open tab 2
        </GoabButton>
        <GoabButton type="secondary" size="compact" onClick={() => jump(3)}>
          Open tab 3
        </GoabButton>
      </div>
      <GoabTabs key={k} initialTab={t}>
        <GoabTab heading="Overview">
          <p style={{ font: "var(--goa-typography-body-m)" }}>Overview content.</p>
        </GoabTab>
        <GoabTab heading="Documents">
          <p style={{ font: "var(--goa-typography-body-m)" }}>Documents content.</p>
        </GoabTab>
        <GoabTab heading="History">
          <p style={{ font: "var(--goa-typography-body-m)" }}>History content.</p>
        </GoabTab>
      </GoabTabs>
    </div>
  );
}

export default SetASpecificTabToBeActiveExample;
