/** Shared margin-spacing token scale used by the `mt`/`mr`/`mb`/`ml` props on every GoA component. */
export type Spacing =
  "none" | "3xs" | "2xs" | "xs" | "s" | "m" | "l" | "xl" | "2xl" | "3xl" | "4xl";

/** Resolves a margin Spacing token to a CSS value (or "0" for "none"); undefined when unset. */
export const space = (v?: Spacing | null): string | undefined =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;
