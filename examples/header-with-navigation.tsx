import * as React from "react";
import { useState } from "react";
import { GoabAppHeader } from "../src/components/navigation/GoabAppHeader";
import { GoabMenuButton } from "../src/components/core/GoabMenuButton";

/**
 * Header with navigation
 * App header with nav links and an account menu
 */
export function HeaderWithNavigationExample() {
  const [cur, setCur] = useState("Overview");
  const nav = ["Overview", "Apply", "Documents", "Messages"].map((l) => ({
    label: l,
    current: l === cur,
  }));
  return (
    <div style={{ margin: -28 }}>
      <GoabAppHeader
        logoSrc="../assets/goa-logo.svg"
        heading="My services"
        navItems={nav}
        onNavigate={(it) => setCur(it.label)}
      >
        <GoabMenuButton
          text="Jordan N."
          leadingIcon="person-circle-outline"
          align="end"
          items={[
            { text: "Profile", icon: "person-outline" },
            { text: "Settings", icon: "settings-outline" },
            { text: "Sign out", icon: "log-out-outline" },
          ]}
        />
      </GoabAppHeader>
      <div style={{ padding: 28 }}>
        <p
          style={{
            font: "var(--goa-typography-body-s)",
            color: "var(--goa-color-text-secondary)",
            margin: 0,
          }}
        >
          Current section: {cur}
        </p>
      </div>
    </div>
  );
}

export default HeaderWithNavigationExample;
