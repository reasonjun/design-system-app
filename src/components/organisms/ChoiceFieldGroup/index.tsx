import { useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { DescriptionMessage } from "../../atoms/DescriptionMessage/index.js";
import { ErrorMessage } from "../../atoms/ErrorMessage/index.js";
import { ChoiceField, ChoiceFieldProps } from "../../molecule/ChoiceField/index.js";

import { useChoiceFieldState } from "./hooks/useChoiceFieldState.js";

export interface ChoiceFieldGroupOption extends Omit<ChoiceFieldProps, "type"> {
  value: string;
  children?: ChoiceFieldGroupOption[];
}

export interface ChoiceFieldGroupProps {
  type: "checkbox" | "radio";
  name: string;
  label?: string;
  description?: string;
  options: ChoiceFieldGroupOption[];
  /**
   * checkbox: 선택된 리프 옵션 값만 담는다.
   * 부모 값은 무시되며, 부모 상태는 자식으로부터 계산된다.
   */
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

const ChoiceOptionList = ({
  options,
  type,
  name,
  disabled,
  onChange,
}: {
  options: ChoiceFieldGroupOption[];
  type: "checkbox" | "radio";
  name: string;
  disabled?: boolean;
  onChange: (option: ChoiceFieldGroupOption) => void;
}) => {
  const renderOption = (
    option: ChoiceFieldGroupOption,
    index: number,
    level = 0,
  ) => {
    const childOptionsStyle = {
      paddingLeft: "24px",
      marginTop: "8px",
    };

    return (
      <div
        key={`${name}-${level}-${index}-${option.value}`}
        className={styles.optionGroup}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <ChoiceField
          type={type}
          label={option.label}
          description={option.description}
          disabled={disabled || option.disabled}
          checked={option.checked}
          value={option.value}
          name={name}
          onChange={() => onChange(option)}
          indeterminate={option.indeterminate}
        />

        {option.children && option.children.length > 0 && (
          <div style={childOptionsStyle}>
            {option.children.map((child, childIndex) =>
              renderOption(child, childIndex, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.options}>
      {options.map((option, index) => renderOption(option, index))}
    </div>
  );
};

export const ChoiceFieldGroup = ({
  type,
  name,
  label,
  description,
  options,
  value,
  onChange,
  orientation = "vertical",
  disabled,
  required,
  error,
  className,
}: ChoiceFieldGroupProps) => {
  const fieldsetId = useId();

  const { optionsState, handleChange } = useChoiceFieldState(
    type,
    options,
    value,
    onChange,
  );

  return (
    <fieldset
      className={clsx(
        styles["choice-field-group"],
        orientation && styles[orientation],
        disabled && styles.disabled,
        error && styles.error,
        className,
      )}
      disabled={disabled}
      id={fieldsetId}
      aria-invalid={!!error}
      aria-describedby={
        [
          error ? `${fieldsetId}-error` : null,
          description ? `${fieldsetId}-description` : null,
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      {label && (
        <legend className={styles.legend}>
          {label} {required && <span className={styles.required}>*</span>}
        </legend>
      )}

      {description && (
        <DescriptionMessage
          id={`${fieldsetId}-description`}
          className={styles.description}
        >
          {description}
        </DescriptionMessage>
      )}

      <ChoiceOptionList
        options={optionsState}
        type={type}
        name={name}
        disabled={disabled}
        onChange={handleChange}
      />

      {error && <ErrorMessage id={`${fieldsetId}-error`}>{error}</ErrorMessage>}
    </fieldset>
  );
};
