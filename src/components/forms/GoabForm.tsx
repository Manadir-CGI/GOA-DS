import React from "react";

export type GoabPublicFormStatus = "initializing" | "complete";
/**
 * Government of Alberta form — a semantic <form> that stacks its form items
 * with consistent vertical rhythm and intercepts submit.
 */
export interface GoabFormProps {
  /** Vertical gap between items (spacing token or CSS length). Default "l". */
  gap?: string;
  /** Called on submit with preventDefault already applied. */
  onSubmit?: (e: React.FormEvent) => void;
  /** A name identifier for the form (useful for debugging multiple forms). */
  name?: string;
  /** Initialization status. "initializing" while loading, "complete" (default) when ready. */
  status?: GoabPublicFormStatus;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

/**
 * Government of Alberta — Form (goa-form).
 * A semantic <form> that stacks its form items with consistent vertical
 * rhythm and handles submit. Wrap GoabFormItem children inside it.
 */
const SCALE = ["none", "3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl"];
function space(v?: string): string | undefined {
  return v != null && SCALE.includes(v) ? `var(--goa-space-${v})` : v;
}

export function GoabForm({
  gap = "l",
  onSubmit,
  name,
  status = "complete",
  mt,
  mr,
  mb,
  ml,
  testId,
  children,
  style,
  ...rest
}: GoabFormProps) {
  const s: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: space(gap),
    marginTop: space(mt),
    marginRight: space(mr),
    marginBottom: space(mb),
    marginLeft: space(ml),
    ...style,
  };
  return (
    <form
      name={name}
      aria-busy={status === "initializing" ? true : undefined}
      style={s}
      onSubmit={(e) => {
        if (onSubmit) {
          e.preventDefault();
          onSubmit(e);
        }
      }}
      data-testid={testId}
      {...(rest as React.FormHTMLAttributes<HTMLFormElement>)}
    >
      {children}
    </form>
  );
}

export default GoabForm;
