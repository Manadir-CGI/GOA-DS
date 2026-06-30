import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabPageBlock } from "../../components/layout/GoabPageBlock";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabDetails } from "../../components/layout/GoabDetails";
import { GoabProgressIndicator } from "../../components/feedback/GoabProgressIndicator";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Start page — the front door to a government service: what it does, who
 * can use it, what you need, and a prominent Start button that kicks off the
 * application.
 */
export interface StartPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
  /** Path to the GoA wordmark used in the app header. */
  logoSrc?: string;
  /**
   * Called when the user clicks "Start application". If omitted, the page
   * shows a brief progress indicator and resets — useful for previews/demos.
   */
  onStart?: () => void;
}

const FOOTER_NAV = [
  { label: "Contact government" },
  { label: "Accessibility" },
  { label: "Using Alberta.ca" },
  { label: "Privacy" },
];

const FOOTER_META = [{ label: "Disclaimer" }, { label: "Terms of use" }, { label: "Sitemap" }];

export function StartPage({ phase = "beta", logoSrc, onStart }: StartPageProps) {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (onStart) {
      onStart();
      return;
    }
    setStarted(true);
    setTimeout(() => setStarted(false), 2600);
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
      <GoabAppHeader logoSrc={logoSrc} heading="Seniors financial assistance" />

      <main style={{ flex: 1 }}>
        <GoabPageBlock width="narrow" padding="var(--goa-space-2xl)">
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 var(--goa-space-xs)",
            }}
          >
            Seniors and aging
          </p>
          <h1
            style={{
              font: "var(--goa-typography-heading-2xl)",
              letterSpacing: "var(--goa-letter-spacing-2xl)",
              margin: "0 0 var(--goa-space-l)",
            }}
          >
            Apply for seniors financial assistance
          </h1>
          <p
            style={{
              font: "var(--goa-typography-body-l)",
              margin: "0 0 var(--goa-space-xl)",
              maxWidth: 640,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            Use this service to apply for monthly income support and benefits available to eligible
            Alberta seniors aged 65 and over.
          </p>

          <h2 style={{ font: "var(--goa-typography-heading-m)", margin: "0 0 var(--goa-space-s)" }}>
            Use this service to
          </h2>
          <ul
            style={{
              font: "var(--goa-typography-body-m)",
              lineHeight: 1.7,
              margin: "0 0 var(--goa-space-xl)",
              paddingLeft: "var(--goa-space-l)",
            }}
          >
            <li>apply for the Alberta Seniors Benefit</li>
            <li>request supplementary health coverage</li>
            <li>set up or update direct deposit</li>
          </ul>

          <GoabCallout type="information" heading="Before you start">
            <p style={{ margin: 0 }}>
              You&apos;ll need your Social Insurance Number, last year&apos;s income tax return, and
              your banking information for direct deposit. The application takes about 20 minutes
              and you can save your progress.
            </p>
          </GoabCallout>

          <div style={{ margin: "var(--goa-space-xl) 0" }}>
            <GoabDetails heading="Who is eligible">
              <p style={{ margin: "0 0 var(--goa-space-s)" }}>You may be eligible if you:</p>
              <ul style={{ margin: 0, paddingLeft: "var(--goa-space-l)", lineHeight: 1.7 }}>
                <li>are 65 years of age or older</li>
                <li>have lived in Alberta for at least 3 months</li>
                <li>are a Canadian citizen or permanent resident</li>
                <li>receive the federal Old Age Security pension</li>
              </ul>
            </GoabDetails>
          </div>

          {started && (
            <div style={{ margin: "var(--goa-space-l) 0" }}>
              <GoabProgressIndicator variant="circular" message="Starting your application…" />
            </div>
          )}
          {!started && (
            <div style={{ margin: "var(--goa-space-l) 0 0" }}>
              <GoabButton type="start" onClick={handleStart}>
                Start application
              </GoabButton>
              <p
                style={{
                  font: "var(--goa-typography-body-s)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "var(--goa-space-m) 0 0",
                }}
              >
                It takes about 20 minutes to complete.
              </p>
            </div>
          )}
        </GoabPageBlock>
      </main>

      <GoabFooter
        navLinks={FOOTER_NAV}
        metaLinks={FOOTER_META}
        copyright="© 2026 Government of Alberta"
      />
    </div>
  );
}

export default StartPage;
