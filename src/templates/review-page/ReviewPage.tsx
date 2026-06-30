import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabProgressIndicator } from "../../components/feedback/GoabProgressIndicator";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Review page — check-your-answers page: grouped summary of everything
 * the user entered with a Change link per row, a declaration, and a Submit
 * action that shows a submitting state.
 */
export interface ReviewPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
}

const FOOTER_META = [{ label: "Privacy" }, { label: "Accessibility" }, { label: "Contact" }];

type ReviewPhase = "review" | "submitting" | "done";

export function ReviewPage({ phase = "beta" }: ReviewPageProps) {
  const [reviewPhase, setReviewPhase] = useState<ReviewPhase>("review");

  const notSubmitted = reviewPhase === "review";
  const submitting = reviewPhase === "submitting";
  const submitted = reviewPhase === "done";
  const noop = (e: React.MouseEvent) => e && e.preventDefault();
  const onSubmit = () => {
    setReviewPhase("submitting");
    setTimeout(() => setReviewPhase("done"), 1800);
  };
  const onReset = () => setReviewPhase("review");

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
            maxWidth: 760,
            margin: "0 auto",
            padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
          }}
        >
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 var(--goa-space-xs)",
            }}
          >
            Step 4 of 4
          </p>
          <h1 style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 var(--goa-space-l)" }}>
            Check your answers
          </h1>
          <p
            style={{
              font: "var(--goa-typography-body-m)",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 var(--goa-space-2xl)",
              maxWidth: 580,
            }}
          >
            Review the information below before submitting. You can change any answer.
          </p>

          {notSubmitted && (
            <div>
              <h2
                style={{
                  font: "var(--goa-typography-heading-s)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                About you
              </h2>
              <dl
                style={{
                  margin: "0 0 var(--goa-space-2xl)",
                  borderTop: "1px solid var(--goa-color-greyscale-100)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Full name
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>
                    Jordan Nakamura
                  </dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Date of birth
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>14 March 1958</dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Email address
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>
                    jordan.n@example.ca
                  </dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
              </dl>

              <h2
                style={{
                  font: "var(--goa-typography-heading-s)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                Your application
              </h2>
              <dl
                style={{
                  margin: "0 0 var(--goa-space-2xl)",
                  borderTop: "1px solid var(--goa-color-greyscale-100)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Applying for
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>Myself</dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Household income
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>
                    $50,000 – $89,999
                  </dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderBottom: "1px solid var(--goa-color-greyscale-100)",
                    alignItems: "baseline",
                  }}
                >
                  <dt
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-text-secondary)",
                      margin: 0,
                    }}
                  >
                    Direct deposit
                  </dt>
                  <dd style={{ font: "var(--goa-typography-body-m)", margin: 0 }}>RBC ••••4821</dd>
                  <a
                    href="#"
                    onClick={noop}
                    style={{
                      font: "var(--goa-typography-body-s)",
                      color: "var(--goa-color-interactive-default)",
                      textDecoration: "none",
                      justifySelf: "end",
                    }}
                  >
                    Change
                  </a>
                </div>
              </dl>

              <GoabCallout type="important" heading="Before you submit">
                <p style={{ margin: 0 }}>
                  By submitting this application you confirm that the information provided is
                  accurate and complete to the best of your knowledge.
                </p>
              </GoabCallout>

              <div
                style={{
                  display: "flex",
                  gap: "var(--goa-space-m)",
                  marginTop: "var(--goa-space-2xl)",
                }}
              >
                <GoabButton type="primary" onClick={onSubmit}>
                  Accept and submit
                </GoabButton>
                <GoabButton type="tertiary">Back</GoabButton>
              </div>
            </div>
          )}

          {submitting && (
            <GoabProgressIndicator variant="circular" message="Submitting your application…" />
          )}

          {submitted && (
            <>
              <GoabCallout type="success" heading="Application submitted">
                <p style={{ margin: 0 }}>
                  Your reference number is <strong>IS-2026-77310</strong>. We&apos;ve emailed a copy
                  to jordan.n@example.ca.
                </p>
              </GoabCallout>
              <div style={{ marginTop: "var(--goa-space-xl)" }}>
                <GoabButton type="primary" onClick={onReset}>
                  Review again
                </GoabButton>
              </div>
            </>
          )}
        </div>
      </main>

      <GoabFooter metaLinks={FOOTER_META} copyright="© 2026 Government of Alberta" />
    </div>
  );
}

export default ReviewPage;
