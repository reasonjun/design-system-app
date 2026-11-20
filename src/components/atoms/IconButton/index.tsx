import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type IconButtonVariant = "primary" | "neutral" | "subtle";
export type IconButtonSize = "medium" | "small";

export interface IconButtonProps extends ComponentProps<"button"> {
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

/** 아이콘만 보이는 버튼. `label`은 화면에 보이지 않고 보조기기에 읽힌다. */
export const IconButton = ({
  label,
  icon,
  variant = "primary",
  size = "medium",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.module, styles[variant], styles[size], className)}
      aria-label={label}
      {...props}
    >
      {icon}
      <span className={styles["visually-hidden"]}>{label}</span>
    </button>
  );
};
