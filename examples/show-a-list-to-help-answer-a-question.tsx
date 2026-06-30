import * as React from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabRadioGroup, GoabRadioItem } from "../src/components/forms/GoabRadioGroup";
import { GoabDetails } from "../src/components/layout/GoabDetails";

/**
 * Show a list to help answer a question
 * Use an expandable details to guide an answer
 */
export function ShowAListToHelpAnswerAQuestionExample() {
  return (
    <div>
      <p className="lbl">Show a list to help answer a question</p>
      <div style={{ maxWidth: 480 }}>
        <GoabFormItem label="Do you have a qualifying disability?">
          <GoabRadioGroup name="dis" defaultValue="">
            <GoabRadioItem value="y" text="Yes" />
            <GoabRadioItem value="n" text="No" />
            <GoabRadioItem value="u" text="I am not sure" />
          </GoabRadioGroup>
        </GoabFormItem>
        <div style={{ marginTop: 12 }}>
          <GoabDetails heading="What counts as a qualifying disability?">
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>A condition expected to last 12 months or more</li>
              <li>A condition that limits daily activities</li>
              <li>A condition certified by a health professional</li>
            </ul>
          </GoabDetails>
        </div>
      </div>
    </div>
  );
}

export default ShowAListToHelpAnswerAQuestionExample;
