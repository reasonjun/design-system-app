import { ChangeEvent, useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Checkbox } from "../../atoms/Checkbox";
import { Radio } from "../../atoms/Radio";
import { DescriptionMessage } from "../../atoms/DescriptionMessage";

export interface ChoiceFieldProps {
  type: "checkbox" | "radio";
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean; // checkbox only
  id?: string;
  name?: string;
  checked?: boolean;
  value?: string | number;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

export const ChoiceField = ({
  type,
  label,
  description,
  disabled,
  indeterminate,
  id,
  name,
  checked,
  value,
  onChange,
  ...props
}: ChoiceFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const InputComponent = type === "checkbox" ? Checkbox : Radio;

  return (
    <div className={clsx(styles.module)}>
      <InputComponent
        id={inputId}
        label={label}
        disabled={disabled}
        indeterminate={type === "checkbox" ? indeterminate : undefined}
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      />
      <div>
        <label htmlFor={inputId} className={styles["label"]}>
          {label}
        </label>
        {description && (
          <DescriptionMessage id={descriptionId} className={styles.description}>
            {description}
          </DescriptionMessage>
        )}
      </div>
    </div>
  );
};
