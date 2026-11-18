import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, TOAST_DURATION } from ".";
import { ToastProvider, ToastState, useToastAction } from "..";
import { expect } from "storybook/test";

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

function ShowToastButtons() {
  const { showToast } = useToastAction();
  return ["A", "B"].map((message) => (
    <button
      key={message}
      onClick={() => showToast({ message, style: "succeed" })}
    >
      {message}
    </button>
  ));
}

export const RestartTimerOnShowAgain: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: () => <ShowToastButtons />,
  play: async ({ canvas, userEvent }) => {
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await userEvent.click(canvas.getByRole("button", { name: "A" }));
    await wait(TOAST_DURATION * 0.75);
    await userEvent.click(canvas.getByRole("button", { name: "B" }));
    await wait(TOAST_DURATION * 0.5); // A 기준 1.25배: 타이머가 재시작되지 않았다면 이미 사라졌을 시점
    await expect(canvas.getByRole("alert")).toHaveTextContent("B");
  },
};
