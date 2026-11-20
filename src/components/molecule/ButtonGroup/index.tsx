import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export type ButtonGroupAlignment =
  "justify" | "start" | "end" | "center" | "stack";

export interface ButtonGroupProps {
  /** 그룹 내 버튼들. Button 컴포넌트를 넣는다 (타입으로는 강제되지 않는다). */
  children: ReactNode;
  /** 그룹 정렬/배치 모드 */
  alignment?: ButtonGroupAlignment;
}

/** Molecule 레벨의 Button Group 컴포넌트 */
export const ButtonGroup = ({
  children,
  alignment = "start",
}: ButtonGroupProps) => {
  return (
    <div className={clsx(styles.module, styles[alignment])}>{children}</div>
  );
};
