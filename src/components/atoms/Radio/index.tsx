import { Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface InputProps {
  label?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  checked?: boolean;
  value?: string | number;
  onChange?: () => void;
  ref?: Ref<HTMLInputElement>;
}

export const Radio = ({
  label,
  disabled,
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
      type="radio"
      className={clsx(styles.module)}
      name={name}
      id={id}
      checked={checked}
      value={value}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      {...props}
      ref={ref}
    />
  );
};
