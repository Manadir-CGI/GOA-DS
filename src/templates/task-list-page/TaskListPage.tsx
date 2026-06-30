import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../../components/navigation/GoabMicrositeHeader";
import { GoabAppHeader } from "../../components/navigation/GoabAppHeader";
import { GoabBadge, type GoabBadgeType } from "../../components/core/GoabBadge";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabFooter } from "../../components/navigation/GoabFooter";

/**
 * GoA Task list page — hub for a multi-step service: grouped tasks with
 * status tags and a completion summary. Click a task to mark it done; the
 * progress count updates. Used when a service has several independent
 * parts.
 */
export interface TaskListPageProps {
  /** Service phase shown on the microsite header. Default "beta". */
  phase?: "beta" | "alpha" | "live";
}

type TaskStatus = "completed" | "progress" | "notstarted" | "locked";

const INITIAL_STATUSES: Record<string, TaskStatus> = {
  eligibility: "completed",
  personal: "completed",
  income: "progress",
  documents: "notstarted",
  review: "locked",
  declaration: "locked",
};

const FOOTER_META = [{ label: "Privacy" }, { label: "Accessibility" }, { label: "Contact" }];

function badgeInfo(status: TaskStatus): {
  statusLabel: string;
  badgeType: GoabBadgeType;
  badgeIcon: boolean;
} {
  switch (status) {
    case "completed":
      return { statusLabel: "Completed", badgeType: "success", badgeIcon: true };
    case "progress":
      return { statusLabel: "In progress", badgeType: "information", badgeIcon: false };
    case "notstarted":
      return { statusLabel: "Not started", badgeType: "midtone", badgeIcon: false };
    default:
      return { statusLabel: "Cannot start yet", badgeType: "archived", badgeIcon: false };
  }
}

export function TaskListPage({ phase = "beta" }: TaskListPageProps) {
  const [statuses, setStatuses] = useState<Record<string, TaskStatus>>(INITIAL_STATUSES);

  const mk = (id: string, label: string) => {
    const status = statuses[id];
    const locked = status === "locked";
    return {
      id,
      label,
      locked,
      cursor: locked ? "not-allowed" : "pointer",
      labelColor: locked
        ? "var(--goa-color-text-secondary)"
        : "var(--goa-color-interactive-default)",
      onClick: locked
        ? undefined
        : () =>
            setStatuses((s) => {
              const cur = s[id];
              const next: TaskStatus = cur === "completed" ? "notstarted" : "completed";
              return { ...s, [id]: next };
            }),
      ...badgeInfo(status),
    };
  };

  const groups = [
    { title: "Check before you start", tasks: [mk("eligibility", "Confirm your eligibility")] },
    {
      title: "Prepare your application",
      tasks: [
        mk("personal", "Business and contact details"),
        mk("income", "Revenue and expenses"),
        mk("documents", "Upload supporting documents"),
      ],
    },
    {
      title: "Submit",
      tasks: [mk("review", "Review your answers"), mk("declaration", "Declaration and submit")],
    },
  ];

  const all = Object.keys(statuses);
  const completedCount = all.filter((k) => statuses[k] === "completed").length;
  const total = all.length;
  const submitDisabled = completedCount < total;

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
      <GoabAppHeader logoSrc="../../assets/goa-logo.svg" heading="Business grant application" />

      <main style={{ flex: 1 }}>
        <div
          style={{
            maxWidth: 740,
            margin: "0 auto",
            padding: "var(--goa-space-2xl) var(--goa-space-2xl) var(--goa-space-4xl)",
          }}
        >
          <h1
            style={{ font: "var(--goa-typography-heading-xl)", margin: "0 0 var(--goa-space-s)" }}
          >
            Apply for a small business grant
          </h1>
          <p
            style={{
              font: "var(--goa-typography-body-m)",
              color: "var(--goa-color-text-secondary)",
              margin: "0 0 var(--goa-space-l)",
            }}
          >
            Complete each section below. You can do them in any order and come back later — your
            progress is saved.
          </p>

          <div
            style={{
              background: "var(--goa-color-greyscale-100)",
              borderRadius: "var(--goa-border-radius-m, 6px)",
              padding: "var(--goa-space-m) var(--goa-space-l)",
              marginBottom: "var(--goa-space-2xl)",
              font: "var(--goa-typography-heading-2xs)",
            }}
          >
            {completedCount} of {total} sections completed
          </div>

          {groups.map((group) => (
            <section key={group.title} style={{ marginBottom: "var(--goa-space-2xl)" }}>
              <h2
                style={{
                  font: "var(--goa-typography-heading-s)",
                  margin: "0 0 var(--goa-space-s)",
                  paddingBottom: "var(--goa-space-xs)",
                  borderBottom: "2px solid var(--goa-color-greyscale-200)",
                }}
              >
                {group.title}
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {group.tasks.map((task) => (
                  <li
                    key={task.id}
                    style={{ borderBottom: "1px solid var(--goa-color-greyscale-100)" }}
                  >
                    <button
                      onClick={task.onClick}
                      disabled={task.locked}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--goa-space-m)",
                        padding: "var(--goa-space-m) 0",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: task.cursor,
                      }}
                    >
                      <span
                        style={{ font: "var(--goa-typography-body-m)", color: task.labelColor }}
                      >
                        {task.label}
                      </span>
                      <GoabBadge
                        type={task.badgeType}
                        content={task.statusLabel}
                        emphasis="subtle"
                        icon={task.badgeIcon}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <GoabButton type="primary" disabled={submitDisabled}>
            Submit application
          </GoabButton>
          <p
            style={{
              font: "var(--goa-typography-body-s)",
              color: "var(--goa-color-text-secondary)",
              margin: "var(--goa-space-m) 0 0",
            }}
          >
            You can submit once all sections are complete.
          </p>
        </div>
      </main>

      <GoabFooter metaLinks={FOOTER_META} copyright="© 2026 Government of Alberta" />
    </div>
  );
}

export default TaskListPage;
