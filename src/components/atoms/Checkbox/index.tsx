import { ChangeEvent, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface CheckboxProps {
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  disabled,
  indeterminate = false,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      className={clsx(styles.module)}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      aria-checked={indeterminate ? "mixed" : checked}
      {...props}
      ref={ref}
    />
  );
};
