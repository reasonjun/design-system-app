import { FormEvent, ReactNode, useId, ElementType } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { DescriptionMessage } from "../../atoms/DescriptionMessage/index.js";
import { ErrorMessage } from "../../atoms/ErrorMessage/index.js";

interface SectionHeaderProps {
  /** 제목 */
  title?: string;
  /** 설명 */
  description?: string;
  /** 설명을 위한 ID */
  descriptionId?: string;
  /** 제목 태그 */
  HeadingTag: ElementType;
}

const SectionHeader = ({
  title,
  description,
  descriptionId,
  HeadingTag = "h2",
}: SectionHeaderProps) => {
  if (!title && !description) return null;

  return (
    <div className={styles["section-header"]}>
      {title && <HeadingTag className={styles.title}>{title}</HeadingTag>}
      {description && descriptionId && (
        <DescriptionMessage id={descriptionId} className={styles.description}>
          {description}
        </DescriptionMessage>
      )}
    </div>
  );
};

export interface FormProps {
  /** Form의 필드와 섹션 요소들 */
  children: ReactNode;
  /** Form 액션 요소들 */
  actions?: ReactNode;
  /** Form 제출 핸들러 */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Form의 제목(레이블) */
  title?: string;
  /** Form 설명 */
  description?: string;
  /** Form이 현재 제출 중인지 여부 */
  isSubmitting?: boolean;
  /** 추가 클래스 이름 */
  className?: string;
  /** Form의 ID */
  id?: string;
  /** Form의 오류 메시지 */
  error?: string;
}

/**
 * Form 컴포넌트는 다양한 입력 요소들을 포함하는 컨테이너입니다.
 * 기본적인 레이아웃, 상태 표시 및 폼 액션을 처리합니다.
 *
 * 검증 정책: 검증 표시는 디자인 시스템이 맡습니다. 브라우저 기본 검증은 끄고(`noValidate`),
 * 필수 여부는 `aria-required`로, 오류는 각 입력의 `error` prop과 폼의 `error` prop으로 알립니다.
 * 입력 컴포넌트에 네이티브 `required` 속성을 넣지 않습니다.
 */
export const Form = ({
  children,
  actions,
  onSubmit,
  title,
  description,
  isSubmitting = false,
  className,
  error,
  id,
  ...props
}: FormProps) => {
  const generatedId = useId();
  const formId = id || generatedId;
  const descriptionId = (description && `${formId}-description`) || undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && !isSubmitting) {
      onSubmit(e);
    }
  };

  return (
    <form
      id={formId}
      className={clsx(
        className,
        styles.form,
        isSubmitting && styles.submitting,
      )}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={descriptionId}
      {...props}
    >
      <SectionHeader
        title={title}
        description={description}
        descriptionId={descriptionId}
        HeadingTag="h2"
      />
      <div className={styles.fields}>{children}</div>
      {/* 오류는 아래 라이브 영역이 읽어 주므로, 보이는 문구는 보조기기에서 숨긴다. */}
      {error && <ErrorMessage aria-hidden="true">{error}</ErrorMessage>}
      {actions && <FormActions>{actions}</FormActions>}
      {/* 라이브 영역은 항상 마운트돼 있어야 내용 변화가 스크린 리더에 읽힌다. */}
      <span role="status" className={styles["visually-hidden"]}>
        {isSubmitting && "제출 중..."}
      </span>
      <span role="alert" className={styles["visually-hidden"]}>
        {error}
      </span>
      {isSubmitting && (
        <div className={styles["loading-indicator"]} aria-hidden="true">
          <span className={styles["loading-dot"]} />
          <span className={styles["loading-dot"]} />
          <span className={styles["loading-dot"]} />
        </div>
      )}
    </form>
  );
};

export interface FormSectionProps {
  /** 섹션의 자식 요소들 */
  children: ReactNode;
  /** 섹션 제목 */
  title?: string;
  /** 섹션 설명 */
  description?: string;
  /** 추가 클래스 이름 */
  className?: string;
  /** 섹션 ID */
  id?: string;
}

/**
 * FormSection 컴포넌트는 Form 내에서 관련된 필드들을 그룹화하는 데 사용됩니다.
 * 섹션 제목과 설명을 포함할 수 있습니다.
 */
export const FormSection = ({
  children,
  title,
  description,
  className,
  id,
  ...props
}: FormSectionProps) => {
  const generatedId = useId();
  const sectionId = id || generatedId;
  const descriptionId =
    (description && `${sectionId}-description`) || undefined;

  return (
    <section
      id={sectionId}
      className={clsx(className, styles["form-section"])}
      aria-describedby={descriptionId}
      {...props}
    >
      <SectionHeader
        title={title}
        description={description}
        descriptionId={descriptionId}
        HeadingTag="h3"
      />
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export interface FormActionsProps {
  /** 버튼 등의 액션 컴포넌트들 */
  children: ReactNode;
  /** 추가 클래스 이름 */
  className?: string;
}

/**
 * FormActions 컴포넌트는 폼의 제출 및 취소 버튼과 같은 액션 요소들을 배치합니다.
 */
export const FormActions = ({ children, className }: FormActionsProps) => {
  return (
    <div className={clsx(className, styles["actions-wrapper"])}>{children}</div>
  );
};
