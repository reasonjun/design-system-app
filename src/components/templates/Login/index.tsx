import { FormEvent } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { Button } from "../../atoms/Button";
import { TextField } from "../../molecule/TextField";
import { Form } from "../../organisms/Form";
import { Anchor } from "../../atoms/Anchor";
import { ButtonGroup } from "../../molecule/ButtonGroup";

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface LoginTemplateProps {
  // react-hook-form props
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;

  // UI 상태 props
  isLoading?: boolean;
  formError?: string;

  // 이벤트 핸들러 props
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSignUpClick: () => void;
}

/**
 * 로그인 템플릿 컴포넌트 - React Hook Form 버전
 *
 * 이 컴포넌트는 순수하게 UI 구조와 레이아웃만 담당합니다.
 * 모든 폼 로직은 react-hook-form을 통해 상위 컴포넌트에서 처리됩니다.
 */
export const Login = ({
  control,
  errors,
  isLoading = false,
  formError,
  onSubmit,
  onSignUpClick,
}: LoginTemplateProps) => {
  const actions = (
    <div className={clsx(styles["action-container"])}>
      <ButtonGroup alignment="stack">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "처리 중..." : "로그인"}
        </Button>
        <Button type="button" variant="secondary" onClick={onSignUpClick}>
          회원가입
        </Button>
      </ButtonGroup>
      <div className={clsx(styles["link-container"])}>
        <Anchor>아이디 찾기</Anchor>
        <Anchor>비밀번호 찾기</Anchor>
      </div>
    </div>
  );

  return (
    <Form
      title="로그인"
      actions={actions}
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      error={formError}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            label="아이디"
            error={errors.username?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label="비밀번호"
            type="password"
            error={errors.password?.message}
            required
            {...field}
          />
        )}
      />
    </Form>
  );
};
