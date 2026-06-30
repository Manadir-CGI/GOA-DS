import * as React from "react";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Button with Icon
 * Add leading or trailing icons to buttons
 */
export function ButtonWithIconExample() {
  return (
    <div>
      <p className="lbl">Leading and trailing icons on buttons</p>
      <div className="row" style={{ marginBottom: 14 }}>
        <GoabButton type="primary" leadingIcon="add">
          Add item
        </GoabButton>
        <GoabButton type="secondary" trailingIcon="arrow-forward">
          Continue
        </GoabButton>
        <GoabButton type="tertiary" leadingIcon="download">
          Download
        </GoabButton>
      </div>
      <div className="row">
        <GoabButton type="primary" size="compact" leadingIcon="save">
          Save
        </GoabButton>
        <GoabButton type="secondary" size="compact" trailingIcon="open-outline">
          Open
        </GoabButton>
        <GoabButton type="primary" variant="destructive" leadingIcon="trash">
          Delete
        </GoabButton>
      </div>
    </div>
  );
}

export default ButtonWithIconExample;
