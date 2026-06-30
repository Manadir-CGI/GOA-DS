import * as React from "react";
import { useState } from "react";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Copy to clipboard
 * Copy text or data with a single click
 */
export function CopyToClipboardExample() {
  const [done, setDone] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText("IS-2026-77310");
    } catch (e) {}
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <div>
      <p className="lbl">Copy text to the clipboard</p>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid var(--goa-color-greyscale-200)",
          borderRadius: 6,
          padding: "8px 14px",
        }}
      >
        <span
          style={{ font: "var(--goa-typography-body-s)", color: "var(--goa-color-text-secondary)" }}
        >
          Reference
        </span>
        <span style={{ font: "var(--goa-typography-heading-s)", whiteSpace: "nowrap" }}>
          IS-2026-77310
        </span>
        <GoabButton
          type="tertiary"
          size="compact"
          leadingIcon={done ? "checkmark" : "copy-outline"}
          onClick={copy}
        >
          {done ? "Copied" : "Copy"}
        </GoabButton>
      </div>
    </div>
  );
}

export default CopyToClipboardExample;
