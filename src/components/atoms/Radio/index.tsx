import { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface RadioProps extends ComponentProps<"input"> {
  label?: string;
}

export const Radio = ({ label, className, ...props }: RadioProps) => {
  return (
    <input
      type="radio"
      className={clsx(styles.module, className)}
      aria-label={label}
      {...props}
    />
  );
};
