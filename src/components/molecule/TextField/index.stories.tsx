import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TextField } from ".";

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
    isLabelHidden: {
      control: "boolean",
    },
  },
  args: {
    type: "text",
    disabled: false,
    required: false,
    isLabelHidden: false,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
    defaultValue: "johndoe",
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/Password/);
    await expect(input).toBeRequired();
    await expect(input).toHaveAccessibleName("Password");
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
    isLabelHidden: true,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("textbox")).toHaveAccessibleName("Search");
    const label = canvasElement.querySelector("label") as HTMLElement;
    await expect(label.getBoundingClientRect().width).toBeLessThanOrEqual(1);
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
