import { Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps {
  type?: string;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  type = "text",
  label,
  disabled,
  placeholder,
  name,
  id,
  value,
  onChange,
  ref,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={clsx(styles.module, disabled && styles.disabled)}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      {...props}
      ref={ref}
    />
  );
};
