import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from ".";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicRadio: Story = {
  args: { label: "Radio" },
};
