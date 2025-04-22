import { ComponentPropsWithoutRef, Ref } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface AnchorProps extends ComponentPropsWithoutRef<"a"> {
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
  /** 링크 ref */
  ref?: Ref<HTMLAnchorElement>;
}

/** Primary UI component for navigation and links */
export const Anchor = ({
  children,
  className,
  href,
  target = "_self",
  rel,
  screenReaderText,
  ref,
  ...props
}: AnchorProps) => {
  // 외부 링크에 대한 보안 속성 자동 추가
  const safeRel =
    target === "_blank"
      ? rel
        ? `${rel} noopener noreferrer`
        : "noopener noreferrer"
      : rel;

  // 스크린 리더를 위한 텍스트가 있는 경우
  const ariaLabel = screenReaderText || undefined;

  return (
    <a
      href={href}
      target={target}
      rel={safeRel}
      className={clsx(className, styles.module)}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    >
      {children}
    </a>
  );
};
