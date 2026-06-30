import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Pagination (goa-pagination).
 * Page navigation with prev/next and numbered pages.
 */

/**
 * Government of Alberta pagination — numbered page navigation with prev/next,
 * collapsing to ellipses for large page counts.
 */
export interface GoabPaginationProps {
  /** Current page (1-based). */
  pageNumber?: number;
  /** Total number of pages. */
  pageCount?: number;
  /** Total number of data items across all pages (used to derive pages with perPageCount). */
  itemCount?: number;
  /** Number of items shown per page. Default 10. */
  perPageCount?: number;
  /** Which nav controls are visible. "all" (default) or "links-only" (prev/next only). */
  variant?: "all" | "links-only";
  onChange?: (page: number) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
.goab-pagination { display: flex; align-items: center; gap: var(--goa-space-2xs); font-family: var(--goa-font-family-sans); }
.goab-pagination__btn {
  min-width: 40px; height: 40px; padding: 0 var(--goa-space-xs);
  display: inline-flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer;
  border-radius: var(--goa-border-radius-m);
  font: var(--goa-typography-body-m);
  color: var(--goa-color-interactive-default);
}
.goab-pagination__btn:hover:not(:disabled):not(.goab-pagination__btn--current) { background: var(--goa-color-greyscale-100); }
.goab-pagination__btn:focus-visible { outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus); outline-offset: 1px; }
.goab-pagination__btn--current { background: var(--goa-color-interactive-default); color: var(--goa-color-greyscale-white); font-weight: var(--goa-font-weight-bold); }
.goab-pagination__btn:disabled { color: var(--goa-color-greyscale-400); cursor: not-allowed; }
.goab-pagination__ellipsis { color: var(--goa-color-text-secondary); padding: 0 var(--goa-space-2xs); }
.goab-pagination__btn ion-icon { font-size: var(--goa-icon-size-m); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "pagination");
  el.textContent = CSS;
  document.head.appendChild(el);
}

function pageList(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export function GoabPagination({
  pageNumber = 1,
  pageCount,
  perPageCount = 10,
  itemCount,
  variant = "all",
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabPaginationProps) {
  useStyles();
  const total =
    pageCount != null
      ? pageCount
      : itemCount != null
        ? Math.max(1, Math.ceil(itemCount / perPageCount))
        : 1;
  const go = (n: number) => {
    if (n >= 1 && n <= total && n !== pageNumber) onChange && onChange(n);
  };
  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);
  return (
    <nav
      className="goab-pagination"
      aria-label="Pagination"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <button
        className="goab-pagination__btn"
        disabled={pageNumber <= 1}
        onClick={() => go(pageNumber - 1)}
        aria-label="Previous"
      >
        <ion-icon name="chevron-back"></ion-icon>
      </button>
      {variant !== "links-only" &&
        pageList(pageNumber, total).map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="goab-pagination__ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`goab-pagination__btn${p === pageNumber ? " goab-pagination__btn--current" : ""}`}
              aria-current={p === pageNumber ? "page" : undefined}
              onClick={() => go(p as number)}
            >
              {p}
            </button>
          )
        )}
      <button
        className="goab-pagination__btn"
        disabled={pageNumber >= total}
        onClick={() => go(pageNumber + 1)}
        aria-label="Next"
      >
        <ion-icon name="chevron-forward"></ion-icon>
      </button>
    </nav>
  );
}

export default GoabPagination;
