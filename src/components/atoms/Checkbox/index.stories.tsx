import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Checkbox } from ".";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Text" },
};

export const Checked: Story = {
  args: { label: "Text", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Text", disabled: true },
};

export const Indeterminate: Story = {
  args: {
    label: "전체 선택",
    indeterminate: true,
    checked: false,
    readOnly: true,
  },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "전체 선택" });
    await expect(checkbox).toBePartiallyChecked();

    // 브라우저는 클릭 시 혼합 상태를 지우지만, prop이 true인 동안은 유지돼야 한다.
    await userEvent.click(checkbox);
    await expect(checkbox).toBePartiallyChecked();
  },
};
