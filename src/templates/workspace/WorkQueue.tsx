import * as React from "react";
import { useState } from "react";
import { GoabTable, type GoabTableColumn } from "../../components/data/GoabTable";
import { GoabBadge } from "../../components/core/GoabBadge";
import { GoabButton } from "../../components/core/GoabButton";
import { GoabCheckbox } from "../../components/forms/GoabCheckbox";

/* Cases work queue — faithful to goa-workspace-playground's Cases page.
   Tabs + filter chips + a sortable, selectable DataTable using the design
   system's GoabTable, with a selection action bar (PageFooter pattern).
   Columns match the repo's DisplaySettings: Name, File number, Jurisdiction,
   Assigned to, Status, Priority, Due date. */

type CaseStatus = "success" | "emergency" | "important" | "default";
type CasePriority = "high" | "medium" | "low";
type CaseCategory = "todo" | "progress" | "complete";

interface CaseRow {
  id: string;
  name: string;
  staff: string;
  jurisdiction: string;
  due: string;
  status: CaseStatus;
  statusText: string;
  priority: CasePriority;
  category: CaseCategory;
}

// Representative slice of the workspace mock case load (src/data/mockCases.json).
const CASES: CaseRow[] = [
  {
    id: "1234567890",
    name: "Gilbert Barton",
    staff: "Edna Mode",
    jurisdiction: "Calgary",
    due: "Mar 16, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "high",
    category: "todo",
  },
  {
    id: "2345678901",
    name: "Shelley Leffler",
    staff: "",
    jurisdiction: "Edmonton",
    due: "Sep 20, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "medium",
    category: "progress",
  },
  {
    id: "3456789012",
    name: "Randal Sanford",
    staff: "Edna Mode",
    jurisdiction: "Red Deer",
    due: "Nov 10, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "low",
    category: "complete",
  },
  {
    id: "4567890123",
    name: "Bonnie Metz",
    staff: "",
    jurisdiction: "Lethbridge",
    due: "Feb 25, 2024",
    status: "emergency",
    statusText: "Denied",
    priority: "high",
    category: "todo",
  },
  {
    id: "5678901234",
    name: "Lowell Kuhn",
    staff: "Bob Parr",
    jurisdiction: "Calgary",
    due: "Apr 10, 2024",
    status: "default",
    statusText: "Cancelled",
    priority: "medium",
    category: "todo",
  },
  {
    id: "6789012345",
    name: "William Boyer",
    staff: "Helen Parr",
    jurisdiction: "Edmonton",
    due: "May 15, 2024",
    status: "emergency",
    statusText: "Denied",
    priority: "high",
    category: "progress",
  },
  {
    id: "7890123456",
    name: "Virginia Johns",
    staff: "Edna Mode",
    jurisdiction: "Medicine Hat",
    due: "Jun 22, 2024",
    status: "important",
    statusText: "Email sent",
    priority: "low",
    category: "complete",
  },
  {
    id: "8901234567",
    name: "Marvin Hamill",
    staff: "",
    jurisdiction: "Fort McMurray",
    due: "Jul 08, 2024",
    status: "important",
    statusText: "Email sent",
    priority: "high",
    category: "todo",
  },
  {
    id: "9012345678",
    name: "Wendell Gerhold",
    staff: "Helen Parr",
    jurisdiction: "Calgary",
    due: "Aug 14, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "medium",
    category: "progress",
  },
  {
    id: "0123456789",
    name: "Wendy Cormier",
    staff: "Edna Mode",
    jurisdiction: "Edmonton",
    due: "Jul 30, 2024",
    status: "important",
    statusText: "Email sent",
    priority: "high",
    category: "todo",
  },
  {
    id: "1234509876",
    name: "Mable Macejkovic",
    staff: "Bob Parr",
    jurisdiction: "Red Deer",
    due: "Oct 17, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "low",
    category: "complete",
  },
  {
    id: "2345610987",
    name: "Don Walsh",
    staff: "Helen Parr",
    jurisdiction: "Lethbridge",
    due: "Nov 25, 2024",
    status: "success",
    statusText: "Accepted",
    priority: "medium",
    category: "progress",
  },
  {
    id: "3456721098",
    name: "Ethan White",
    staff: "Edna Mode",
    jurisdiction: "Calgary",
    due: "Dec 05, 2024",
    status: "emergency",
    statusText: "Denied",
    priority: "high",
    category: "todo",
  },
  {
    id: "4567832109",
    name: "Mia Robinson",
    staff: "Bob Parr",
    jurisdiction: "Edmonton",
    due: "Jan 12, 2025",
    status: "default",
    statusText: "Cancelled",
    priority: "high",
    category: "progress",
  },
];

const STATUS_BADGE: Record<CaseStatus, { type: string; icon?: boolean }> = {
  success: { type: "success", icon: true },
  emergency: { type: "emergency", icon: true },
  important: { type: "important", icon: true },
  default: { type: "midtone" },
};
const PRIORITY_BADGE: Record<CasePriority, { type: string; label: string }> = {
  high: { type: "emergency", label: "High" },
  medium: { type: "information", label: "Medium" },
  low: { type: "midtone", label: "Low" },
};
const PRIORITY_RANK: Record<CasePriority, number> = { high: 0, medium: 1, low: 2 };

function StatusBadge({ status, text }: { status: CaseStatus; text: string }) {
  const cfg = STATUS_BADGE[status] || { type: "midtone" };
  return <GoabBadge type={cfg.type as any} content={text} emphasis="subtle" icon={cfg.icon} />;
}
function PriorityBadge({ priority }: { priority: CasePriority }) {
  const cfg = PRIORITY_BADGE[priority] || { type: "midtone", label: priority };
  return <GoabBadge type={cfg.type as any} content={cfg.label} emphasis="subtle" />;
}

interface SortState {
  col: string;
  dir: "asc" | "desc";
}

function SortHeader({
  label,
  col,
  sort,
  onSort,
  numeric,
}: {
  label: string;
  col: string;
  sort: SortState;
  onSort: (col: string) => void;
  numeric?: boolean;
}) {
  const active = sort.col === col;
  const arrow = !active ? "swap-vertical" : sort.dir === "asc" ? "arrow-up" : "arrow-down";
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      aria-label={`Sort by ${label}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        flexDirection: numeric ? "row-reverse" : "row",
        background: "none",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        font: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        letterSpacing: "inherit",
      }}
    >
      <span>{label}</span>
      <ion-icon
        name={`${arrow}-outline`}
        style={{ fontSize: "15px", opacity: active ? 0.9 : 0.4 }}
      ></ion-icon>
    </button>
  );
}

function sortCases(list: CaseRow[], sort: SortState): CaseRow[] {
  const { col, dir } = sort;
  const mult = dir === "asc" ? 1 : -1;
  return [...list].sort((a, b) => {
    let av: string | number, bv: string | number;
    if (col === "priority") {
      av = PRIORITY_RANK[a.priority];
      bv = PRIORITY_RANK[b.priority];
    } else if (col === "due") {
      av = new Date(a.due).getTime();
      bv = new Date(b.due).getTime();
    } else if (col === "status") {
      av = a.statusText;
      bv = b.statusText;
    } else {
      av = ((a as any)[col] || "").toString().toLowerCase();
      bv = ((b as any)[col] || "").toString().toLowerCase();
    }
    if (typeof av === "string") return av.localeCompare(bv as string) * mult;
    return ((av as number) - (bv as number)) * mult;
  });
}

interface TabDef {
  heading: string;
  filter: (row: CaseRow) => boolean;
}

const TABS: TabDef[] = [
  { heading: "All cases", filter: () => true },
  { heading: "To do", filter: (r) => r.category === "todo" },
  { heading: "In progress", filter: (r) => r.category === "progress" },
  { heading: "Completed", filter: (r) => r.category === "complete" },
];

export interface WorkQueueProps {
  /** 1-based initial tab index (1 = All cases, 2 = To do, 3 = In progress, 4 = Completed). */
  initialTab?: number;
}

export function WorkQueue({ initialTab }: WorkQueueProps) {
  const [tab, setTab] = useState(Math.max(0, (Number(initialTab) || 2) - 1));
  const [sort, setSort] = useState<SortState>({ col: "due", dir: "asc" });
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const onSort = (col: string) =>
    setSort((s) =>
      s.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" }
    );

  const subset = CASES.filter(TABS[tab].filter);
  const rows = sortCases(subset, sort);
  const selectedIds = Object.keys(selected).filter((k) => selected[k]);
  const allOnPage = rows.length > 0 && rows.every((r) => selected[r.id]);
  const toggleAll = () => {
    const next = { ...selected };
    if (allOnPage) rows.forEach((r) => delete next[r.id]);
    else
      rows.forEach((r) => {
        next[r.id] = true;
      });
    setSelected(next);
  };
  const toggleOne = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const headerCell = (label: string, col: string, numeric?: boolean) => ({
    label: <SortHeader label={label} col={col} sort={sort} onSort={onSort} numeric={numeric} />,
    numeric,
  });

  const headers = [
    {
      label: (
        <GoabCheckbox
          name="select-all"
          checked={allOnPage}
          onChange={toggleAll}
          ariaLabel="Select all"
        />
      ),
    },
    headerCell("Name", "name"),
    headerCell("File number", "id"),
    headerCell("Jurisdiction", "jurisdiction"),
    headerCell("Assigned to", "staff"),
    headerCell("Status", "status"),
    headerCell("Priority", "priority"),
    headerCell("Due date", "due"),
  ] as unknown as GoabTableColumn[];

  const tableRows: React.ReactNode[][] = rows.map((r) => [
    <GoabCheckbox
      name={`sel-${r.id}`}
      checked={!!selected[r.id]}
      onChange={() => toggleOne(r.id)}
      ariaLabel={`Select ${r.name}`}
    />,
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{
        color: "var(--goa-color-text-default)",
        fontWeight: 600,
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {r.name}
    </a>,
    <span
      style={{ fontVariantNumeric: "tabular-nums", color: "var(--goa-color-interactive-default)" }}
    >
      {r.id}
    </span>,
    r.jurisdiction,
    r.staff ? (
      r.staff
    ) : (
      <span style={{ color: "var(--goa-color-text-secondary)", fontStyle: "italic" }}>
        Unassigned
      </span>
    ),
    <StatusBadge status={r.status} text={r.statusText} />,
    <PriorityBadge priority={r.priority} />,
    <span style={{ whiteSpace: "nowrap" }}>{r.due}</span>,
  ]);

  return (
    <div>
      {/* Tabs (button-style toggle pills) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--goa-space-xs)",
          marginBottom: "var(--goa-space-m)",
        }}
      >
        {TABS.map((t, i) => {
          const count = CASES.filter(t.filter).length;
          const active = i === tab;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setTab(i)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--goa-border-radius-m, 4px)",
                cursor: "pointer",
                border: `1px solid ${active ? "var(--goa-color-interactive-default)" : "var(--goa-color-greyscale-200)"}`,
                background: active ? "var(--goa-color-interactive-default)" : "transparent",
                color: active ? "#fff" : "var(--goa-color-text-default)",
                font: "var(--goa-typography-body-s)",
                fontWeight: active ? 700 : 400,
              }}
            >
              {t.heading}
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontSize: "12px",
                  padding: "1px 7px",
                  borderRadius: "999px",
                  background: active ? "rgba(255,255,255,0.25)" : "var(--goa-color-greyscale-100)",
                  color: active ? "#fff" : "var(--goa-color-text-secondary)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--goa-space-s)",
          marginBottom: "var(--goa-space-m)",
        }}
      >
        <FilterChip label="Region: All" />
        <FilterChip label="Assigned to: Anyone" />
        <FilterChip label="Priority: Any" />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <GoabTable striped headers={headers} rows={tableRows} />
      </div>

      {/* Selection action bar (PageFooter pattern) */}
      {selectedIds.length > 0 && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            marginTop: "var(--goa-space-l)",
            display: "flex",
            alignItems: "center",
            gap: "var(--goa-space-m)",
            flexWrap: "wrap",
            padding: "var(--goa-space-s) var(--goa-space-l)",
            background: "var(--goa-color-greyscale-white)",
            border: "1px solid var(--goa-color-greyscale-200)",
            borderRadius: "var(--goa-border-radius-l, 8px)",
            boxShadow: "0 -4px 12px -6px rgba(0,0,0,0.25)",
          }}
        >
          <strong style={{ font: "var(--goa-typography-body-m)" }}>
            {selectedIds.length} selected
          </strong>
          <span style={{ flex: 1 }}></span>
          <GoabButton type="tertiary" size="compact" leadingIcon="person-add">
            Assign
          </GoabButton>
          <GoabButton type="secondary" size="compact" leadingIcon="download">
            Export
          </GoabButton>
          <GoabButton type="tertiary" size="compact" onClick={() => setSelected({})}>
            Clear
          </GoabButton>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "999px",
        cursor: "pointer",
        border: "1px solid var(--goa-color-greyscale-200)",
        background: "var(--goa-color-greyscale-white)",
        color: "var(--goa-color-text-default)",
        font: "var(--goa-typography-body-s)",
      }}
    >
      {label}
      <ion-icon name="chevron-down-outline" style={{ fontSize: "14px", opacity: 0.6 }}></ion-icon>
    </button>
  );
}

export default WorkQueue;
