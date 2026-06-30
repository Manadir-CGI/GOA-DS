import * as React from "react";
import { GoabRadioGroup } from "../../components/forms/GoabRadioGroup";
import { GoabRadioItem } from "../../components/forms/GoabRadioGroup";

/** Household-income radio group for the GoA Citizen Service Flow template. */
export interface IncomeRadioProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function IncomeRadio({ value, onChange }: IncomeRadioProps) {
  return (
    <GoabRadioGroup name="income" value={value} onChange={onChange}>
      <GoabRadioItem value="a" text="Under $50,000" />
      <GoabRadioItem
        value="b"
        text="$50,000 – $89,999"
        description="Most families qualify for a partial subsidy"
      />
      <GoabRadioItem value="c" text="$90,000 or more" />
    </GoabRadioGroup>
  );
}

export default IncomeRadio;
