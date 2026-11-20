import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect } from "storybook/test";

import { ChoiceFieldGroup, ChoiceFieldGroupProps } from ".";

type CheckboxGroupProps = Extract<ChoiceFieldGroupProps, { type: "checkbox" }>;
type RadioGroupProps = Extract<ChoiceFieldGroupProps, { type: "radio" }>;

const meta = {
  title: "Organisms/ChoiceFieldGroup",
  component: ChoiceFieldGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (args) => {
    const [value, setValue] = useState(args.value);
    // Docs는 한 문서에 여러 스토리를 그린다. 라디오 `name`이 같으면 하나의 그룹으로 합쳐진다.
    const name = `${args.name}-${useId()}`;
    const props = { ...args, name, value, onChange: setValue };
    return <ChoiceFieldGroup {...(props as ChoiceFieldGroupProps)} />;
  },
  argTypes: {
    orientation: {
      control: {
        type: "radio",
        options: ["vertical", "horizontal"],
      },
    },
    // docgen이 props 유니언에서 선택지를 추론하지 못해 여기에 적는다.
    type: {
      control: "radio",
      options: ["radio", "checkbox"],
    },
  },
} satisfies Meta<typeof ChoiceFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const radioOptions = [
  {
    label: "Option 1",
    value: "option1",
    description: "Description for option 1",
  },
  {
    label: "Option 2",
    value: "option2",
    description: "Description for option 2",
  },
  {
    label: "Option 3",
    value: "option3",
    description: "Description for option 3",
  },
  {
    label: "Disabled Option",
    value: "option4",
    description: "This option is disabled",
    disabled: true,
  },
];

const checkboxOptions = [
  {
    label: "Option A",
    value: "optionA",
    description: "Description for option A",
  },
  {
    label: "Option B",
    value: "optionB",
    description: "Description for option B",
  },
  {
    label: "Option C",
    value: "optionC",
    description: "Description for option C",
  },
  {
    label: "Disabled Option",
    value: "optionE",
    description: "This option is disabled",
    disabled: true,
  },
];

const hierarchicalOptions = [
  {
    label: "전체선택",
    value: "department",
    children: [
      {
        label: "개발팀",
        value: "dev-team",
        description: "개발팀",
        children: [
          {
            label: "프론트엔드팀",
            value: "frontend-team",
            description: "프론트엔드 개발",
            children: [
              {
                label: "리액트 담당",
                value: "react",
                description: "리액트 개발자",
              },
              { label: "뷰 담당", value: "vue", description: "뷰 개발자" },
            ],
          },
          {
            label: "백엔드팀",
            value: "backend-team",
            description: "백엔드 개발",
            children: [
              { label: "자바 담당", value: "java", description: "자바 개발자" },
              {
                label: "파이썬 담당",
                value: "python",
                description: "파이썬 개발자",
              },
            ],
          },
        ],
      },
      {
        label: "디자인팀",
        value: "design-team",
        description: "디자인팀",
        children: [
          { label: "UX 디자이너", value: "ux", description: "UX 디자인" },
          { label: "UI 디자이너", value: "ui", description: "UI 디자인" },
        ],
      },
      {
        label: "경영지원",
        value: "management",
        description: "경영지원 부서",
        children: [
          { label: "인사팀", value: "hr", description: "인사 담당" },
          { label: "회계팀", value: "accounting", description: "회계 담당" },
        ],
      },
    ],
  },
];

const radioGroupArgs: RadioGroupProps = {
  type: "radio",
  name: "radio-group",
  label: "Select one option",
  description:
    "This is a group of radio buttons. You can select only one option.",
  options: radioOptions,
  orientation: "vertical",
  required: true,
  value: "option1",
};

export const RadioGroup: Story = { args: radioGroupArgs };

const checkboxGroupArgs: CheckboxGroupProps = {
  type: "checkbox",
  name: "checkbox-group",
  label: "Select multiple options",
  description:
    "This is a group of checkboxes. You can select multiple options.",
  options: checkboxOptions,
  orientation: "vertical",
  value: ["optionA"],
};

export const CheckboxGroup: Story = { args: checkboxGroupArgs };

export const HorizontalRadioGroup: Story = {
  args: {
    ...radioGroupArgs,
    orientation: "horizontal",
  },
};

export const WithError: Story = {
  args: {
    ...radioGroupArgs,
    error: "Please select a valid option",
    value: "",
  },
  play: async ({ canvas }) => {
    const group = canvas.getByRole("radiogroup", {
      name: "Select one option",
    });
    await expect(group).toBeRequired();
    await expect(group).toHaveAttribute("aria-invalid", "true");
    await expect(group).toHaveAccessibleDescription(
      /Please select a valid option/,
    );
  },
};

export const DisabledGroup: Story = {
  args: {
    ...checkboxGroupArgs,
    disabled: true,
  },
};

const hierarchicalArgs: CheckboxGroupProps = {
  type: "checkbox",
  name: "hierarchical-checkbox-group",
  options: hierarchicalOptions,
  orientation: "vertical",
};

/**
 * 리액트 담당과 UX 디자이너만 선택된 상태입니다. 자식 일부만 선택된 전체선택, 개발팀, 프론트엔드팀, 디자인팀은 부분 체크로 표시됩니다.
 */
export const HierarchicalCheckboxGroup: Story = {
  args: { ...hierarchicalArgs, value: ["react", "ux"] },
  play: async ({ canvas, userEvent }) => {
    const designTeam = canvas.getByRole("checkbox", { name: "디자인팀" });
    const ux = canvas.getByRole("checkbox", { name: "UX 디자이너" });
    const ui = canvas.getByRole("checkbox", { name: "UI 디자이너" });
    const react = canvas.getByRole("checkbox", { name: "리액트 담당" });

    // 마지막 남은 자식을 체크하면 부모가 체크되고, 부모를 해제하면 모든 자식이 해제된다.
    await userEvent.click(ui);
    await expect(designTeam).toBeChecked();
    await userEvent.click(designTeam);
    await expect(designTeam).not.toBeChecked();
    await expect(ux).not.toBeChecked();
    await expect(ui).not.toBeChecked();

    // 체크된 부모의 자식 하나를 해제하면 부모는 부분 체크 상태가 된다.
    await userEvent.click(designTeam);
    await expect(designTeam).toBeChecked();
    await userEvent.click(ux);
    await expect(designTeam).toBePartiallyChecked();
    await expect(react).toBeChecked();
    await expect(ui).toBeChecked();
    await expect(ux).not.toBeChecked();
  },
};

export const WithDisabledOptions: Story = {
  args: {
    ...hierarchicalArgs,
    options: [
      {
        label: "전사",
        value: "company",
        children: [
          {
            label: "디자인팀",
            value: "design-team",
            children: [
              { label: "UX 디자이너", value: "ux", disabled: true },
              { label: "UI 디자이너", value: "ui" },
            ],
          },
          {
            label: "경영지원",
            value: "management",
            children: [{ label: "인사팀", value: "hr", disabled: true }],
          },
          {
            label: "재무팀",
            value: "finance",
            disabled: true,
            children: [{ label: "회계 담당", value: "accounting-lead" }],
          },
        ],
      },
    ],
    value: [],
  },
  play: async ({ canvas, userEvent }) => {
    const designTeam = canvas.getByRole("checkbox", { name: "디자인팀" });
    const uiDesigner = canvas.getByRole("checkbox", { name: "UI 디자이너" });
    const management = canvas.getByRole("checkbox", { name: "경영지원" });
    await expect(management).not.toBeChecked();
    await expect(management).toBeDisabled();
    await expect(
      canvas.getByRole("group", { name: "디자인팀" }),
    ).toBeInTheDocument();
    await expect(designTeam.getAttribute("aria-controls")?.split(" ")).toEqual(
      ["UX 디자이너", "UI 디자이너"].map(
        (name) => canvas.getByRole("checkbox", { name }).id,
      ),
    );
    await expect(
      canvas.getByRole("checkbox", { name: "회계 담당" }),
    ).toBeDisabled();

    await userEvent.click(designTeam);
    await expect(uiDesigner).toBeChecked();
    await expect(designTeam).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: "전사" })).toBeChecked();
    await expect(
      canvas.getByRole("checkbox", { name: "UX 디자이너" }),
    ).not.toBeChecked();

    await userEvent.click(designTeam);
    await expect(designTeam).not.toBeChecked();
    await expect(uiDesigner).not.toBeChecked();
  },
};
