import * as React from "react";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabContainer } from "../../components/core/GoabContainer";

/**
 * GoA Service Page — Government of Alberta service landing page: hero,
 * intro, info callout and a start action, built from GoA tokens and
 * components.
 */
export interface ServicePageProps {}

export function ServicePage(_props: ServicePageProps) {
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
      {/* Microsite strip */}
      <div
        style={{
          background: "var(--goa-microsite-header-color-bg)",
          borderBottom: "1px solid var(--goa-color-greyscale-150)",
          padding: "6px 48px",
          font: "var(--goa-typography-body-xs)",
          color: "var(--goa-color-text-secondary)",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span>This is an official service of the Government of Alberta.</span>
        <span style={{ flex: 1 }}></span>
        <a
          href="#"
          style={{ color: "var(--goa-color-interactive-default)", textDecoration: "none" }}
        >
          Français
        </a>
      </div>

      {/* App header */}
      <header
        style={{
          background: "var(--goa-color-greyscale-white)",
          borderBottom: "var(--goa-app-header-border-bottom)",
          padding: "12px 48px",
          display: "flex",
          alignItems: "center",
          gap: 48,
          minHeight: 64,
        }}
      >
        <img src="../../assets/goa-logo.svg" alt="Government of Alberta" style={{ height: 32 }} />
        <span
          style={{
            font: "var(--goa-typography-heading-xs)",
            color: "var(--goa-color-text-default)",
          }}
        >
          Service name
        </span>
      </header>

      {/* Hero */}
      <section
        style={{ background: "var(--goa-color-brand-dark)", color: "var(--goa-color-text-light)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 48px" }}>
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              textTransform: "uppercase",
              letterSpacing: ".08em",
              opacity: 0.85,
              margin: "0 0 12px",
            }}
          >
            Category
          </p>
          <h1
            style={{
              font: "var(--goa-typography-heading-2xl)",
              letterSpacing: "var(--goa-letter-spacing-2xl)",
              margin: 0,
              maxWidth: 760,
              color: "var(--goa-color-text-light)",
            }}
          >
            Service title goes here
          </h1>
          <p
            style={{
              font: "var(--goa-typography-body-l)",
              margin: "24px 0 32px",
              maxWidth: 620,
              opacity: 0.95,
            }}
          >
            A one or two sentence plain-language summary of what this service does and who it is
            for.
          </p>
          <GoabButton type="start">Start an application</GoabButton>
        </div>
      </section>

      {/* Content */}
      <main
        style={{
          flex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: 48,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "start" }}
        >
          <div>
            <h2 style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 16px" }}>
              Who can apply
            </h2>
            <p style={{ font: "var(--goa-typography-body-m)", margin: "0 0 24px", maxWidth: 640 }}>
              Describe eligibility in plain language. Tell people what they need and roughly how
              long it takes.
            </p>
            <GoabCallout type="information" heading="Before you begin">
              <p>List the documents or information the applicant should have ready.</p>
            </GoabCallout>
          </div>
          <aside>
            <GoabContainer type="interactive" accent="thick" heading="At a glance">
              <p
                style={{
                  margin: 0,
                  font: "var(--goa-typography-body-s)",
                  color: "var(--goa-color-text-secondary)",
                }}
              >
                Key facts: processing time, cost, and what the applicant receives.
              </p>
            </GoabContainer>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "var(--goa-footer-color-bg)",
          borderTop: "var(--goa-footer-border-top)",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <a
            href="#"
            style={{
              color: "var(--goa-color-text-default)",
              textDecoration: "none",
              font: "var(--goa-typography-body-s)",
            }}
          >
            Contact
          </a>
          <a
            href="#"
            style={{
              color: "var(--goa-color-text-default)",
              textDecoration: "none",
              font: "var(--goa-typography-body-s)",
            }}
          >
            Accessibility
          </a>
          <a
            href="#"
            style={{
              color: "var(--goa-color-text-default)",
              textDecoration: "none",
              font: "var(--goa-typography-body-s)",
            }}
          >
            Privacy
          </a>
        </div>
        <span
          style={{ font: "var(--goa-typography-body-s)", color: "var(--goa-color-text-secondary)" }}
        >
          © 2026 Government of Alberta
        </span>
      </footer>
    </div>
  );
}

export default ServicePage;
