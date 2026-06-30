import * as React from "react";
import { GoabProgressIndicator } from "../src/components/feedback/GoabProgressIndicator";

/**
 * Show a user progress when the time is unknown
 * Indeterminate progress for unknown durations
 */
export function ShowAUserProgressWhenTheTimeIsUnknownExample() {
  return (
    <div>
      <p className="lbl">Indeterminate progress when time is unknown</p>
      <GoabProgressIndicator
        variant="circular"
        message="Searching records. This may take a moment..."
      />
    </div>
  );
}

export default ShowAUserProgressWhenTheTimeIsUnknownExample;
