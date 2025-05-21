import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from ".";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Radio" },
};
