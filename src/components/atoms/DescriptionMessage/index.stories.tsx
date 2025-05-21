import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionMessage } from "./";

const meta: Meta<typeof DescriptionMessage> = {
  title: "Atoms/DescriptionMessage",
  component: DescriptionMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "요약" },
};
