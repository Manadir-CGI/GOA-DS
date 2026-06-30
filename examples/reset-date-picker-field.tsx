import * as React from "react";
import { useState } from "react";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDatePicker } from "../src/components/forms/GoabDatePicker";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Reset date picker field
 * Programmatically set or clear a date
 */
export function ResetDatePickerFieldExample() {
  const [d, setD] = useState<Date | undefined>(new Date(2026, 5, 1));
  const [k, setK] = useState(0);
  return (
    <div>
      <p className="lbl">Programmatically set or clear a date picker</p>
      <GoabFormItem label="Appointment date">
        <GoabDatePicker key={k} defaultValue={d} onChange={setD} />
      </GoabFormItem>
      <div className="row" style={{ marginTop: 14 }}>
        <GoabButton
          type="secondary"
          size="compact"
          onClick={() => {
            setD(new Date());
            setK((x) => x + 1);
          }}
        >
          Set to today
        </GoabButton>
        <GoabButton
          type="tertiary"
          size="compact"
          onClick={() => {
            setD(undefined);
            setK((x) => x + 1);
          }}
        >
          Clear
        </GoabButton>
      </div>
    </div>
  );
}

export default ResetDatePickerFieldExample;
