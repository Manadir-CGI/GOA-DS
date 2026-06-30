import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Table (goa-table).
 * Rounded, hairline-bordered data table with a grey header row,
 * optional zebra striping and right-aligned numeric columns.
 */

export type GoabTableSortMode = "single" | "multi";
export type GoabTableVariant = "normal" | "relaxed";

export interface GoabTableColumn {
  label: string;
  /** Right-align and tabular-nums this column. */
  numeric?: boolean;
}

/**
 * Government of Alberta data table — rounded, hairline-bordered table with a
 * grey header, optional zebra striping and numeric columns.
 */
export interface GoabTableProps {
  /** Column definitions (string or {label, numeric}). */
  headers?: (string | GoabTableColumn)[];
  /** Row data as a 2-D array (cells may be nodes, e.g. a badge). Ignored if children given. */
  rows?: React.ReactNode[][];
  striped?: boolean;
  /** Sort mode. "single" allows one sorted column, "multi" allows several. Default "single". */
  sortMode?: GoabTableSortMode;
  /** A relaxed variant with more vertical padding. Default "normal". */
  variant?: GoabTableVariant;
  /** Width of the table (CSS length). By default it fits its content. */
  width?: string;
  /** Provide your own <tr> rows instead of `rows`. */
  children?: React.ReactNode;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
.goab-table { border: var(--goa-table-container-border); border-radius: var(--goa-table-border-radius-container); overflow: hidden; background: var(--goa-color-greyscale-white); }
.goab-table table { border-collapse: separate; border-spacing: 0; width: 100%; font-family: var(--goa-font-family-sans); }
.goab-table thead th {
  background: var(--goa-table-color-bg-heading);
  color: var(--goa-table-color-heading);
  font: var(--goa-table-typography-heading);
  font-weight: var(--goa-font-weight-bold);
  text-align: left; vertical-align: bottom;
  padding: var(--goa-table-padding-heading);
  border-bottom: var(--goa-table-heading-border);
}
.goab-table thead th:first-child { padding-left: var(--goa-space-l); }
.goab-table thead th:last-child { padding-right: var(--goa-space-l); }
.goab-table td {
  font: var(--goa-typography-body-m);
  padding: var(--goa-table-padding-data);
  border-bottom: var(--goa-table-data-border);
  vertical-align: top; color: var(--goa-color-text-default);
}
.goab-table td:first-child { padding-left: var(--goa-space-l); }
.goab-table td:last-child { padding-right: var(--goa-space-l); }
.goab-table tbody tr:last-child td { border-bottom: none; }
.goab-table--striped tbody tr:nth-child(even) td { background: var(--goa-color-greyscale-50); }
.goab-table--relaxed thead th, .goab-table--relaxed td { padding-top: var(--goa-space-m); padding-bottom: var(--goa-space-m); }
.goab-table .goab-table--numeric { text-align: right; font-variant-numeric: tabular-nums; }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "table");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabTable({
  headers = [],
  rows = [],
  striped = false,
  variant = "normal",
  width,
  sortMode = "single",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
}: GoabTableProps) {
  useStyles();
  const cols = headers.map((h) => (typeof h === "string" ? { label: h } : h));
  const rootStyle: React.CSSProperties = {};
  if (width != null) rootStyle.width = width;
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <div
      className={`goab-table${striped ? " goab-table--striped" : ""}${variant === "relaxed" ? " goab-table--relaxed" : ""}`}
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <table>
        {cols.length > 0 && (
          <thead>
            <tr>
              {cols.map((c, i) => (
                <th key={i} className={c.numeric ? "goab-table--numeric" : ""}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {children
            ? children
            : rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cols[ci] && cols[ci].numeric ? "goab-table--numeric" : ""}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default GoabTable;
