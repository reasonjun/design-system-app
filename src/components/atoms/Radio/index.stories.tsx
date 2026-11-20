import type { Meta, StoryObj } from "@storybook/react-vite";

import { Radio } from ".";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Radio" },
};

export const Checked: Story = {
  args: { label: "Radio", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Radio", disabled: true },
};
