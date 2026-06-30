import * as React from "react";
import { GoabFooter } from "../src/components/navigation/GoabFooter";

/**
 * Show quick links
 * Use the footer meta section for quick links
 */
export function ShowQuickLinksExample() {
  return (
    <div style={{ margin: -28 }}>
      <div style={{ padding: "28px 28px 0" }}>
        <p className="lbl" style={{ margin: 0 }}>
          Quick links in the footer meta section
        </p>
      </div>
      <GoabFooter
        metaLinks={[
          { label: "Give feedback" },
          { label: "Accessibility" },
          { label: "Privacy" },
          { label: "Contact" },
        ]}
        copyright="© 2026 Government of Alberta"
      />
    </div>
  );
}

export default ShowQuickLinksExample;
