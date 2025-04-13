import { ChangeEvent, Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps {
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  checked?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

export const Checkbox = ({
  label,
  disabled,
  indeterminate,
  name,
  id,
  checked,
  value,
  onChange,
  ref,
  ...props
}: InputProps) => {
  return (
    <input
      type="checkbox"
      className={clsx(styles.module)}
      name={name}
      id={id}
      checked={checked}
      value={value}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      {...props}
      ref={(el) => {
        if (el && indeterminate !== undefined) {
          el.indeterminate = indeterminate;
        }
      }}
    />
  );
};
