import type { Meta, StoryObj } from "@storybook/react";

import { ChoiceField } from ".";

const meta = {
  title: "Molecule/ChoiceField",
  component: ChoiceField,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ChoiceField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxField: Story = {
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
