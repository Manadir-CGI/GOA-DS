import * as React from "react";
import { GoabLink } from "../src/components/core/GoabLink";

/**
 * Link to an external page
 * Indicate links that open another website
 */
export function LinkToAnExternalPageExample() {
  return (
    <div>
      <p className="lbl">Show when a link opens an external site</p>
      <div className="stack" style={{ gap: 10 }}>
        <GoabLink href="#" trailingIcon="open-outline" onClick={(e) => e.preventDefault()}>
          Read the program guide on Canada.ca
        </GoabLink>
        <GoabLink href="#" trailingIcon="open-outline" onClick={(e) => e.preventDefault()}>
          Canada Revenue Agency - My Account
        </GoabLink>
      </div>
    </div>
  );
}

export default LinkToAnExternalPageExample;
