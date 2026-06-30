import * as React from "react";
import { useState } from "react";
import { GoabBadge } from "../../components/core/GoabBadge";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFormItem } from "../../components/forms/GoabFormItem";
import { GoabTextarea } from "../../components/forms/GoabTextarea";
import { RadioField, type RadioFieldOption } from "./RadioField";

/**
 * GoA Review and action — side-by-side case-management layout for workers:
 * case details on the left, a decision/action panel on the right with a
 * radio choice, notes and a submit action.
 */
export interface ReviewAndActionProps {}

const DECISION_OPTIONS: RadioFieldOption[] = [
  { value: "approve", text: "Approve application" },
  {
    value: "deny",
    text: "Deny application",
    description: "The applicant will be notified with a reason",
  },
  { value: "info", text: "Request more information" },
];

const DECISION_LABELS: Record<string, string> = {
  approve: "Approved",
  deny: "Denied",
  info: "More info needed",
};

export function ReviewAndAction(_props: ReviewAndActionProps) {
  const [decision, setDecision] = useState("");
  const [done, setDone] = useState(false);

  const noop = (e: React.MouseEvent) => e && e.preventDefault();
  const decisionLabel = DECISION_LABELS[decision] || "actioned";
  const notDone = !done;
  const submitDisabled = !decision;
  const onSubmit = () => setDone(true);
  const onReset = () => setDone(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--goa-color-greyscale-100)",
        fontFamily: "var(--goa-font-family-sans)",
        color: "var(--goa-color-text-default)",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          background: "var(--goa-color-greyscale-white)",
          borderBottom: "1px solid var(--goa-color-greyscale-200)",
          padding: "var(--goa-space-m) var(--goa-space-xl)",
          display: "flex",
          alignItems: "center",
          gap: "var(--goa-space-l)",
        }}
      >
        <a
          href="#"
          onClick={noop}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--goa-color-interactive-default)",
            textDecoration: "none",
            font: "var(--goa-typography-body-s)",
          }}
        >
          <ion-icon name="arrow-back" style={{ fontSize: "16px" }}></ion-icon> Back to queue
        </a>
        <span style={{ flex: 1 }}></span>
        <GoabBadge type="important" content="In review" emphasis="subtle" icon={true} />
      </header>

      <main
        style={{
          flex: 1,
          maxWidth: 1224,
          margin: "0 auto",
          padding: "var(--goa-space-xl)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "var(--goa-space-m)",
            marginBottom: "var(--goa-space-xs)",
          }}
        >
          <h1 style={{ font: "var(--goa-typography-heading-l)", margin: 0 }}>Marcus Cardinal</h1>
          <span
            style={{
              font: "var(--goa-typography-body-m)",
              color: "var(--goa-color-text-secondary)",
            }}
          >
            Case IS-77310
          </span>
        </div>
        <p
          style={{
            font: "var(--goa-typography-body-s)",
            color: "var(--goa-color-text-secondary)",
            margin: "0 0 var(--goa-space-xl)",
          }}
        >
          Income support · Submitted Jun 20, 2026
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "var(--goa-space-xl)",
            alignItems: "start",
          }}
        >
          {/* Left: details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-l)" }}>
            <GoabContainer type="non-interactive" padding="relaxed" heading="Applicant">
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
                  Full name
                </span>
                <span style={{ font: "var(--goa-typography-body-m)" }}>Marcus Cardinal</span>
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
                  Date of birth
                </span>
                <span style={{ font: "var(--goa-typography-body-m)" }}>2 Aug 1991</span>
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
                  Address
                </span>
                <span style={{ font: "var(--goa-typography-body-m)" }}>114 4 St, Edmonton</span>
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
                  Phone
                </span>
                <span style={{ font: "var(--goa-typography-body-m)" }}>780-555-0148</span>
              </div>
            </GoabContainer>

            <GoabContainer type="non-interactive" padding="relaxed" heading="Financial details">
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
                  Monthly income
                </span>
                <span style={{ font: "var(--goa-typography-number-s)" }}>$1,420</span>
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
                  Monthly rent
                </span>
                <span style={{ font: "var(--goa-typography-number-s)" }}>$1,150</span>
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
                  Dependents
                </span>
                <span style={{ font: "var(--goa-typography-number-s)" }}>1</span>
              </div>
            </GoabContainer>

            <GoabCallout type="information" heading="Verification">
              <p style={{ margin: 0 }}>
                Income verified with CRA on Jun 22. Identity documents on file.
              </p>
            </GoabCallout>
          </div>

          {/* Right: action panel */}
          <GoabContainer type="interactive" accent="thick" padding="relaxed" heading="Decision">
            {notDone && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-l)" }}>
                <GoabFormItem label="Outcome">
                  <RadioField
                    name="decision"
                    value={decision}
                    onChange={setDecision}
                    options={DECISION_OPTIONS}
                  />
                </GoabFormItem>
                <GoabFormItem label="Case notes" helpText="Visible to other caseworkers.">
                  <GoabTextarea
                    rows={4}
                    maxLength={500}
                    placeholder="Add a note about this decision…"
                  />
                </GoabFormItem>
                <div style={{ display: "flex", gap: "var(--goa-space-m)" }}>
                  <GoabButton type="primary" disabled={submitDisabled} onClick={onSubmit}>
                    Submit decision
                  </GoabButton>
                  <GoabButton type="tertiary">Save draft</GoabButton>
                </div>
              </div>
            )}
            {done && (
              <>
                <GoabCallout type="success" heading="Decision recorded">
                  <p style={{ margin: 0 }}>
                    This case has been marked <strong>{decisionLabel}</strong> and moved out of your
                    queue.
                  </p>
                </GoabCallout>
                <div style={{ marginTop: "var(--goa-space-l)" }}>
                  <GoabButton type="tertiary" onClick={onReset}>
                    Undo
                  </GoabButton>
                </div>
              </>
            )}
          </GoabContainer>
        </div>
      </main>
    </div>
  );
}

export default ReviewAndAction;
