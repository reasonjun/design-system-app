import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    label: "Default Input",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Initial value",
    placeholder: "Enter text...",
    label: "Input with initial value",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit",
    disabled: true,
    defaultValue: "Disabled input",
    label: "Disabled Input",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div>
        <Input
          placeholder="Type something..."
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Value: "{value}"
        </p>
      </div>
    );
  },
};

// React 19 스타일 ref 사용 예시
export const WithRef: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Input
          ref={inputRef}
          placeholder="Click button to focus"
          label="Input with Ref"
        />
        <button
          onClick={() => inputRef.current?.focus()}
          style={{ padding: "8px 16px", width: "fit-content" }}
        >
          Focus Input
        </button>
      </div>
    );
  },
};
