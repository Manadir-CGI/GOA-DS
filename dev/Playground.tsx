import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";
import { GoabButtonGroup } from "../src/components/core/GoabButtonGroup";
import { GoabBadge } from "../src/components/core/GoabBadge";
import { GoabCallout } from "../src/components/core/GoabCallout";
import { GoabContainer } from "../src/components/core/GoabContainer";
import { GoabInput } from "../src/components/forms/GoabInput";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabCheckbox } from "../src/components/forms/GoabCheckbox";
import { GoabModal } from "../src/components/feedback/GoabModal";
import { GoabTabs, GoabTab } from "../src/components/layout/GoabTabs";
import { GoabTable } from "../src/components/data/GoabTable";
import { GoabAppHeader } from "../src/components/navigation/GoabAppHeader";
import { Icon } from "../src/icons/Icon";
import { Apprenticeship1 } from "../src/illustrations/Apprenticeship1";
import { StartPage } from "../src/templates/start-page/StartPage";
import { CardGrid } from "../src/templates/card-grid/CardGrid";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ font: "var(--goa-typography-heading-m)", marginBottom: 16 }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </section>
  );
}

export function Playground() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"components" | "start-page" | "card-grid">("components");

  return (
    <div
      style={{ fontFamily: "var(--goa-font-family-sans)", color: "var(--goa-color-text-default)" }}
    >
      <div
        style={{
          padding: 16,
          display: "flex",
          gap: 8,
          borderBottom: "1px solid var(--goa-color-greyscale-200)",
        }}
      >
        <GoabButton
          type={tab === "components" ? "primary" : "tertiary"}
          onClick={() => setTab("components")}
        >
          Components
        </GoabButton>
        <GoabButton
          type={tab === "start-page" ? "primary" : "tertiary"}
          onClick={() => setTab("start-page")}
        >
          Start page template
        </GoabButton>
        <GoabButton
          type={tab === "card-grid" ? "primary" : "tertiary"}
          onClick={() => setTab("card-grid")}
        >
          Card grid template
        </GoabButton>
      </div>

      {tab === "start-page" && <StartPage />}
      {tab === "card-grid" && <CardGrid />}

      {tab === "components" && (
        <div style={{ padding: 32, maxWidth: 900 }}>
          <h1 style={{ font: "var(--goa-typography-heading-2xl)", marginBottom: 32 }}>
            GoA Design System — dev playground
          </h1>

          <Section title="Buttons">
            <GoabButtonGroup>
              <GoabButton type="primary">Primary</GoabButton>
              <GoabButton type="secondary">Secondary</GoabButton>
              <GoabButton type="tertiary">Tertiary</GoabButton>
              <GoabButton type="primary" leadingIcon="add">
                With icon
              </GoabButton>
              <GoabButton type="primary" disabled>
                Disabled
              </GoabButton>
            </GoabButtonGroup>
          </Section>

          <Section title="Badges">
            <GoabButtonGroup>
              <GoabBadge type="success" content="Approved" />
              <GoabBadge type="important" content="Pending" />
              <GoabBadge type="emergency" content="Rejected" />
              <GoabBadge type="information" content="Draft" />
            </GoabButtonGroup>
          </Section>

          <Section title="Callout">
            <GoabCallout type="important" heading="Heads up">
              <p>This is a callout rendered from real GoA tokens.</p>
            </GoabCallout>
          </Section>

          <Section title="Form">
            <GoabContainer>
              <GoabFormItem label="Full name">
                <GoabInput name="name" placeholder="Jane Doe" />
              </GoabFormItem>
              <GoabCheckbox text="I agree to the terms" name="agree" />
            </GoabContainer>
          </Section>

          <Section title="Tabs">
            <GoabTabs initialTab={1}>
              <GoabTab heading="Overview">
                <p>Overview content.</p>
              </GoabTab>
              <GoabTab heading="Details">
                <p>Details content.</p>
              </GoabTab>
            </GoabTabs>
          </Section>

          <Section title="Table">
            <GoabTable
              headers={["Name", "Status"]}
              rows={[
                ["Alice", "Active"],
                ["Bob", "Inactive"],
              ]}
            />
          </Section>

          <Section title="Modal">
            <GoabButton type="secondary" onClick={() => setModalOpen(true)}>
              Open modal
            </GoabButton>
            <GoabModal heading="Example modal" open={modalOpen} onClose={() => setModalOpen(false)}>
              <p>Modal body content.</p>
            </GoabModal>
          </Section>

          <Section title="Icons">
            <div style={{ display: "flex", gap: 16 }}>
              <Icon name="GoaMenuVariantBasic" size={32} />
              <Icon name="AirplaneVariantOutline" size={32} />
              <Icon name="LogoGoogle" size={32} />
            </div>
          </Section>

          <Section title="Illustration">
            <Apprenticeship1 style={{ width: 200, height: 100 }} />
          </Section>

          <Section title="Navigation">
            <GoabAppHeader heading="Example service" />
          </Section>
        </div>
      )}
    </div>
  );
}
