import { Ref, useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Input, InputProps } from "../../atoms/Input/index.js";
import { ErrorMessage } from "../../atoms/ErrorMessage/index.js";
import { DescriptionMessage } from "../../atoms/DescriptionMessage/index.js";
import { RequiredMark } from "../../atoms/RequiredMark/index.js";

export interface TextFieldProps extends Omit<InputProps, "id" | "aria-label"> {
  label: string;
  /** 입력란 아래에 보여 줄 도움말 */
  helperText?: string;
  /** 입력값이 잘못됐을 때 보여 줄 오류 메시지. 있으면 도움말 대신 보인다. */
  error?: string;
  id?: string;
  /** 라벨을 화면에서만 숨길지 여부 (보조기기에는 읽힌다) */
  isLabelHidden?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  ref?: Ref<HTMLInputElement>;
}

/**
 * 라벨, 입력란, 도움말 또는 오류 메시지를 묶은 텍스트 필드입니다.
 *
 * `required`는 브라우저 기본 검증이 아니라 `aria-required`로 보조기기에만 알립니다.
 * 빈 값 검사와 오류 표시는 쓰는 쪽이 `error` prop으로 합니다 (Form의 검증 정책 참고).
 */
export const TextField = ({
  label,
  helperText,
  error,
  id,
  isLabelHidden = false,
  required = false,
  disabled,
  ref,
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id || `text-field-${generatedId}`;
  const messageId = `${inputId}-message`;
  const isInvalid = Boolean(error);
  const hasMessage = Boolean(error || helperText);

  return (
    <div className={styles.module}>
      <label
        htmlFor={inputId}
        className={clsx(
          styles.label,
          disabled && styles.disabled,
          isLabelHidden && styles["visually-hidden"],
        )}
      >
        {label}
        {required && <RequiredMark shouldAnnounce={false} />}
      </label>

      <Input
        id={inputId}
        aria-invalid={isInvalid}
        aria-describedby={(hasMessage && messageId) || undefined}
        disabled={disabled}
        // 네이티브 required가 아니라 aria-required: noValidate가 없는 사용처 폼에서 제출이 막히기 때문이다.
        aria-required={required || undefined}
        {...props}
        ref={ref}
      />

      {isInvalid && <ErrorMessage id={messageId}>{error}</ErrorMessage>}
      {!isInvalid && helperText && (
        <DescriptionMessage id={messageId}>{helperText}</DescriptionMessage>
      )}
    </div>
  );
};
