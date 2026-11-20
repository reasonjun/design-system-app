import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChoiceField } from ".";

const meta = {
  title: "Molecule/ChoiceField",
  component: ChoiceField,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ChoiceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "checkbox",
    label: "Checkbox",
    description: "Checkbox description",
  },
};

export const RadioField: Story = {
  args: {
    type: "radio",
    label: "Radio",
    description: "Radio description",
  },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};
