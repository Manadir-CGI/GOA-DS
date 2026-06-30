import * as React from "react";
import { GoabMicrositeHeader } from "../src/components/navigation/GoabMicrositeHeader";

/**
 * Show version number
 * Show a version label in the microsite header
 */
export function ShowVersionNumberExample() {
  return (
    <div style={{ margin: -28 }}>
      <GoabMicrositeHeader type="beta" version="v2.1.0" feedbackHref="#" />
      <div style={{ padding: 28 }}>
        <p className="lbl" style={{ margin: 0 }}>
          Show a version number in the microsite header
        </p>
      </div>
    </div>
  );
}

export default ShowVersionNumberExample;
