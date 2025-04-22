import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormSection } from ".";

import { ChoiceFieldGroup } from "../ChoiceFieldGroup";
import { Button } from "../../atoms/Button";
import { ButtonGroup } from "../../molecule/ButtonGroup";
import { TextField } from "../../molecule/TextField";

const meta: Meta<typeof Form> = {
  component: Form,
  title: "Organisms/Form",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: { action: "submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    title: "기본 폼",
    description: "기본적인 폼 예시입니다.",
    children: (
      <>
        <TextField label="이름" />
        <TextField label="이메일" type="email" />
      </>
    ),
    actions: <Button type="submit">제출</Button>,
  },
};

export const WithSections: Story = {
  args: {
    title: "섹션이 있는 폼",
    description: "여러 섹션으로 구분된 폼 예시입니다.",
    children: (
      <>
        <FormSection title="기본 정보" description="개인 정보를 입력해주세요.">
          <TextField label="이름" required />
          <TextField label="이메일" type="email" required />
        </FormSection>

        <FormSection title="추가 정보">
          <TextField label="전화번호" />
          <TextField label="주소" />
        </FormSection>
      </>
    ),
    actions: (
      <ButtonGroup alignment="center">
        <Button variant="secondary">취소</Button>
        <Button type="submit">제출</Button>
      </ButtonGroup>
    ),
  },
};

export const WithValidationErrors: Story = {
  args: {
    title: "유효성 검사 오류가 있는 폼",
    children: (
      <>
        <TextField label="이름" error="이름은 필수입니다." />
        <TextField label="이메일" type="email" />
      </>
    ),
    actions: <Button type="submit">제출</Button>,
  },
};

export const IsSubmitting: Story = {
  args: {
    title: "제출 중인 폼",
    isSubmitting: true,
    children: (
      <>
        <TextField label="이름" />
        <TextField label="이메일" type="email" />
      </>
    ),
    actions: (
      <Button type="submit" disabled>
        제출 중...
      </Button>
    ),
  },
};

export const WithChoiceFields: Story = {
  args: {
    title: "선택 필드가 있는 폼",
    children: (
      <>
        <TextField label="이름" />

        <ChoiceFieldGroup
          type="radio"
          name="gender"
          label="성별"
          value="female"
          options={[
            { label: "남성", value: "male" },
            { label: "여성", value: "female" },
            { label: "기타", value: "other" },
          ]}
        />

        <ChoiceFieldGroup
          type="checkbox"
          name="interests"
          label="관심사"
          value={["music", "books"]}
          options={[
            { label: "스포츠", value: "sports" },
            { label: "음악", value: "music" },
            { label: "영화", value: "movies" },
            { label: "독서", value: "books" },
          ]}
        />
      </>
    ),
    actions: <Button type="submit">제출</Button>,
  },
};
