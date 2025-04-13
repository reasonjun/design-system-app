import { FormEvent, ReactNode, useId, ElementType } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { DescriptionMessage } from "../../atoms/DescriptionMessage";

// SectionHeader 컴포넌트
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
    <div className={styles['section-header']}>
      {title && <HeadingTag className={styles.title}>{title}</HeadingTag>}
      {description && descriptionId && (
        <DescriptionMessage id={descriptionId} className={styles.description}>
          {description}
        </DescriptionMessage>
      )}
    </div>
  );
};

// Form 컴포넌트
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
}

/**
 * Form 컴포넌트는 다양한 입력 요소들을 포함하는 컨테이너입니다.
 * 기본적인 레이아웃, 상태 표시 및 폼 액션을 처리합니다.
 */
export const Form = ({
  children,
  actions,
  onSubmit,
  title,
  description,
  isSubmitting = false,
  className,
  id,
  ...props
}: FormProps) => {
  const formId = useId();
  const descriptionId = description ? `${formId}-description` : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && !isSubmitting) {
      onSubmit(e);
    }
  };

  return (
    <form
      id={id || formId}
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
      {actions && <div className={styles['actions-wrapper']}>{actions}</div>}
      {isSubmitting && (
        <div className={styles['loading-indicator']} aria-label="제출 중...">
          <span className={styles['loading-dot']} />
          <span className={styles['loading-dot']} />
          <span className={styles['loading-dot']} />
        </div>
      )}
    </form>
  );
};

// FormSection 컴포넌트
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
  const sectionId = useId();
  const descriptionId = description ? `${sectionId}-description` : undefined;

  return (
    <section
      id={id || sectionId}
      className={clsx(className, styles['form-section'])}
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

// FormActions 컴포넌트
export interface FormActionsProps {
  /** 버튼 등의 액션 컴포넌트들 */
  children: ReactNode;
  /** 추가 클래스 이름 */
  className?: string;
}

/**
 * FormActions 컴포넌트는 폼의 제출 및 취소 버튼과 같은 액션 요소들을 배치합니다.
 */
export const FormActions = ({
  children,
  className,
  ...props
}: FormActionsProps) => {
  return (
    <div className={clsx(className, styles['form-actions'])} {...props}>
      {children}
    </div>
  );
};
