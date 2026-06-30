import * as React from "react";
import { GoabRadioGroup, GoabRadioItem } from "../../components/forms/GoabRadioGroup";

/* Generic radio field (see question-page/RadioField.jsx). */

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
