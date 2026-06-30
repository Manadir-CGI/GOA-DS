import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader, type GoabNavItem } from "../../components/navigation/GoabAppHeader";
import { GoabFooter } from "../../components/navigation/GoabFooter";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabCallout } from "../../components/core/GoabCallout";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabBadge } from "../../components/core/GoabBadge";
import { GoabIcon } from "../../components/core/GoabIcon";
import { GoabFormItem } from "../../components/forms/GoabFormItem";
import { GoabInput } from "../../components/forms/GoabInput";
import { GoabDropdown } from "../../components/forms/GoabDropdown";
import { GoabCheckbox } from "../../components/forms/GoabCheckbox";
import { IncomeRadio } from "./IncomeRadio";

/**
 * GoA Citizen Service Flow — interactive Government of Alberta citizen
 * service: landing, multi-step application form and confirmation, wired end
 * to end from GoA components and tokens.
 */
export interface CitizenServiceFlowProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
  /** Which screen to show. Default "home". */
  screen?: "home" | "apply" | "confirm";
}

const PROVINCES = ["Alberta", "British Columbia", "Saskatchewan", "Manitoba", "Ontario"];

const FOOTER_NAV = [
  { label: "Contact government" },
  { label: "Accessibility" },
  { label: "Using Alberta.ca" },
  { label: "Privacy" },
];

const FOOTER_META = [{ label: "Disclaimer" }, { label: "Terms of use" }, { label: "Sitemap" }];

const NAV_MAP: Record<string, "home" | "apply" | "confirm"> = {
  Overview: "home",
  Apply: "apply",
  Confirmation: "confirm",
};

export function CitizenServiceFlow({
  phase = "beta",
  screen: screenProp,
}: CitizenServiceFlowProps) {
  const [screenState, setScreenState] = useState<"home" | "apply" | "confirm" | null>(null);
  const [income, setIncome] = useState("b");

  const screen = screenState ?? screenProp ?? "home";
  const go = (target: "home" | "apply" | "confirm") => () => setScreenState(target);

  const isHome = screen === "home";
  const isApply = screen === "apply";
  const isConfirm = screen === "confirm";

  const goHome = go("home");
  const goApply = go("apply");
  const goConfirm = go("confirm");

  const preventDefault = (e: React.MouseEvent) => e.preventDefault();

  const navItems: GoabNavItem[] = [
    { label: "Overview", current: screen === "home" },
    { label: "Apply", current: screen === "apply" },
    { label: "Confirmation", current: screen === "confirm" },
  ];

  const onNavigate = (item: GoabNavItem) => {
    const next = NAV_MAP[item.label];
    if (next) setScreenState(next);
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
      <GoabMicrositeHeader type={phase} version="v2.1" feedbackHref="#" />

      <GoabAppHeader
        logoSrc="../../assets/goa-logo.svg"
        heading="Child care subsidy"
        navItems={navItems}
        onNavigate={onNavigate}
      >
        <a
          href="#"
          onClick={preventDefault}
          style={{
            color: "var(--goa-color-interactive-default)",
            textDecoration: "none",
            font: "var(--goa-typography-body-s)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <GoabIcon type="person-circle-outline" style={{ fontSize: 20 }} /> My account
        </a>
      </GoabAppHeader>

      <main style={{ flex: 1 }}>
        {/* ================= HOME / SERVICE LANDING ================= */}
        {isHome && (
          <div data-screen-label="Service landing">
            {/* Hero */}
            <section
              style={{
                background: "var(--goa-color-brand-dark)",
                color: "var(--goa-color-text-light)",
              }}
            >
              <div
                style={{
                  maxWidth: 1100,
                  margin: "0 auto",
                  padding: "var(--goa-space-3xl) var(--goa-space-2xl)",
                }}
              >
                <p
                  style={{
                    font: "var(--goa-typography-body-s)",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    opacity: 0.85,
                    margin: "0 0 var(--goa-space-s)",
                  }}
                >
                  Children and families
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
                  Alberta Child Care Subsidy
                </h1>
                <p
                  style={{
                    font: "var(--goa-typography-body-l)",
                    margin: "var(--goa-space-l) 0 var(--goa-space-xl)",
                    maxWidth: 620,
                    opacity: 0.95,
                  }}
                >
                  Help with the cost of licensed child care for eligible families with children in
                  kindergarten to Grade 6 or younger.
                </p>
                <GoabButton type="start" onClick={goApply}>
                  Start an application
                </GoabButton>
              </div>
            </section>

            {/* Content */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "var(--goa-space-2xl)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "var(--goa-space-2xl)",
                  alignItems: "start",
                }}
              >
                <div>
                  <h2
                    style={{
                      font: "var(--goa-typography-heading-l)",
                      margin: "0 0 var(--goa-space-m)",
                    }}
                  >
                    Who can apply
                  </h2>
                  <p
                    style={{
                      font: "var(--goa-typography-body-m)",
                      margin: "0 0 var(--goa-space-l)",
                      maxWidth: 640,
                    }}
                  >
                    You may be eligible if you are a resident of Alberta, your child is enrolled in
                    a licensed program, and your family income is below the threshold for your
                    household size.
                  </p>

                  <GoabCallout type="information" heading="Before you begin">
                    <p style={{ margin: 0 }}>
                      Have your Alberta Health Care number, last year&apos;s Notice of Assessment,
                      and your child care provider details ready. The application takes about 15
                      minutes.
                    </p>
                  </GoabCallout>

                  <h2
                    style={{
                      font: "var(--goa-typography-heading-l)",
                      margin: "var(--goa-space-2xl) 0 var(--goa-space-l)",
                    }}
                  >
                    Ways to get support
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--goa-space-l)",
                    }}
                  >
                    <GoabContainer type="non-interactive" accent="thin" heading="Subsidy estimate">
                      <p
                        style={{
                          margin: "0 0 var(--goa-space-m)",
                          font: "var(--goa-typography-body-s)",
                          color: "var(--goa-color-text-secondary)",
                        }}
                      >
                        Estimate your monthly subsidy before you apply.
                      </p>
                      <GoabButton type="tertiary" size="compact" trailingIcon="arrow-forward">
                        Use estimator
                      </GoabButton>
                    </GoabContainer>
                    <GoabContainer type="non-interactive" accent="thin" heading="Check your status">
                      <p
                        style={{
                          margin: "0 0 var(--goa-space-m)",
                          font: "var(--goa-typography-body-s)",
                          color: "var(--goa-color-text-secondary)",
                        }}
                      >
                        Already applied? Track your application online.
                      </p>
                      <GoabButton type="tertiary" size="compact" trailingIcon="arrow-forward">
                        View status
                      </GoabButton>
                    </GoabContainer>
                  </div>
                </div>

                <aside>
                  <GoabContainer type="interactive" accent="thick" heading="At a glance">
                    <ul
                      style={{
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--goa-space-m)",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            font: "var(--goa-typography-body-s)",
                            color: "var(--goa-color-text-secondary)",
                          }}
                        >
                          Processing time
                        </span>
                        <span style={{ font: "var(--goa-typography-number-s)" }}>15 days</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            font: "var(--goa-typography-body-s)",
                            color: "var(--goa-color-text-secondary)",
                          }}
                        >
                          Max monthly
                        </span>
                        <span style={{ font: "var(--goa-typography-number-s)" }}>$266</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            font: "var(--goa-typography-body-s)",
                            color: "var(--goa-color-text-secondary)",
                          }}
                        >
                          Cost to apply
                        </span>
                        <GoabBadge type="success" content="Free" emphasis="subtle" />
                      </li>
                    </ul>
                  </GoabContainer>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ================= APPLY / APPLICATION FORM ================= */}
        {isApply && (
          <div
            data-screen-label="Application form"
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
              Step 2 of 4
            </p>
            <h1
              style={{ font: "var(--goa-typography-heading-l)", margin: "0 0 var(--goa-space-xl)" }}
            >
              Applicant details
            </h1>

            {/* Step rail */}
            <ol
              style={{
                listStyle: "none",
                margin: "0 0 var(--goa-space-2xl)",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--goa-space-l)",
              }}
            >
              <li style={{ display: "flex", alignItems: "center", gap: "var(--goa-space-xs)" }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--goa-color-interactive-default)",
                    color: "#fff",
                    font: "var(--goa-typography-heading-2xs)",
                  }}
                >
                  <GoabIcon type="checkmark" style={{ fontSize: 18 }} />
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  Eligibility
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "var(--goa-space-xs)" }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--goa-color-greyscale-white)",
                    boxShadow: "inset 0 0 0 2px var(--goa-color-interactive-default)",
                    color: "var(--goa-color-interactive-default)",
                    font: "var(--goa-typography-heading-2xs)",
                  }}
                >
                  2
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-heading-2xs)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  Your details
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "var(--goa-space-xs)" }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--goa-color-greyscale-white)",
                    boxShadow: "inset 0 0 0 2px var(--goa-color-greyscale-400)",
                    color: "var(--goa-color-interactive-default)",
                    font: "var(--goa-typography-heading-2xs)",
                  }}
                >
                  3
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-secondary)",
                  }}
                >
                  Children
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "var(--goa-space-xs)" }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--goa-color-greyscale-white)",
                    boxShadow: "inset 0 0 0 2px var(--goa-color-greyscale-400)",
                    color: "var(--goa-color-interactive-default)",
                    font: "var(--goa-typography-heading-2xs)",
                  }}
                >
                  4
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-s)",
                    color: "var(--goa-color-text-secondary)",
                  }}
                >
                  Review
                </span>
              </li>
            </ol>

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

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: "var(--goa-space-l)",
                }}
              >
                <GoabFormItem label="Province or territory">
                  <GoabDropdown items={PROVINCES} defaultValue="Alberta" />
                </GoabFormItem>
                <GoabFormItem label="Postal code" requirement="optional">
                  <GoabInput defaultValue="T5J 2N3" />
                </GoabFormItem>
              </div>

              <GoabFormItem label="Estimated annual household income">
                <IncomeRadio value={income} onChange={setIncome} />
              </GoabFormItem>

              <GoabFormItem label="Consent">
                <GoabCheckbox text="I consent to a verification of my income with the Canada Revenue Agency" />
              </GoabFormItem>

              <div
                style={{
                  display: "flex",
                  gap: "var(--goa-space-m)",
                  marginTop: "var(--goa-space-m)",
                }}
              >
                <GoabButton type="primary" trailingIcon="arrow-forward" onClick={goConfirm}>
                  Continue
                </GoabButton>
                <GoabButton type="tertiary" onClick={goHome}>
                  Back
                </GoabButton>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONFIRM / CONFIRMATION ================= */}
        {isConfirm && (
          <div
            data-screen-label="Confirmation"
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
            }}
          >
            <GoabCallout type="success" heading="Application submitted">
              <p style={{ margin: 0 }}>
                Your reference number is <strong>CCS-2026-48217</strong>. We&apos;ve emailed a copy
                to jordan.n@example.ca.
              </p>
            </GoabCallout>

            <h1
              style={{
                font: "var(--goa-typography-heading-l)",
                margin: "var(--goa-space-2xl) 0 var(--goa-space-l)",
              }}
            >
              What you submitted
            </h1>

            <GoabContainer type="non-interactive" padding="relaxed">
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
                  Applicant
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-m)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  Jordan Nakamura
                </span>
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
                <span
                  style={{
                    font: "var(--goa-typography-body-m)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  jordan.n@example.ca
                </span>
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
                  Province
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-m)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  Alberta
                </span>
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
                  Household income
                </span>
                <span
                  style={{
                    font: "var(--goa-typography-body-m)",
                    color: "var(--goa-color-text-default)",
                  }}
                >
                  $50,000 – $89,999
                </span>
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
                  Status
                </span>
                <GoabBadge type="important" content="Under review" icon={true} />
              </div>
            </GoabContainer>

            <h2
              style={{
                font: "var(--goa-typography-heading-s)",
                margin: "var(--goa-space-2xl) 0 var(--goa-space-s)",
              }}
            >
              What happens next
            </h2>
            <ol
              style={{
                font: "var(--goa-typography-body-m)",
                color: "var(--goa-color-text-default)",
                lineHeight: 1.6,
                paddingLeft: "var(--goa-space-l)",
                margin: 0,
              }}
            >
              <li>We verify your income with the CRA (about 5 business days).</li>
              <li>You&apos;ll get an email when a decision is made.</li>
              <li>If approved, payments begin the following month.</li>
            </ol>

            <div
              style={{
                display: "flex",
                gap: "var(--goa-space-m)",
                marginTop: "var(--goa-space-2xl)",
              }}
            >
              <GoabButton type="primary" onClick={goHome}>
                Go to dashboard
              </GoabButton>
              <GoabButton type="tertiary" leadingIcon="download">
                Download PDF
              </GoabButton>
            </div>
          </div>
        )}
      </main>

      <GoabFooter
        navLinks={FOOTER_NAV}
        metaLinks={FOOTER_META}
        copyright="© 2026 Government of Alberta"
      />
    </div>
  );
}

export default CitizenServiceFlow;
