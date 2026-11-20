import { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface AnchorProps extends ComponentProps<"a"> {
  /** 링크 텍스트 */
  children: string;
  /** 링크 URL */
  href?: string;
  /** 하나의 스페이스로 구분하는, 연결한 URL과의 관계를 나타내는 링크 유형 목록 */
  rel?: string;
  /** 링크한 URL을 표시할 위치 */
  target?: string;
  /** 스크린 리더를 위한 추가 텍스트 */
  screenReaderText?: string;
}

// 새 창으로 여는 링크는 열린 페이지가 window.opener로 이 페이지를 조작하지 못하게 막는다.
const getSafeRel = (target: string, rel?: string) => {
  if (target !== "_blank") return rel;
  return clsx(rel, "noopener noreferrer");
};

/** 다른 페이지나 위치로 이동하는 링크 */
export const Anchor = ({
  children,
  className,
  href,
  target = "_self",
  rel,
  screenReaderText,
  ...props
}: AnchorProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={getSafeRel(target, rel)}
      className={clsx(className, styles.module)}
      aria-label={screenReaderText}
      {...props}
    >
      {children}
    </a>
  );
};
