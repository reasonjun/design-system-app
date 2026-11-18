import { FormEvent } from "react";
import styles from "./styles.module.scss";

import { Button } from "../../atoms/Button/index.js";
import { Form } from "../Form/index.js";
import { TextField, TextFieldProps } from "../../molecule/TextField/index.js";
import { Anchor } from "../../atoms/Anchor/index.js";
import { ButtonGroup } from "../../molecule/ButtonGroup/index.js";

export interface LoginProps {
  // 기본 아이디/비밀번호 필드에 그대로 전달되는 props (name, value, onChange, onBlur, ref, error 등).
  // 폼 라이브러리 연결은 사용하는 쪽에서 한다. 예: react-hook-form 의 register("username")
  // label·type 은 디자인 시스템이 고정한다 (아이디/비밀번호 구성 일관성)
  usernameProps?: Omit<Partial<TextFieldProps>, "label" | "type">;
  passwordProps?: Omit<Partial<TextFieldProps>, "label" | "type">;

  // UI 상태 props
  isLoading?: boolean;
  formError?: string;

  // 이벤트 핸들러 props
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSignUpClick: () => void;

  /** 아이디 찾기 페이지 URL. 페이지가 아직 없으면 임시 값을 넣고 사용처에 TODO를 남기세요. */
  findIdHref: string;
  /** 비밀번호 찾기 페이지 URL. 페이지가 아직 없으면 임시 값을 넣고 사용처에 TODO를 남기세요. */
  findPasswordHref: string;
}

/**
 * 로그인 폼 organism 컴포넌트
 *
 * 이 컴포넌트는 순수하게 UI 구조와 레이아웃만 담당합니다.
 * 폼 상태·검증 로직은 특정 라이브러리에 묶이지 않고 상위 컴포넌트에서 처리합니다.
 */
export const Login = ({
  usernameProps,
  passwordProps,
  isLoading = false,
  formError,
  onSubmit,
  onSignUpClick,
  findIdHref,
  findPasswordHref,
}: LoginProps) => {
  const actions = (
    <div className={styles["action-container"]}>
      <ButtonGroup alignment="stack">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "처리 중..." : "로그인"}
        </Button>
        <Button type="button" variant="secondary" onClick={onSignUpClick}>
          회원가입
        </Button>
      </ButtonGroup>
      <div className={styles["link-container"]}>
        <Anchor href={findIdHref}>아이디 찾기</Anchor>
        <Anchor href={findPasswordHref}>비밀번호 찾기</Anchor>
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
      <TextField
        label="아이디"
        name="username"
        autoComplete="username"
        required
        {...usernameProps}
      />
      <TextField
        label="비밀번호"
        type="password"
        name="password"
        autoComplete="current-password"
        required
        {...passwordProps}
      />
    </Form>
  );
};
