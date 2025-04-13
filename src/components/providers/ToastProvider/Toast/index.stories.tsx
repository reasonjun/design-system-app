import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from ".";
import { ToastProvider, ToastState } from "../.";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Providers/ToastProvider/Toast",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

function createDecorator(defaultState?: Partial<ToastState>) {
  return function Decorator(Story: React.ComponentType) {
    return (
      <ToastProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </ToastProvider>
    );
  };
}

// 실제로 등록할 스토리
export const Succeed: Story = {
  decorators: [createDecorator({ message: "성공했습니다", style: "succeed" })],
};

export const Failed: Story = {
  decorators: [createDecorator({ message: "실패했습니다", style: "failed" })],
};

export const Busy: Story = {
  decorators: [createDecorator({ message: "통신 중입니다", style: "busy" })],
};
