import { ReactNode, Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type IconButtonVariant = "primary" | "neutral" | "subtle";
export type IconButtonSize = "medium" | "small";

export interface IconButtonProps {
  /** 버튼 라벨 */
  label: string;
  /** 아이콘 내용 */
  icon: ReactNode;
  /** 버튼 타입 (스타일) */
  variant?: IconButtonVariant;
  /** 버튼 크기 */
  size?: IconButtonSize;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 ref */
  ref?: Ref<HTMLButtonElement>;
}

/** Primary UI component for user interaction */
export const IconButton = ({
  label,
  icon,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  ref,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.module, styles[variant], styles[size])}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      {...props}
      ref={ref}
    >
      {icon}
      <span className={styles["visually-hidden"]}>{label}</span>
    </button>
  );
};
