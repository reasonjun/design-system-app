import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { AlertDialog, AlertDialogProvider } from ".";
import { AlertDialogState } from "./AlertDialogContext.js";

function createDecorator(defaultState?: Partial<AlertDialogState>) {
  return function Decorator(Story: React.ComponentType) {
    return (
      <AlertDialogProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </AlertDialogProvider>
    );
  };
}

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  title: "Organisms/AlertDialog",
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  decorators: [createDecorator({ title: "알림", message: "성공했습니다" })],
  render: () => (
    <AlertDialog
      onConfirm={() => {
        console.log("확인 버튼이 눌렸습니다!");
      }}
    />
  ),
};

export const CustomButtonLabel: Story = {
  decorators: [
    createDecorator({
      title: "기사 공개 확인",
      message: "기사를 공개합니다. 진행하시겠습니까?",
      cancelButtonLabel: "CANCEL",
      okButtonLabel: "OK",
    }),
  ],
};

export const ExcludeCancel: Story = {
  decorators: [
    createDecorator({
      title: "전송 완료",
      message: "전송됐습니다",
      cancelButtonLabel: undefined,
      okButtonLabel: "OK",
    }),
  ],
};

export const ModalFocusAndEscape: Story = {
  ...Default,
  play: async ({ canvas }) => {
    const dialog = (await canvas.findByRole(
      "alertdialog",
    )) as HTMLDialogElement;
    await expect(dialog).toHaveAccessibleName("알림");
    await expect(dialog.matches(":modal")).toBe(true);
    await expect(dialog).toContainElement(
      document.activeElement as HTMLElement,
    );
    // Synthetic Escape skips the native cancel action; requestClose() runs the same cancel → close path.
    dialog.requestClose();
    await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
  },
};
