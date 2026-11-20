import type { Meta, StoryObj } from "@storybook/react-vite";
import { RequiredMark } from ".";

const meta = {
  title: "Atoms/RequiredMark",
  component: RequiredMark,
  tags: ["autodocs"],
} satisfies Meta<typeof RequiredMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label>
      이름
      <RequiredMark />
    </label>
  ),
};
