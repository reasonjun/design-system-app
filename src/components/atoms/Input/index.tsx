import clsx from "clsx";
import styles from "./styles.module.scss";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => (
  <input
    className={clsx(styles.module, className)}
    aria-label={label}
    {...props}
  />
);
