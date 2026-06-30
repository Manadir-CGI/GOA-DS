import * as React from "react";
import { useState } from "react";
import { GoabMicrositeHeader } from "../src/components/navigation/GoabMicrositeHeader";

/**
 * Link the user to give feedback to the service
 * Collect feedback via the microsite header
 */
export function LinkTheUserToGiveFeedbackToTheServiceExample() {
  const [n, setN] = useState(0);
  return (
    <div style={{ margin: -28 }}>
      <GoabMicrositeHeader
        type="beta"
        feedbackHref="#"
        feedbackText="Give feedback"
        onFeedback={() => setN((x) => x + 1)}
      />
      <div style={{ padding: 28 }}>
        <p className="lbl">Link users to give feedback during alpha / beta</p>
        <p className="muted" style={{ margin: 0 }}>
          Feedback link clicked {n} time{n === 1 ? "" : "s"}.
        </p>
      </div>
    </div>
  );
}

export default LinkTheUserToGiveFeedbackToTheServiceExample;
