import type { Meta, StoryObj } from "@storybook/react";
import { Login } from "./index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormValues } from ".";
import { FormEvent } from "react";

// Zod 스키마 정의 (스토리 테스트용)
const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

// 래퍼 컴포넌트의 props 인터페이스 정의
interface LoginWrapperProps {
  defaultUsername?: string;
  defaultPassword?: string;
  isLoading?: boolean;
  formError?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onSignUpClick?: () => void;
}

// 스토리북에서 React Hook Form을 사용하기 위한 래퍼 컴포넌트
const LoginWithHookForm = (args: LoginWrapperProps) => {
  const {
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: args.defaultUsername || "",
      password: args.defaultPassword || "",
    },
    mode: "onChange",
  });

  return (
    <Login
      control={control}
      errors={errors}
      isLoading={args.isLoading}
      formError={args.formError}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (args.onSubmit) {
          args.onSubmit(e);
        }
      }}
      onSignUpClick={() => {
        if (args.onSignUpClick) {
          args.onSignUpClick();
        }
      }}
    />
  );
};

// 스토리북 메타데이터 정의
// LoginWithHookForm을 메타에 사용하여 래퍼 컴포넌트의 props가 스토리에서 사용되도록 함
const meta = {
  title: "Templates/Login",
  component: LoginWithHookForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
} as Meta<typeof LoginWithHookForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 로그인 스토리
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
  },
};

// 로딩 중 상태 스토리
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

// 에러 상태 스토리
export const WithError: Story = {
  args: {
    ...Default.args,
    formError: "아이디 또는 비밀번호가 일치하지 않습니다.",
  },
};

// 미리 채워진 폼 스토리
export const Prefilled: Story = {
  args: {
    ...Default.args,
    defaultUsername: "testuser",
    defaultPassword: "password123",
  },
};

// 필드 에러가 있는 스토리 (유효성 검사 실패)
export const WithFieldErrors: Story = {
  render: (args) => {
    const {
      control,
      formState: { errors },
    } = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        username: "",
        password: "pwd", // 6자 미만으로 유효성 검사 실패
      },
      mode: "onChange",
    });

    // 수동으로 에러 설정
    type ErrorsWithMessage = Record<keyof LoginFormValues, { message: string }>;
    const typedErrors = errors as unknown as ErrorsWithMessage;

    typedErrors.username = { message: "아이디를 입력해주세요" };
    typedErrors.password = { message: "비밀번호는 6자 이상이어야 합니다" };

    return (
      <Login
        control={control}
        errors={errors}
        isLoading={args.isLoading}
        formError={args.formError}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (args.onSubmit) {
            args.onSubmit(e);
          }
        }}
        onSignUpClick={() => {
          if (args.onSignUpClick) {
            args.onSignUpClick();
          }
        }}
      />
    );
  },
  args: {
    ...Default.args,
  },
};
