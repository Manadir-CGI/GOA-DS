import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabNotificationBanner } from "../../components/feedback/GoabNotificationBanner";
import { GoabSideMenu, GoabSideMenuItem } from "../../components/navigation/GoabSideMenu";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Basic page layout — a standard content page: microsite + app header, a
 * left side-menu, a width-capped content column and footer. The starting
 * point for most informational pages.
 */
export interface BasicPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
}

const SECTIONS: Record<string, string> = {
  Overview: "A summary of your account, recent activity and anything that needs your attention.",
  "Personal details": "The name, contact information and address we have on file for you.",
  Documents: "Letters, decisions and documents related to your applications.",
  Notifications: "Choose how and when the Government of Alberta contacts you.",
  Security: "Manage your password, two-step verification and connected devices.",
};

const SECTION_LABELS = Object.keys(SECTIONS);

const FOOTER_NAV = [
  { label: "Contact government" },
  { label: "Accessibility" },
  { label: "Using Alberta.ca" },
  { label: "Privacy" },
];

const FOOTER_META = [{ label: "Disclaimer" }, { label: "Terms of use" }, { label: "Sitemap" }];

export function BasicPage({ phase = "beta" }: BasicPageProps) {
  const [current, setCurrent] = useState("Overview");
  const [banner, setBanner] = useState(true);

  const showBanner = banner;
  const dismissBanner = () => setBanner(false);
  const sectionTitle = current;
  const sectionBody = SECTIONS[current];
  const navItems: GoabSideMenuItem[] = SECTION_LABELS.map((label) => ({
    label,
    current: label === current,
  }));
  const onNavigate = (item: GoabSideMenuItem) => setCurrent(item.label as string);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--goa-color-greyscale-white)",
        fontFamily: "var(--goa-font-family-sans)",
        color: "var(--goa-color-text-default)",
      }}
    >
      <GoabMicrositeHeader type={phase} feedbackHref="#" />
      <GoabAppHeader logoSrc="../../assets/goa-logo.svg" heading="My Alberta account" />

      {showBanner && (
        <GoabNotificationBanner type="information" onAction={dismissBanner}>
          Your profile is 80% complete. Add a phone number to finish setting up your account.
        </GoabNotificationBanner>
      )}

      <main
        style={{
          flex: 1,
          maxWidth: 1224,
          margin: "0 auto",
          padding: "var(--goa-space-2xl)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: "var(--goa-space-2xl)",
            alignItems: "start",
          }}
        >
          <GoabSideMenu heading="Account" items={navItems} onNavigate={onNavigate} />

          <div>
            <p
              style={{
                font: "var(--goa-typography-body-s)",
                color: "var(--goa-color-text-secondary)",
                margin: "0 0 var(--goa-space-xs)",
              }}
            >
              My account
            </p>
            <h1
              style={{ font: "var(--goa-typography-heading-xl)", margin: "0 0 var(--goa-space-l)" }}
            >
              {sectionTitle}
            </h1>
            <p
              style={{
                font: "var(--goa-typography-body-m)",
                maxWidth: 640,
                margin: "0 0 var(--goa-space-xl)",
                textWrap: "pretty" as React.CSSProperties["textWrap"],
              }}
            >
              {sectionBody}
            </p>

            <GoabContainer type="non-interactive" padding="relaxed">
              <h2
                style={{
                  font: "var(--goa-typography-heading-s)",
                  margin: "0 0 var(--goa-space-m)",
                }}
              >
                {sectionTitle}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-s)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--goa-space-s) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                  }}
                >
                  <span
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                    }}
                  >
                    Full name
                  </span>
                  <span style={{ font: "var(--goa-typography-body-m)" }}>Jordan Nakamura</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--goa-space-s) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                  }}
                >
                  <span
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                    }}
                  >
                    Email
                  </span>
                  <span style={{ font: "var(--goa-typography-body-m)" }}>jordan.n@example.ca</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--goa-space-s) 0",
                  }}
                >
                  <span
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                    }}
                  >
                    Phone
                  </span>
                  <span
                    style={{
                      font: "var(--goa-typography-body-m)",
                      color: "var(--goa-color-text-secondary)",
                    }}
                  >
                    Not provided
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "var(--goa-space-l)" }}>
                <GoabButton type="secondary" leadingIcon="create">
                  Edit details
                </GoabButton>
              </div>
            </GoabContainer>
          </div>
        </div>
      </main>

      <GoabFooter
        navLinks={FOOTER_NAV}
        metaLinks={FOOTER_META}
        copyright="© 2026 Government of Alberta"
      />
    </div>
  );
}

export default BasicPage;
