import { ComponentProps, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface CheckboxProps extends ComponentProps<'input'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = ({
  label,
  disabled,
  indeterminate = false,
  checked,
  onChange,
  className,
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
      ref={ref}
      type="checkbox"
      className={clsx(styles.module, className)}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      aria-checked={indeterminate ? "mixed" : checked}
      {...props}
    />
  );
};
