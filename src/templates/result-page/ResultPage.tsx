import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Result page — post-submission confirmation: a prominent success panel
 * with the reference number (copy to clipboard), what happens next, contact
 * information and follow-up actions.
 */
export interface ResultPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
}

const FOOTER_META = [{ label: "Privacy" }, { label: "Accessibility" }, { label: "Contact" }];

export function ResultPage({ phase = "beta" }: ResultPageProps) {
  const [copied, setCopied] = useState(false);

  const copyIcon = copied ? "checkmark" : "copy-outline";
  const copyLabel = copied ? "Copied" : "Copy";
  const onCopy = () => {
    try {
      if (navigator.clipboard) navigator.clipboard.writeText("IS-2026-77310");
    } catch (e) {
      // ignore
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const onPrint = () => {
    try {
      window.print();
    } catch (e) {
      // ignore
    }
  };

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
      <GoabAppHeader logoSrc="../../assets/goa-logo.svg" heading="Income support application" />

      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
          }}
        >
          {/* Success panel */}
          <div
            style={{
              background: "var(--goa-color-feedback-success-background, #eaf2e9)",
              border: "1px solid var(--goa-color-success-default, #007a3b)",
              borderRadius: "var(--goa-border-radius-m, 6px)",
              padding: "var(--goa-space-2xl)",
              textAlign: "center",
              marginBottom: "var(--goa-space-2xl)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--goa-color-success-default, #007a3b)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "var(--goa-space-m)",
              }}
            >
              <ion-icon name="checkmark" style={{ fontSize: 34, color: "#fff" }}></ion-icon>
            </div>
            <h1
              style={{
                font: "var(--goa-typography-heading-xl)",
                margin: "0 0 var(--goa-space-xs)",
              }}
            >
              Application submitted
            </h1>
            <p
              style={{
                font: "var(--goa-typography-body-m)",
                color: "var(--goa-color-text-secondary)",
                margin: "0 0 var(--goa-space-l)",
              }}
            >
              We&apos;ve received your application and emailed a copy to jordan.n@example.ca
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--goa-space-m)",
                background: "var(--goa-color-greyscale-white)",
                border: "1px solid var(--goa-color-greyscale-200)",
                borderRadius: "var(--goa-border-radius-m, 6px)",
                padding: "var(--goa-space-s) var(--goa-space-l)",
              }}
            >
              <span
                style={{
                  font: "var(--goa-typography-body-s)",
                  color: "var(--goa-color-text-secondary)",
                }}
              >
                Reference number
              </span>
              <span style={{ font: "var(--goa-typography-heading-s)" }}>IS-2026-77310</span>
              <button
                onClick={onCopy}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--goa-color-interactive-default)",
                  font: "var(--goa-typography-body-s)",
                }}
              >
                <ion-icon name={copyIcon} style={{ fontSize: 18 }}></ion-icon> {copyLabel}
              </button>
            </div>
          </div>

          <h2 style={{ font: "var(--goa-typography-heading-m)", margin: "0 0 var(--goa-space-m)" }}>
            What happens next
          </h2>
          <ol
            style={{
              position: "relative",
              listStyle: "none",
              margin: "0 0 var(--goa-space-2xl)",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "var(--goa-space-l)",
            }}
          >
            <li style={{ display: "flex", gap: "var(--goa-space-m)" }}>
              <span
                style={{
                  flex: "0 0 auto",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--goa-color-interactive-default)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "var(--goa-typography-heading-2xs)",
                }}
              >
                1
              </span>
              <div>
                <p style={{ font: "var(--goa-typography-heading-2xs)", margin: "0 0 2px" }}>
                  We review your application
                </p>
                <p
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-secondary)",
                    margin: 0,
                  }}
                >
                  A caseworker checks your details and verifies your income with the CRA — about 5
                  business days.
                </p>
              </div>
            </li>
            <li style={{ display: "flex", gap: "var(--goa-space-m)" }}>
              <span
                style={{
                  flex: "0 0 auto",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--goa-color-interactive-default)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "var(--goa-typography-heading-2xs)",
                }}
              >
                2
              </span>
              <div>
                <p style={{ font: "var(--goa-typography-heading-2xs)", margin: "0 0 2px" }}>
                  We email you a decision
                </p>
                <p
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-secondary)",
                    margin: 0,
                  }}
                >
                  You&apos;ll get a message when your application has been assessed.
                </p>
              </div>
            </li>
            <li style={{ display: "flex", gap: "var(--goa-space-m)" }}>
              <span
                style={{
                  flex: "0 0 auto",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--goa-color-interactive-default)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "var(--goa-typography-heading-2xs)",
                }}
              >
                3
              </span>
              <div>
                <p style={{ font: "var(--goa-typography-heading-2xs)", margin: "0 0 2px" }}>
                  Payments begin
                </p>
                <p
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-secondary)",
                    margin: 0,
                  }}
                >
                  If approved, your first payment is deposited the following month.
                </p>
              </div>
            </li>
          </ol>

          <GoabContainer type="non-interactive" accent="thin" heading="Need help?">
            <p style={{ margin: "0 0 var(--goa-space-xs)", font: "var(--goa-typography-body-s)" }}>
              Call the Alberta Supports Contact Centre
            </p>
            <p style={{ margin: 0, font: "var(--goa-typography-heading-s)" }}>1-877-644-9992</p>
            <p
              style={{
                margin: "var(--goa-space-xs) 0 0",
                font: "var(--goa-typography-body-xs)",
                color: "var(--goa-color-text-secondary)",
              }}
            >
              Monday to Friday, 7:30 am – 8:00 pm
            </p>
          </GoabContainer>

          <div
            style={{
              display: "flex",
              gap: "var(--goa-space-m)",
              marginTop: "var(--goa-space-2xl)",
            }}
          >
            <GoabButton type="primary">Go to my account</GoabButton>
            <GoabButton type="tertiary" leadingIcon="print" onClick={onPrint}>
              Print this page
            </GoabButton>
          </div>
        </div>
      </main>

      <GoabFooter metaLinks={FOOTER_META} copyright="© 2026 Government of Alberta" />
    </div>
  );
}

export default ResultPage;
