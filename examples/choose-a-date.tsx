import * as React from "react";
import { useState } from "react";
import { GoabBlock } from "../src/components/layout/GoabBlock";
import { GoabFormItem } from "../src/components/forms/GoabFormItem";
import { GoabDatePicker } from "../src/components/forms/GoabDatePicker";
import { GoabButton } from "../src/components/core/GoabButton";

/**
 * Choose a date
 * Date picker with a Today shortcut
 */
export function ChooseADateExample() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const setToday = () => {
    const d = new Date();
    d.setDate(d.getDate());
    setDate(d);
  };
  return (
    <GoabBlock gap="s" alignment="end">
      <GoabFormItem label="Select a date">
        <GoabDatePicker name="item" value={date} onChange={(d) => setDate(d)} />
      </GoabFormItem>
      <GoabButton type="tertiary" onClick={setToday} mr="l">
        Today
      </GoabButton>
    </GoabBlock>
  );
}

export default ChooseADateExample;
