import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Login } from ".";

const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

interface LoginWrapperProps {
  defaultUsername?: string;
  defaultPassword?: string;
  isLoading?: boolean;
  formError?: string;
  /** 검증을 기다리지 않고 보여 줄 필드 오류 (예: 서버가 돌려준 오류). */
  usernameError?: string;
  passwordError?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onSignUpClick?: () => void;
  findIdHref: string;
  findPasswordHref: string;
}

// 스토리북에서 React Hook Form을 연결해 보여주는 래퍼 컴포넌트 (Login 자체는 폼 라이브러리에 의존하지 않음)
const LoginWithHookForm = (args: LoginWrapperProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: args.defaultUsername || "",
      password: args.defaultPassword || "",
    },
    mode: "onChange",
  });

  return (
    <Login
      isLoading={args.isLoading}
      formError={args.formError}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        args.onSubmit?.(e);
      }}
      onSignUpClick={() => args.onSignUpClick?.()}
      findIdHref={args.findIdHref}
      findPasswordHref={args.findPasswordHref}
      usernameProps={{
        ...register("username"),
        error: args.usernameError ?? errors.username?.message,
      }}
      passwordProps={{
        ...register("password"),
        error: args.passwordError ?? errors.password?.message,
      }}
    />
  );
};

// LoginWithHookForm을 메타에 사용하여 래퍼 컴포넌트의 props가 스토리에서 사용되도록 함
const meta = {
  title: "Organisms/Login",
  component: LoginWithHookForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginWithHookForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultUsername: "",
    defaultPassword: "",
    isLoading: false,
    formError: "",
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("폼 제출됨");
    },
    onSignUpClick: () => {
      console.log("회원가입 버튼 클릭");
    },
    findIdHref: "/find-id",
    findPasswordHref: "/find-password",
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    formError: "아이디 또는 비밀번호가 일치하지 않습니다.",
  },
};

export const Prefilled: Story = {
  args: {
    ...Default.args,
    defaultUsername: "testuser",
    defaultPassword: "password123",
  },
};

export const WithFieldErrors: Story = {
  args: {
    ...Default.args,
    defaultPassword: "pwd",
    usernameError: "아이디를 입력해주세요",
    passwordError: "비밀번호는 6자 이상이어야 합니다",
  },
};
