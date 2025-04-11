import { ReactElement } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Button, ButtonProps } from "../../atoms/Button";

export type ButtonGroupAlignment =
  | "justify"
  | "start"
  | "end"
  | "center"
  | "stack";

export interface ButtonGroupProps {
  // TODO: 타입을 Button으로 제한하기
  /** 그룹 내 버튼 컴포넌트들 */
  children: ReactElement<ButtonProps, typeof Button>[];
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
