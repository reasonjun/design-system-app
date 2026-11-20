import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from ".";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Default Input",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Initial value",
    placeholder: "Enter text...",
    label: "Input with initial value",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit",
    disabled: true,
    defaultValue: "Disabled input",
    label: "Disabled Input",
  },
};
