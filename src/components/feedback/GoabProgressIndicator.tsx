import React from "react";
import type { Spacing } from "../shared";
import { space } from "../shared";

/**
 * Government of Alberta — Progress indicator (goa-circular-progress /
 * goa-linear-progress). Circular spinner/ring or a horizontal bar. Omit
 * `progress` for an indeterminate (looping) state; pass 0–100 for a
 * determinate one.
 */

/**
 * Government of Alberta progress indicator — a circular spinner/ring or a
 * horizontal bar. Omit `progress` for an indeterminate (looping) state while
 * something is loading; pass 0–100 for a determinate one (e.g. an upload or a
 * multi-step task).
 */
export interface GoabProgressIndicatorProps {
  variant?: "circular" | "linear";
  /** 0–100. Omit for an indeterminate animation. */
  progress?: number;
  /** Circular size only. */
  size?: "small" | "large";
  /** Caption under a circular indicator, e.g. "Submitting your application…". */
  message?: React.ReactNode;
  /** Linear only — show the rounded percentage at the end of the bar. */
  showPercentage?: boolean;
  /** Linear only — controls visibility of the percentage text. Default "visible". */
  percentVisibility?: "visible" | "hidden";
  /** Controls visibility of the indicator (allowing a fade). Default true. */
  visible?: boolean;
  /** Accessible label for the progressbar role. */
  ariaLabel?: string;
  /** id of the element that labels this progress bar (linear). */
  ariaLabelledBy?: string;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: Spacing;
  mr?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

const CSS = `
@keyframes goab-spin { to { transform: rotate(360deg); } }
@keyframes goab-linear-indeterminate {
  0% { left: -40%; width: 40%; }
  60% { left: 100%; width: 40%; }
  100% { left: 100%; width: 40%; }
}
.goab-progress { font-family: var(--goa-font-family-sans); display: flex; flex-direction: column; align-items: center; gap: var(--goa-space-s); }
.goab-progress__ring { display: block; }
.goab-progress__ring--spin { animation: goab-spin 1s linear infinite; }
.goab-progress__ring-track { stroke: var(--goa-color-greyscale-200); }
.goab-progress__ring-fill { stroke: var(--goa-color-interactive-default); stroke-linecap: round; transition: stroke-dashoffset .3s ease; }
.goab-progress__msg { font: var(--goa-circular-progress-small-text); color: var(--goa-color-text-secondary); }
.goab-progress__msg--large { font: var(--goa-circular-progress-large-text); }

.goab-linear { font-family: var(--goa-font-family-sans); display: flex; align-items: center; gap: var(--goa-linear-progress-percentage-gap); width: 100%; }
.goab-linear__track {
  position: relative; flex: 1; overflow: hidden;
  height: var(--goa-linear-progress-height);
  background: var(--goa-linear-progress-color-track);
  border-radius: var(--goa-linear-progress-border-radius);
}
.goab-linear__fill {
  position: absolute; top: 0; bottom: 0; left: 0;
  background: var(--goa-linear-progress-color-indicator);
  border-radius: var(--goa-linear-progress-border-radius);
  transition: width .3s ease;
}
.goab-linear__fill--indeterminate { animation: goab-linear-indeterminate 1.4s cubic-bezier(0.65, 0.15, 0.35, 0.85) infinite; }
.goab-linear__pct {
  flex: 0 0 auto; min-width: var(--goa-linear-progress-percentage-width); text-align: right;
  font: var(--goa-linear-progress-percentage-text);
  color: var(--goa-linear-progress-percentage-color);
  font-family: var(--goa-font-family-mono);
}
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "progress");
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function GoabProgressIndicator({
  variant = "circular",
  progress,
  size = "small",
  message,
  showPercentage = false,
  percentVisibility,
  visible = true,
  ariaLabel = "Loading",
  ariaLabelledBy,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabProgressIndicatorProps) {
  useStyles();
  if (!visible) return null;
  const determinate = typeof progress === "number";
  const pct = determinate ? Math.max(0, Math.min(100, progress as number)) : 0;
  const showPct = percentVisibility != null ? percentVisibility === "visible" : showPercentage;
  const m: React.CSSProperties = {};
  if (mt != null) m.marginTop = space(mt);
  if (mr != null) m.marginRight = space(mr);
  if (mb != null) m.marginBottom = space(mb);
  if (ml != null) m.marginLeft = space(ml);
  const mStyle = Object.keys(m).length ? m : undefined;

  if (variant === "linear") {
    return (
      <div
        className="goab-linear"
        role="progressbar"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        style={mStyle}
        data-testid={testId}
        aria-valuenow={determinate ? pct : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="goab-linear__track">
          {determinate ? (
            <div className="goab-linear__fill" style={{ width: pct + "%" }} />
          ) : (
            <div className="goab-linear__fill goab-linear__fill--indeterminate" />
          )}
        </div>
        {showPct && determinate && <span className="goab-linear__pct">{Math.round(pct)}%</span>}
      </div>
    );
  }

  const dim = size === "large" ? 96 : 56;
  const stroke = size === "large" ? 8 : 6;
  const r = (dim - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = determinate ? circ * (1 - pct / 100) : circ * 0.25;

  return (
    <div
      className="goab-progress"
      role="progressbar"
      aria-label={ariaLabel}
      style={mStyle}
      data-testid={testId}
      aria-valuenow={determinate ? pct : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        className={`goab-progress__ring${determinate ? "" : " goab-progress__ring--spin"}`}
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
      >
        <circle
          className="goab-progress__ring-track"
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="goab-progress__ring-fill"
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
        />
      </svg>
      {message && (
        <span
          className={`goab-progress__msg${size === "large" ? " goab-progress__msg--large" : ""}`}
        >
          {message}
        </span>
      )}
    </div>
  );
}

/**
 * Convenience aliases matching the GoA component names. Circular progress
 * indicator and linear progress indicator are the two named entries on the
 * design system site; both delegate to GoabProgressIndicator.
 */
export function GoabCircularProgress(props: GoabProgressIndicatorProps) {
  return <GoabProgressIndicator {...props} variant="circular" />;
}
export function GoabLinearProgress(props: GoabProgressIndicatorProps) {
  return <GoabProgressIndicator {...props} variant="linear" />;
}

export default GoabProgressIndicator;
