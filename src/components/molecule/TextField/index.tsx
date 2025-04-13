import { Ref, useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Input, InputProps } from "../../atoms/Input";

export interface TextFieldProps extends Omit<InputProps, "id" | "aria-label"> {
  label: string;
  /** OPTIONAL HELPER TEXT TO BE DISPLAYED BELOW THE INPUT */
  helperText?: string;
  /** Error message to be displayed if input is invalid */
  error?: string;
  id?: string;
  /** Determines if the label should be hidden visually */
  hideLabel?: boolean;
  /** Determines if the field is required */
  required?: boolean;
  ref?: Ref<HTMLInputElement>;
}

/**
 * TextField component that combines an Input with a label and optional helper text or error message.
 */
export const TextField = ({
  label,
  helperText,
  error,
  id,
  hideLabel = false,
  required = false,
  disabled,
  ref,
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? `text-field-${generatedId}`;
  const isInvalid = !!error;

  return (
    <div className={clsx(styles.module)}>
      <label
        htmlFor={inputId}
        className={clsx(
          styles.label,
          disabled && styles.disabled,
          hideLabel && styles.srOnly,
        )}
      >
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <Input
        id={inputId}
        aria-invalid={isInvalid}
        aria-describedby={helperText || error ? `${id}-helper-text` : undefined}
        disabled={disabled}
        {...props}
        ref={ref}
      />

      {(helperText || error) && (
        <div
          id={`${id}-helper-text`}
          className={clsx(styles.helperText, isInvalid && styles.error)}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
};
