import * as React from "react";
import { GoabButtonGroup } from "../src/components/core/GoabButtonGroup";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Compact button group
 * Centered group of compact buttons
 */
const onClick = () => console.log("clicked");

export function CompactButtonGroupExample() {
  return (
    <GoabButtonGroup alignment="center">
      <GoabButton onClick={onClick} size="compact" type="primary">
        Button
      </GoabButton>
      <GoabButton onClick={onClick} size="compact" type="secondary">
        Button
      </GoabButton>
      <GoabButton onClick={onClick} size="compact" type="tertiary">
        Button
      </GoabButton>
    </GoabButtonGroup>
  );
}

export default CompactButtonGroupExample;
