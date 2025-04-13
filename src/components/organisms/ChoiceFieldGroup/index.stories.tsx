import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { ChoiceFieldGroup } from ".";

const meta: Meta<typeof ChoiceFieldGroup> = {
  title: "Organisms/ChoiceFieldGroup",
  component: ChoiceFieldGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
    label: "Indeterminate Option",
    value: "optionD",
    description: "This option is in an indeterminate state",
    indeterminate: true,
  },
  {
    label: "Disabled Option",
    value: "optionE",
    description: "This option is disabled",
    disabled: true,
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
  },
  render: (args) => {
    const [value, setValue] = useState<string>("option1");

    return (
      <ChoiceFieldGroup
        {...args}
        value={value}
        onChange={(val) => setValue(val as string)}
      />
    );
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
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["optionA"]);

    return (
      <ChoiceFieldGroup
        {...args}
        value={value}
        onChange={(val) => setValue(val as string[])}
      />
    );
  },
};

export const HorizontalRadioGroup: Story = {
  args: {
    ...RadioGroup.args,
    orientation: "horizontal",
  },
  render: (args) => {
    const [value, setValue] = useState<string>("option1");

    return (
      <ChoiceFieldGroup
        {...args}
        value={value}
        onChange={(val) => setValue(val as string)}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    ...RadioGroup.args,
    error: "Please select a valid option",
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");

    return (
      <ChoiceFieldGroup
        {...args}
        value={value}
        onChange={(val) => setValue(val as string)}
      />
    );
  },
};

export const DisabledGroup: Story = {
  args: {
    ...CheckboxGroup.args,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["optionA"]);

    return (
      <ChoiceFieldGroup
        {...args}
        value={value}
        onChange={(val) => setValue(val as string[])}
      />
    );
  },
};
