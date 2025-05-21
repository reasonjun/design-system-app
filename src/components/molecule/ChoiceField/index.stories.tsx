import type { Meta, StoryObj } from "@storybook/react";

import { ChoiceField } from ".";

const meta: Meta<typeof ChoiceField> = {
  title: "Molecule/ChoiceField",
  component: ChoiceField,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

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
