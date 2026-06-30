import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Skeleton (goa-skeleton).
 * Animated loading placeholder used while content is fetching.
 */

/**
 * Government of Alberta skeleton — an animated placeholder shown while content
 * loads. Use text (with line count), rect or circle variants.
 */
export interface GoabSkeletonProps {
  variant?: "text" | "rect" | "circle";
  /** Skeleton shape to represent your content (alias of `variant`). */
  type?: string;
  width?: string;
  height?: string;
  /** Maximum width. Default "300px" in card skeletons. */
  maxWidth?: string;
  /** Size affecting height/width for different shapes. */
  size?: string | number;
  /** For variant="text": number of lines (last line is shortened). */
  lines?: number;
  /** Number of lines for multi-line skeletons (alias of `lines`). */
  lineCount?: number;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  style?: React.CSSProperties;
}

const CSS = `
@keyframes goab-skeleton-pulse { 0% { opacity: 1; } 50% { opacity: .55; } 100% { opacity: 1; } }
.goab-skeleton {
  background: var(--goa-skeleton-loading-color-bg);
  border-radius: var(--goa-border-radius-s);
  animation: goab-skeleton-pulse 1.4s ease-in-out infinite;
}
.goab-skeleton--text { height: 0.9em; border-radius: var(--goa-border-radius-xs); }
.goab-skeleton--circle { border-radius: 50%; }
@media (prefers-reduced-motion: reduce) { .goab-skeleton { animation: none; } }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "skeleton");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabSkeleton({
  variant,
  type,
  width = "100%",
  height,
  lines,
  lineCount,
  size,
  maxWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  style,
}: GoabSkeletonProps) {
  useStyles();
  const v = variant || type || "text";
  const n = lines ?? lineCount ?? 1;
  const m: React.CSSProperties = {};
  if (maxWidth != null) m.maxWidth = maxWidth;
  if (mt != null) m.marginTop = space(mt);
  if (mr != null) m.marginRight = space(mr);
  if (mb != null) m.marginBottom = space(mb);
  if (ml != null) m.marginLeft = space(ml);
  if (v === "text" && n > 1) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--goa-space-xs)",
          ...m,
          ...style,
        }}
        data-testid={testId}
      >
        {Array.from({ length: n }).map((_, i) => (
          <span
            key={i}
            className="goab-skeleton goab-skeleton--text"
            style={{ width: i === n - 1 ? "70%" : width }}
          ></span>
        ))}
      </div>
    );
  }
  return (
    <span
      className={`goab-skeleton goab-skeleton--${v}`}
      style={{
        display: "block",
        width,
        height: height || (v === "circle" ? width : "1.2em"),
        ...m,
        ...style,
      }}
      data-testid={testId}
    ></span>
  );
}

export default GoabSkeleton;
