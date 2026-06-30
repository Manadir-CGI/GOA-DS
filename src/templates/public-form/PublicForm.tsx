import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabFormItem } from "../../components/forms/GoabFormItem";
import { GoabInput } from "../../components/forms/GoabInput";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";
import { RadioField } from "./RadioField";
import { StepperField } from "./StepperField";

/**
 * GoA Public form — citizen-facing multi-step form with the GoA form
 * stepper: eligibility, details and income steps then a review, with
 * working Back/Continue navigation and a submit state.
 */
export interface PublicFormProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
  /** Path to the GoA wordmark used in the app header. */
  logoSrc?: string;
}

const STEPS = [
  { text: "Eligibility" },
  { text: "Your details" },
  { text: "Income" },
  { text: "Review" },
];

const YES_NO = [
  { value: "yes", text: "Yes" },
  { value: "no", text: "No" },
];

const INCOME_OPTIONS = [
  { value: "a", text: "Under $50,000" },
  {
    value: "b",
    text: "$50,000 – $89,999",
    description: "Most families qualify for a partial subsidy",
  },
  { value: "c", text: "$90,000 or more" },
];

const FOOTER_META = [{ label: "Privacy" }, { label: "Accessibility" }, { label: "Contact" }];

export function PublicForm({ phase = "beta", logoSrc }: PublicFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [resident, setResident] = useState("yes");
  const [income, setIncome] = useState("b");

  const isStep1 = step === 1;
  const isStep2 = step === 2;
  const isStep3 = step === 3;
  const isStep4 = step === 4;
  const notSubmitted = !submitted;
  const showBack = step > 1 && !submitted;
  const showContinue = step < 4;
  const showSubmit = step === 4 && !submitted;

  const onStepChange = (n: number) => {
    if (!submitted) setStep(n);
  };
  const onContinue = () => setStep((s) => Math.min(s + 1, 4));
  const onBack = () => setStep((s) => Math.max(s - 1, 1));
  const onSubmit = () => setSubmitted(true);
  const onReset = () => {
    setStep(1);
    setSubmitted(false);
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
      <GoabAppHeader logoSrc={logoSrc} heading="Child care subsidy" />

      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
          }}
        >
          <div style={{ marginBottom: "var(--goa-space-2xl)" }}>
            <StepperField step={step} steps={STEPS} onChange={onStepChange} />
          </div>

          {isStep1 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-s)",
                }}
              >
                Eligibility
              </h1>
              <p
                style={{
                  font: "var(--goa-typography-body-m)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                Let&apos;s check you can use this service before you start.
              </p>
              <GoabFormItem label="Are you a resident of Alberta?">
                <RadioField
                  name="resident"
                  value={resident}
                  onChange={setResident}
                  options={YES_NO}
                />
              </GoabFormItem>
            </>
          )}

          {isStep2 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                Your details
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-xl)" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--goa-space-l)",
                  }}
                >
                  <GoabFormItem label="First name">
                    <GoabInput defaultValue="Jordan" />
                  </GoabFormItem>
                  <GoabFormItem label="Last name">
                    <GoabInput defaultValue="Nakamura" />
                  </GoabFormItem>
                </div>
                <GoabFormItem
                  label="Email address"
                  helpText="We'll send your application updates here."
                >
                  <GoabInput type="email" leadingIcon="mail" defaultValue="jordan.n@example.ca" />
                </GoabFormItem>
              </div>
            </>
          )}

          {isStep3 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-xl)",
                }}
              >
                Household income
              </h1>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-xl)" }}>
                <GoabFormItem label="Estimated annual household income">
                  <RadioField
                    name="income"
                    value={income}
                    onChange={setIncome}
                    options={INCOME_OPTIONS}
                  />
                </GoabFormItem>
                <GoabFormItem label="Number of children in care">
                  <GoabInput type="number" defaultValue="2" width="120px" />
                </GoabFormItem>
              </div>
            </>
          )}

          {isStep4 && (
            <>
              <h1
                style={{
                  font: "var(--goa-typography-heading-l)",
                  margin: "0 0 var(--goa-space-l)",
                }}
              >
                Review and submit
              </h1>
              {notSubmitted && (
                <GoabContainer type="non-interactive" padding="relaxed">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      Alberta resident
                    </span>
                    <span style={{ font: "var(--goa-typography-body-m)" }}>Yes</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      Applicant
                    </span>
                    <span style={{ font: "var(--goa-typography-body-m)" }}>Jordan Nakamura</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      Household income
                    </span>
                    <span style={{ font: "var(--goa-typography-body-m)" }}>$50,000 – $89,999</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--goa-space-s) 0",
                    }}
                  >
                    <span
                      style={{
                        font: "var(--goa-typography-body-s)",
                        color: "var(--goa-color-text-secondary)",
                      }}
                    >
                      Children in care
                    </span>
                    <span style={{ font: "var(--goa-typography-body-m)" }}>2</span>
                  </div>
                </GoabContainer>
              )}
              {submitted && (
                <GoabCallout type="success" heading="Application submitted">
                  <p style={{ margin: 0 }}>
                    Your reference number is <strong>CCS-2026-48217</strong>.
                  </p>
                </GoabCallout>
              )}
            </>
          )}

          <div
            style={{
              display: "flex",
              gap: "var(--goa-space-m)",
              marginTop: "var(--goa-space-2xl)",
            }}
          >
            {showBack && (
              <GoabButton type="tertiary" leadingIcon="arrow-back" onClick={onBack}>
                Back
              </GoabButton>
            )}
            {showContinue && (
              <GoabButton type="primary" trailingIcon="arrow-forward" onClick={onContinue}>
                Continue
              </GoabButton>
            )}
            {showSubmit && (
              <GoabButton type="primary" onClick={onSubmit}>
                Accept and submit
              </GoabButton>
            )}
            {submitted && (
              <GoabButton type="tertiary" onClick={onReset}>
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

export default PublicForm;
