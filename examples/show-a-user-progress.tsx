import * as React from "react";
import { useState } from "react";
import { GoabProgressIndicator } from "../src/components/feedback/GoabProgressIndicator";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Show a user progress
 * Show percentage progress for a long task
 */
export function ShowAUserProgressExample() {
  const [p, setP] = useState(35);
  return (
    <div>
      <p className="lbl">Show progress during a long operation</p>
      <div style={{ maxWidth: 420, marginBottom: 14 }}>
        <GoabProgressIndicator
          variant="linear"
          progress={p}
          showPercentage
          ariaLabel="Download progress"
        />
      </div>
      <div className="row">
        <GoabButton
          type="secondary"
          size="compact"
          onClick={() => setP((v) => Math.max(0, v - 10))}
        >
          -10%
        </GoabButton>
        <GoabButton
          type="secondary"
          size="compact"
          onClick={() => setP((v) => Math.min(100, v + 10))}
        >
          +10%
        </GoabButton>
      </div>
    </div>
  );
}

export default ShowAUserProgressExample;
