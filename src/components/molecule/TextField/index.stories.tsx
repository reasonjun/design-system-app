import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./index.tsx";

const meta = {
  title: "Molecule/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    hideLabel: {
      control: "boolean",
    },
  },
  args: {
    type: "text",
    disabled: false,
    required: false,
    hideLabel: false,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTextField: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder text",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email with anyone else.",
    type: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    error: "Username is already taken",
    value: "johndoe",
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "You cannot edit this field",
    disabled: true,
    value: "Disabled value",
  },
};

export const WithHiddenLabel: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    hideLabel: true,
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    placeholder: "Enter your age",
    type: "number",
    helperText: "Must be 18 or older",
  },
};
