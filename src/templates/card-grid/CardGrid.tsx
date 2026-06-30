import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabFilterChip } from "../../components/core/GoabFilterChip";
import { GoabContainer } from "../../components/core/GoabContainer";
import { GoabBadge, GoabBadgeType } from "../../components/core/GoabBadge";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Card grid — a responsive grid of cards with selectable filter chips.
 * Each card groups related content with a status badge and an action. Click
 * a chip to filter the grid.
 */
export interface CardGridProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
}

interface ProgramCard {
  title: string;
  category: string;
  body: string;
}

const CATEGORY_BADGE_TYPE: Record<string, GoabBadgeType> = {
  Health: "information",
  Family: "important",
  Seniors: "midtone",
  Business: "success",
};

const PROGRAMS: ProgramCard[] = [
  {
    title: "Child care subsidy",
    category: "Family",
    body: "Help with the cost of licensed child care for eligible families.",
  },
  {
    title: "Alberta seniors benefit",
    category: "Seniors",
    body: "Monthly income support for eligible lower-income seniors.",
  },
  {
    title: "Income support",
    category: "Family",
    body: "Money for basic needs like food, clothing and shelter.",
  },
  {
    title: "Alberta dental and optical",
    category: "Health",
    body: "Coverage for dental and optical care for eligible Albertans.",
  },
  {
    title: "Small business grant",
    category: "Business",
    body: "Funding to help Alberta small businesses grow and hire.",
  },
  {
    title: "Coverage for seniors",
    category: "Health",
    body: "Supplementary health benefits for Albertans 65 and over.",
  },
  {
    title: "Family employment tax credit",
    category: "Family",
    body: "A refundable credit for working families with children.",
  },
  {
    title: "Job training grant",
    category: "Business",
    body: "Cost-shared funding for employee training and development.",
  },
];

const CATEGORIES = ["All", "Health", "Family", "Seniors", "Business"];

const FOOTER_NAV = [
  { label: "Contact government" },
  { label: "Accessibility" },
  { label: "Using Alberta.ca" },
  { label: "Privacy" },
];

const FOOTER_META = [{ label: "Disclaimer" }, { label: "Terms of use" }, { label: "Sitemap" }];

export function CardGrid({ phase = "beta" }: CardGridProps) {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter((c) => c.category === filter);
  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "program" : "programs"}${
    filter !== "All" ? " in " + filter : ""
  }`;
  const cards = filtered.map((c) => ({
    ...c,
    badgeType: CATEGORY_BADGE_TYPE[c.category] || "midtone",
  }));

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
      <GoabAppHeader logoSrc="../../assets/goa-logo.svg" heading="Programs and services" />

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
        <h1 style={{ font: "var(--goa-typography-heading-xl)", margin: "0 0 var(--goa-space-s)" }}>
          Find a program
        </h1>
        <p
          style={{
            font: "var(--goa-typography-body-m)",
            color: "var(--goa-color-text-secondary)",
            margin: "0 0 var(--goa-space-l)",
          }}
        >
          Browse financial and support programs offered by the Government of Alberta.
        </p>

        <div
          style={{
            display: "flex",
            gap: "var(--goa-space-s)",
            flexWrap: "wrap",
            marginBottom: "var(--goa-space-xl)",
          }}
        >
          {CATEGORIES.map((label) => (
            <GoabFilterChip
              key={label}
              content={filter === label ? `${label} ✓` : label}
              onClick={() => setFilter(label)}
            />
          ))}
        </div>

        <p
          style={{
            font: "var(--goa-typography-body-s)",
            color: "var(--goa-color-text-secondary)",
            margin: "0 0 var(--goa-space-m)",
          }}
        >
          {resultLabel}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "var(--goa-space-l)",
          }}
        >
          {cards.map((card) => (
            <GoabContainer key={card.title} type="interactive" accent="thin">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "var(--goa-space-s)",
                  marginBottom: "var(--goa-space-s)",
                }}
              >
                <h2 style={{ font: "var(--goa-typography-heading-s)", margin: 0 }}>{card.title}</h2>
                <GoabBadge type={card.badgeType} content={card.category} emphasis="subtle" />
              </div>
              <p
                style={{
                  font: "var(--goa-typography-body-s)",
                  color: "var(--goa-color-text-secondary)",
                  margin: "0 0 var(--goa-space-l)",
                  minHeight: 48,
                  textWrap: "pretty" as React.CSSProperties["textWrap"],
                }}
              >
                {card.body}
              </p>
              <GoabButton type="tertiary" size="compact" trailingIcon="arrow-forward">
                Learn more
              </GoabButton>
            </GoabContainer>
          ))}
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

export default CardGrid;
