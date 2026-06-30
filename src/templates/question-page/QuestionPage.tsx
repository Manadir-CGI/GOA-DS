import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabProgressIndicator } from "../../components/feedback/GoabProgressIndicator";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabIcon } from "../../components/core/GoabIcon";
import { GoabFooter } from "../../components/navigation/GoabFooter";
import { RadioField } from "./RadioField";

/**
 * GoA Question page — one-question-at-a-time service flow with a simple
 * progress indicator, back link and a single question per screen to reduce
 * cognitive load.
 */
export interface QuestionPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
  /** Path to the GoA wordmark used in the app header. */
  logoSrc?: string;
}

const Q1_OPTIONS = [
  { value: "self", text: "Myself" },
  {
    value: "other",
    text: "Someone else",
    description: "You're applying on behalf of another person",
  },
];

const Q2_OPTIONS = [
  { value: "rent", text: "I rent my home" },
  { value: "own", text: "I own my home" },
  {
    value: "other",
    text: "Other living arrangement",
    description: "Living with family, supported housing, etc.",
  },
];

const Q3_OPTIONS = [
  { value: "yes", text: "Yes" },
  { value: "no", text: "No" },
];

const FOOTER_META = [{ label: "Privacy" }, { label: "Accessibility" }, { label: "Contact" }];

export function QuestionPage({ phase = "beta", logoSrc }: QuestionPageProps) {
  const [step, setStep] = useState(1);
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");

  const stepLabel = Math.min(step, 3);
  const progress = Math.round(((Math.min(step, 4) - 1) / 3) * 100);
  const isQ1 = step === 1;
  const isQ2 = step === 2;
  const isQ3 = step === 3;
  const isDone = step === 4;
  const notDone = step < 4;

  const onContinue = () => setStep((s) => Math.min(s + 1, 4));
  const onBack = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    setStep((s) => Math.max(s - 1, 1));
  };
  const onRestart = () => {
    setStep(1);
    setA1("");
    setA2("");
    setA3("");
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
      <GoabAppHeader logoSrc={logoSrc} heading="Income support application" />

      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
          }}
        >
          <a
            href="#"
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--goa-color-interactive-default)",
              textDecoration: "none",
              font: "var(--goa-typography-body-s)",
              marginBottom: "var(--goa-space-l)",
            }}
          >
            <GoabIcon type="arrow-back" size="16px" /> Back
          </a>

          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 var(--goa-space-xs)",
            }}
          >
            Question {stepLabel} of 3
          </p>
          <div style={{ margin: "0 0 var(--goa-space-2xl)" }}>
            <GoabProgressIndicator
              variant="linear"
              progress={progress}
              showPercentage={true}
              ariaLabel="Application progress"
            />
          </div>

          {isQ1 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                Who are you applying for?
              </h1>
              <p
                style={{
                  font: "var(--goa-typography-body-m)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                Tell us whether this application is for you or someone you&apos;re helping.
              </p>
              <RadioField name="q1" value={a1} onChange={setA1} options={Q1_OPTIONS} />
            </>
          )}

          {isQ2 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                What is your current living situation?
              </h1>
              <p
                style={{
                  font: "var(--goa-typography-body-m)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                This helps us understand what support you may be eligible for.
              </p>
              <RadioField name="q2" value={a2} onChange={setA2} options={Q2_OPTIONS} />
            </>
          )}

          {isQ3 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                Do you currently receive other benefits?
              </h1>
              <p
                style={{
                  font: "var(--goa-typography-body-m)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                Include federal and provincial benefits you already receive.
              </p>
              <RadioField name="q3" value={a3} onChange={setA3} options={Q3_OPTIONS} />
            </>
          )}

          {isDone && (
            <GoabCallout type="success" heading="Section complete">
              <p style={{ margin: 0 }}>
                Thanks — that&apos;s everything we need for this section. You can continue to the
                next part of your application.
              </p>
            </GoabCallout>
          )}

          <div
            style={{
              display: "flex",
              gap: "var(--goa-space-m)",
              marginTop: "var(--goa-space-2xl)",
            }}
          >
            {notDone && (
              <GoabButton type="primary" trailingIcon="arrow-forward" onClick={onContinue}>
                Continue
              </GoabButton>
            )}
            {isDone && (
              <GoabButton type="primary" onClick={onRestart}>
                Start over
              </GoabButton>
            )}
          </div>
        </div>
      </main>

      <GoabFooter metaLinks={FOOTER_META} copyright="© 2026 Government of Alberta" />
    </div>
  );
}

export default QuestionPage;
