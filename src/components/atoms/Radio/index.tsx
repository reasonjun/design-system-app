import { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface RadioProps extends ComponentProps<'input'> {
  label?: string;
}

export const Radio = ({
  label,
  disabled,
  name,
  id,
  checked,
  value,
  onChange,
  className,
  ...props
}: RadioProps) => {
  return (
    <input
      type="radio"
      className={clsx(styles.module, className)}
      name={name}
      id={id}
      checked={checked}
      value={value}
      disabled={disabled}
      onChange={onChange}
      aria-label={label}
      {...props}
    />
  );
};
