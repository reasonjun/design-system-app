import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type IconButtonVariant = "primary" | "neutral" | "subtle";
export type IconButtonSize = "medium" | "small";

export interface IconButtonProps extends ComponentProps<"button"> {
  /** 버튼 라벨 */
  label: string;
  /** 아이콘 내용 */
  icon: ReactNode;
  /** 버튼 타입 (스타일) */
  variant?: IconButtonVariant;
  /** 버튼 크기 */
  size?: IconButtonSize;
}

/** Primary UI component for user interaction */
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
