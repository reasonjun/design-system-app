import type { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonGroup } from ".";
import { Button } from "../../atoms/Button";

const meta = {
  title: "Molecule/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicButtonGroup: Story = {
  args: {
    alignment: "start",
    children: [
      <Button>Button</Button>,
      <Button>Button</Button>,
      <Button>Button</Button>,
    ],
  },
};
