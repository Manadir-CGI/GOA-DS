import * as React from "react";
import { GoabFooter } from "../src/components/navigation/GoabFooter";

/**
 * Show links to navigation items
 * Use the app footer for navigation links
 */
export function ShowLinksToNavigationItemsExample() {
  return (
    <div style={{ margin: -28 }}>
      <div style={{ padding: "28px 28px 0" }}>
        <p className="lbl" style={{ margin: 0 }}>
          App footer with navigation links
        </p>
      </div>
      <GoabFooter
        navLinks={[
          { label: "Contact government" },
          { label: "Accessibility" },
          { label: "Using Alberta.ca" },
          { label: "Privacy" },
          { label: "Programs and services" },
          { label: "News" },
        ]}
        metaLinks={[{ label: "Disclaimer" }, { label: "Terms of use" }, { label: "Sitemap" }]}
        copyright="© 2026 Government of Alberta"
      />
    </div>
  );
}

export default ShowLinksToNavigationItemsExample;
