import clsx from "clsx";
import { ComponentProps, useId } from "react";
import styles from "./styles.module.scss";

import { Checkbox } from "../../atoms/Checkbox/index.js";
import { Radio } from "../../atoms/Radio/index.js";
import { DescriptionMessage } from "../../atoms/DescriptionMessage/index.js";

/** 나머지 props는 input에 전달된다. */
export interface ChoiceFieldProps extends Omit<
  ComponentProps<"input">,
  "type" | "className" | "style"
> {
  type: "checkbox" | "radio";
  label?: string;
  description?: string;
  /** 체크박스에서만 쓰인다. */
  indeterminate?: boolean;
}

const INPUT_COMPONENT = { checkbox: Checkbox, radio: Radio };

export const ChoiceField = ({
  type,
  label,
  description,
  indeterminate,
  id,
  "aria-describedby": describedBy,
  ...props
}: ChoiceFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = `${inputId}-description`;
  const InputComponent = INPUT_COMPONENT[type];

  return (
    <div className={styles.module}>
      <InputComponent
        {...props}
        id={inputId}
        indeterminate={(type === "checkbox" && indeterminate) || undefined}
        aria-describedby={
          clsx(describedBy, description && descriptionId) || undefined
        }
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
