import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./";

const meta: Meta<typeof ErrorMessage> = {
  title: "Atoms/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "에러" },
};
