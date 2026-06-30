import React, { useState } from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Data grid (goa-data-grid).
 * An advanced table: sortable column headers, optional row-selection
 * checkboxes (with a select-all) and zebra-free GoA table styling. For a
 * plain static table use GoabTable.
 */

export interface GoabDataGridColumn {
  /** Key into each row object; also the sort key. */
  id: string;
  header: React.ReactNode;
  /** Right-align + tabular numerals. */
  numeric?: boolean;
  /** Disable sorting for this column. */
  sortable?: boolean;
  /** Custom cell renderer. */
  render?: (value: any, row: any) => React.ReactNode;
}
/**
 * Government of Alberta data grid — an advanced table with sortable headers
 * and optional row selection. For a plain static table use GoabTable.
 */
export interface GoabDataGridProps {
  columns: GoabDataGridColumn[];
  data: any[];
  /** Show a checkbox column with select-all. */
  selectable?: boolean;
  /** Controlled selected row keys. */
  selected?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  /** Field used as the unique row key. Default "id". */
  rowKey?: string;
  /** Initial sort, e.g. { id: "date", dir: "desc" }. */
  defaultSort?: { id: string; dir: "asc" | "desc" } | null;
  /** Keyboard navigation mode. "table" (cell-by-cell) or "layout". */
  keyboardNav?: "layout" | "table";
  /** Position of the keyboard-nav indicator icon. Default "left". */
  keyboardIconPosition?: "left" | "right";
  /** Visibility of the keyboard-nav indicator icon. Default "visible". */
  keyboardIconVisibility?: "visible" | "hidden";
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
.goab-datagrid { width: 100%; border-collapse: collapse; font-family: var(--goa-font-family-sans); font: var(--goa-typography-body-m); }
.goab-datagrid thead th {
  text-align: left; color: var(--goa-table-color-heading, var(--goa-color-greyscale-600));
  font: var(--goa-font-weight-bold) var(--goa-font-size-3, 16px)/1.4 var(--goa-font-family-sans);
  height: var(--goa-table-height-heading, 56px);
  padding: 0 var(--goa-space-m);
  border-bottom: var(--goa-border-width-s, 2px) solid var(--goa-color-greyscale-200);
  white-space: nowrap;
}
.goab-datagrid thead th.goab-datagrid__sortable { cursor: pointer; user-select: none; }
.goab-datagrid__sortbtn { display: inline-flex; align-items: center; gap: var(--goa-space-3xs); background: none; border: none; cursor: pointer; font: inherit; color: inherit; padding: 0; }
.goab-datagrid__sortbtn ion-icon { font-size: var(--goa-icon-size-s); color: var(--goa-color-greyscale-500); }
.goab-datagrid__sortbtn--active ion-icon { color: var(--goa-color-interactive-default); }
.goab-datagrid tbody td { padding: var(--goa-space-s) var(--goa-space-m); border-bottom: var(--goa-border-width-2xs, 1px) solid var(--goa-color-greyscale-200); color: var(--goa-color-text-default); }
.goab-datagrid tbody tr:hover { background: var(--goa-color-greyscale-100); }
.goab-datagrid tbody tr[aria-selected="true"] { background: var(--goa-color-info-background, #e0f0ff); }
.goab-datagrid__check { width: 1px; white-space: nowrap; }
.goab-datagrid__check input { width: 20px; height: 20px; accent-color: var(--goa-color-interactive-default); cursor: pointer; }
.goab-datagrid__num { text-align: right; font-family: var(--goa-font-family-mono); font-variant-numeric: tabular-nums; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "datagrid");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabDataGrid({
  columns = [],
  data = [],
  selectable = false,
  selected,
  onSelectionChange,
  rowKey = "id",
  defaultSort,
  keyboardNav,
  keyboardIconPosition = "left",
  keyboardIconVisibility = "visible",
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabDataGridProps) {
  useStyles();
  const [sort, setSort] = useState(defaultSort || null);
  const isSelControlled = selected !== undefined;
  const [internalSel, setInternalSel] = useState<(string | number)[]>([]);
  const sel = isSelControlled ? selected : internalSel;

  function keyOf(row: any, i: number) {
    return row[rowKey] != null ? row[rowKey] : i;
  }

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.id === sort.id);
    if (!col || col.sortable === false) return data;
    const dir = sort.dir === "desc" ? -1 : 1;
    return [...data].sort((a, b) => {
      const av = a[sort.id],
        bv = b[sort.id];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [data, sort, columns]);

  function toggleSort(col: GoabDataGridColumn) {
    if (col.sortable === false) return;
    setSort((s) => {
      if (!s || s.id !== col.id) return { id: col.id, dir: "asc" };
      if (s.dir === "asc") return { id: col.id, dir: "desc" };
      return null;
    });
  }

  function setSelection(next: (string | number)[]) {
    if (!isSelControlled) setInternalSel(next);
    onSelectionChange && onSelectionChange(next);
  }
  const allKeys = sorted.map(keyOf);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => sel.includes(k));
  function toggleAll() {
    setSelection(allSelected ? [] : allKeys);
  }
  function toggleRow(k: string | number) {
    setSelection(sel.includes(k) ? sel.filter((x) => x !== k) : [...sel, k]);
  }

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <table
      className="goab-datagrid"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <thead>
        <tr>
          {selectable && (
            <th className="goab-datagrid__check">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>
          )}
          {columns.map((col) => {
            const active = sort && sort.id === col.id;
            const sortable = col.sortable !== false;
            return (
              <th
                key={col.id}
                className={sortable ? "goab-datagrid__sortable" : ""}
                style={col.numeric ? { textAlign: "right" } : undefined}
                onClick={() => sortable && toggleSort(col)}
              >
                {sortable ? (
                  <span
                    className={`goab-datagrid__sortbtn${active ? " goab-datagrid__sortbtn--active" : ""}`}
                  >
                    {col.header}
                    <ion-icon
                      name={
                        active ? (sort!.dir === "asc" ? "arrow-up" : "arrow-down") : "swap-vertical"
                      }
                    ></ion-icon>
                  </span>
                ) : (
                  col.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => {
          const k = keyOf(row, i);
          const isSel = sel.includes(k);
          return (
            <tr key={k} aria-selected={selectable ? isSel : undefined}>
              {selectable && (
                <td className="goab-datagrid__check">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${i + 1}`}
                    checked={isSel}
                    onChange={() => toggleRow(k)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.id} className={col.numeric ? "goab-datagrid__num" : undefined}>
                  {col.render ? col.render(row[col.id], row) : row[col.id]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default GoabDataGrid;
