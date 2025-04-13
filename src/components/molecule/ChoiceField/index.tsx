import { useId } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

import { Checkbox } from "../../atoms/Checkbox";
import { Radio } from "../../atoms/Radio";

export interface ChoiceFieldProps {
  type: "checkbox" | "radio";
  label: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean; // checkbox only
  id?: string;
}

export const ChoiceField = ({
  type,
  label,
  description,
  disabled,
  indeterminate,
  id,
  ...props
}: ChoiceFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const InputComponent = type === "checkbox" ? Checkbox : Radio;

  return (
    <div className={clsx(styles.module)}>
      <InputComponent
        id={inputId}
        label={label}
        disabled={disabled}
        indeterminate={type === "checkbox" ? indeterminate : undefined}
        {...props}
      />
      <div>
        <label htmlFor={inputId} className={styles["label"]}>
          {label}
        </label>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};
