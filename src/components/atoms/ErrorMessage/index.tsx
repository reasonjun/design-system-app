import { ComponentPropsWithoutRef, Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props extends ComponentPropsWithoutRef<"p"> {
  ref?: Ref<HTMLParagraphElement>;
}

export const ErrorMessage = ({ className, ref, ...props }: Props) => {
  return (
    <p
      className={clsx(className, styles.module)}
      role="alert"
      aria-live="off"
      {...props}
      ref={ref}
    />
  );
};
