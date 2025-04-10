import { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type ButtonType = "button" | "submit" | "reset";
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonIconPosition = "left" | "right";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** HTML 버튼 타입 */
  type?: ButtonType;
  /** 버튼 라벨 */
  children: string;
  /** 버튼 스타일 타입 */
  variant?: ButtonVariant;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 아이콘 위치 */
  iconPosition?: ButtonIconPosition;
  /** 아이콘 컴포넌트 */
  icon?: ReactNode;
  /** 버튼 ref */
  ref?: Ref<HTMLButtonElement>;
}

/** Primary UI component for user interaction */
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
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.module, styles[variant], styles[size])}
      disabled={disabled}
      onClick={onClick}
      {...props}
      ref={ref}
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
