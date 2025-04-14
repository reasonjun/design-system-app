import { ChangeEvent, useId } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

import { DescriptionMessage } from "../../atoms/DescriptionMessage";
import { ErrorMessage } from "../../atoms/ErrorMessage";
import { ChoiceField, ChoiceFieldProps } from "../../molecule/ChoiceField";

export interface ChoiceFieldGroupOption extends Omit<ChoiceFieldProps, "type"> {
  value: string;
}

export interface ChoiceFieldGroupProps {
  type: "checkbox" | "radio";
  name: string;
  label?: string;
  description?: string;
  options: ChoiceFieldGroupOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

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

  const handleChange = (
    _: ChangeEvent<HTMLInputElement>,
    option: ChoiceFieldGroupOption,
  ) => {
    if (!onChange) return;

    if (type === "radio") {
      // Radio buttons can only have one selected value
      onChange(option.value);
    } else {
      // Checkboxes can have multiple values
      const valueArray = Array.isArray(value) ? value : value ? [value] : [];

      if (valueArray.includes(option.value)) {
        // Remove value if already selected
        onChange(valueArray.filter((v) => v !== option.value));
      } else {
        // Add value if not selected
        onChange([...valueArray, option.value]);
      }
    }
  };

  const isChecked = (optionValue: string) => {
    if (type === "radio") {
      return value === optionValue;
    } else {
      // For checkboxes, check if the value exists in the array
      const valueArray = Array.isArray(value) ? value : value ? [value] : [];
      return valueArray.includes(optionValue);
    }
  };

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
      aria-required={required}
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

      <div className={styles.options}>
        {options.map((option, index) => (
          <ChoiceField
            key={`${name}-${index}-${option.value}`}
            type={type}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
            checked={isChecked(option.value)}
            value={option.value}
            name={name}
            onChange={(e) =>
              handleChange(e as ChangeEvent<HTMLInputElement>, option)
            }
            {...(type === "checkbox" && {
              indeterminate: option.indeterminate,
            })}
          />
        ))}
      </div>

      {error && <ErrorMessage id={`${fieldsetId}-error`}>{error}</ErrorMessage>}
    </fieldset>
  );
};
