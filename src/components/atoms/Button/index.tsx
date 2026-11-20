import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonIconPosition = "left" | "right";

export interface ButtonProps extends ComponentProps<"button"> {
  type?: ButtonType;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showIcon?: boolean;
  iconPosition?: ButtonIconPosition;
  icon?: ReactNode;
}

/** 사용자 동작을 받는 기본 버튼 */
export const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  showIcon = false,
  iconPosition = "left",
  icon,
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.module, styles[variant], styles[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {showIcon && iconPosition === "left" && (
        <span className={styles["icon-start"]}>{icon}</span>
      )}
      {children}
      {showIcon && iconPosition === "right" && (
        <span className={styles["icon-end"]}>{icon}</span>
      )}
    </button>
  );
};
