import { ChangeEvent, useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { DescriptionMessage } from "../../atoms/DescriptionMessage";
import { ErrorMessage } from "../../atoms/ErrorMessage";
import { ChoiceField, ChoiceFieldProps } from "../../molecule/ChoiceField";

import { useChoiceFieldState } from "./hooks/useChoiceFieldState";

/**
 * 선택 필드 그룹 옵션 인터페이스
 */
export interface ChoiceFieldGroupOption extends Omit<ChoiceFieldProps, "type"> {
  value: string;
  children?: ChoiceFieldGroupOption[];
  indeterminate?: boolean;
  checked?: boolean;
}

/**
 * 선택 필드 그룹 props 인터페이스
 */
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

/**
 * 옵션 목록을 렌더링하는 컴포넌트
 * 각 옵션에 대한 재귀적 렌더링을 처리합니다.
 */
const ChoiceOptionList = ({
  options,
  type,
  name,
  disabled,
  isChecked,
  onChange,
}: {
  options: ChoiceFieldGroupOption[];
  type: "checkbox" | "radio";
  name: string;
  disabled?: boolean;
  isChecked: (value: string, option?: ChoiceFieldGroupOption) => boolean;
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    option: ChoiceFieldGroupOption,
  ) => void;
}) => {
  /**
   * 단일 옵션과 그 하위 옵션들을 재귀적으로 렌더링하는 내부 컴포넌트
   */
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
          checked={isChecked(option.value, option)}
          value={option.value}
          name={name}
          onChange={(e) => onChange(e, option)}
          indeterminate={type === "checkbox" ? option.indeterminate : undefined}
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

/**
 * 선택 필드 그룹 컴포넌트
 */
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

  const { optionsState, handleChange, isChecked } = useChoiceFieldState(
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
        isChecked={isChecked}
        onChange={handleChange}
      />

      {error && <ErrorMessage id={`${fieldsetId}-error`}>{error}</ErrorMessage>}
    </fieldset>
  );
};
