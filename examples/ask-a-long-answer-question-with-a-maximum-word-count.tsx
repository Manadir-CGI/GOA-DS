import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabTextarea } from "../src/components/forms/GoabTextarea";

/**
 * Ask a long answer question with a maximum word count
 * Limit a long answer to a maximum number of words
 */
export function AskALongAnswerQuestionWithAMaximumWordCountExample() {
  const [v, setV] = useState("");
  const words = v.trim() ? v.trim().split(/\s+/).length : 0;
  const max = 50;
  const over = words > max;
  return (
    <div>
      <p className="lbl">Long answer with a maximum word count</p>
      <GoabFormItem
        label="Why are you appealing this decision?"
        helpText={"Use up to " + max + " words."}
      >
        <GoabTextarea
          rows={4}
          value={v}
          onChange={setV}
          error={over}
          placeholder="Type your answer..."
        />
      </GoabFormItem>
      <p
        className="muted"
        style={{
          color: over
            ? "var(--goa-color-emergency-default, #c8102e)"
            : "var(--goa-color-text-secondary)",
        }}
      >
        {over ? words - max + " words over the limit" : max - words + " words remaining"}
      </p>
    </div>
  );
}

export default AskALongAnswerQuestionWithAMaximumWordCountExample;
