import * as React from "react";
import { GoabRadioGroup, GoabRadioItem } from "../../components/forms/GoabRadioGroup";

/** A single selectable option rendered as a GoabRadioItem. */
export interface RadioFieldOption {
  value: string;
  text?: string;
  description?: string;
}

export interface RadioFieldProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: RadioFieldOption[];
}

/**
 * Generic radio field for GoA templates. GoabRadioGroup/GoabRadioItem talk via
 * React context, so they must mount in one tree — this wrapper lets a page
 * drive a radio group from a single component with an `options` array.
 */
export function RadioField({ name, value, onChange, options }: RadioFieldProps) {
  return (
    <GoabRadioGroup name={name} value={value} onChange={onChange}>
      {(options || []).map((o) => (
        <GoabRadioItem key={o.value} value={o.value} text={o.text} description={o.description} />
      ))}
    </GoabRadioGroup>
  );
}

export default RadioField;
