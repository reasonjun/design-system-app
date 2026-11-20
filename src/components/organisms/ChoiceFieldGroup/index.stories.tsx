import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { expect } from "storybook/test";

import {
  ColorBackgroundDefaultSecondary,
  ColorTextDefaultSecondary,
} from "../../../style-dictionary-dist/variables.js";
import { ChoiceFieldGroup } from ".";

const meta: Meta<typeof ChoiceFieldGroup> = {
  title: "Organisms/ChoiceFieldGroup",
  component: ChoiceFieldGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (args) => {
    const [value, setValue] = useState(args.value);
    // Docs renders several stories in one document; a shared radio `name` would merge them into one group.
    const name = `${args.name}-${useId()}`;
    return (
      <ChoiceFieldGroup
        {...args}
        name={name}
        value={value}
        onChange={setValue}
      />
    );
  },
  argTypes: {
    orientation: {
      control: {
        type: "radio",
        options: ["vertical", "horizontal"],
      },
    },
    type: {
      control: {
        type: "radio",
        options: ["radio", "checkbox"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChoiceFieldGroup>;

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

export const RadioGroup: Story = {
  args: {
    type: "radio",
    name: "radio-group",
    label: "Select one option",
    description:
      "This is a group of radio buttons. You can select only one option.",
    options: radioOptions,
    orientation: "vertical",
    required: true,
    value: "option1",
  },
};

export const CheckboxGroup: Story = {
  args: {
    type: "checkbox",
    name: "checkbox-group",
    label: "Select multiple options",
    description:
      "This is a group of checkboxes. You can select multiple options.",
    options: checkboxOptions,
    orientation: "vertical",
    value: ["optionA"],
  },
};

export const HorizontalRadioGroup: Story = {
  args: {
    ...RadioGroup.args,
    orientation: "horizontal",
  },
};

export const WithError: Story = {
  args: {
    ...RadioGroup.args,
    error: "Please select a valid option",
    value: "",
  },
};

export const DisabledGroup: Story = {
  args: {
    ...CheckboxGroup.args,
    disabled: true,
  },
};

export const HierarchicalCheckboxGroup: Story = {
  args: {
    type: "checkbox",
    name: "hierarchical-checkbox-group",
    options: hierarchicalOptions,
    orientation: "vertical",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["react", "ux"]);

    return (
      <div>
        <ChoiceFieldGroup
          {...args}
          value={value}
          onChange={(val) => setValue(val as string[])}
        />
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: ColorBackgroundDefaultSecondary,
            borderRadius: "4px",
          }}
        >
          <h4>현재 선택된 값:</h4>
          <pre style={{ overflow: "auto", maxHeight: "150px" }}>
            {JSON.stringify(value, null, 2)}
          </pre>
          <p style={{ fontSize: "14px", color: ColorTextDefaultSecondary }}>
            <strong>주의:</strong> 리액트 담당과 UX 디자이너만 선택된 상태이므로
            프론트엔드팀, 개발팀, 부서, 디자인팀에 indeterminate 상태가
            표시됩니다.
          </p>
        </div>
      </div>
    );
  },
};

export const UncheckParentCheckedViaChildren: Story = {
  ...HierarchicalCheckboxGroup,
  play: async ({ canvas, userEvent }) => {
    const designTeam = canvas.getByRole("checkbox", { name: "디자인팀" });
    const ux = canvas.getByRole("checkbox", { name: "UX 디자이너" });
    const ui = canvas.getByRole("checkbox", { name: "UI 디자이너" });
    await userEvent.click(ui);
    await expect(designTeam).toBeChecked();

    await userEvent.click(designTeam);
    await expect(designTeam).not.toBeChecked();
    await expect(ux).not.toBeChecked();
    await expect(ui).not.toBeChecked();
  },
};

export const UncheckChildOfCheckedParent: Story = {
  ...HierarchicalCheckboxGroup,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const selectedValues = () =>
      JSON.parse(canvasElement.querySelector("pre")?.textContent ?? "null");
    const designTeam = canvas.getByRole("checkbox", { name: "디자인팀" });
    await userEvent.click(designTeam);
    await expect(designTeam).toBeChecked();

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "UX 디자이너" }),
    );
    await expect(designTeam).not.toBeChecked();
    await expect(designTeam).toBePartiallyChecked();
    await expect(selectedValues()).toEqual(["react", "ui"]);
  },
};
