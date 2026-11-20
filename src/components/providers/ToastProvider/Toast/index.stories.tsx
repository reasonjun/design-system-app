import type { Meta, StoryObj } from "@storybook/react-vite";
import { TOAST_DURATION } from ".";
import { useEffect } from "react";
import { ToastProvider, ToastState, useToastAction } from "..";
import { expect, within } from "storybook/test";

// 공개 API(useToastAction)로 args의 토스트를 띄운다. Controls로 args가 바뀌면 이전 토스트를 닫고 새로 띄운다.
function ShowToast({ message, style }: ToastState) {
  const { showSuccess, showError, dismiss } = useToastAction();
  useEffect(() => {
    const show = { success: showSuccess, error: showError }[style];
    const id = show(message);
    return () => dismiss(id);
  }, [message, style, showSuccess, showError, dismiss]);
  return null;
}

/**
 * 토스트는 사용자가 한 작업의 결과를 잠깐 알릴 때 씁니다. 상황에 따라 맞는 컴포넌트가 다릅니다.
 *
 * | 상황 | 쓸 것 | 예 |
 * |---|---|---|
 * | 작업이 끝났음을 확인시킬 때 | `useToastAction().showSuccess(message)` | 저장했습니다 |
 * | 흐름을 막지 않는 실패를 알릴 때 | `useToastAction().showError(message)` | 저장에 실패했습니다 |
 * | 입력값이 잘못됐을 때 | 입력 컴포넌트의 `error` prop (TextField, ChoiceFieldGroup) | 이메일 형식이 아닙니다 |
 * | 사용자의 결정이 필요하거나 되돌릴 수 없을 때 | AlertDialog | 삭제할까요? |
 *
 * - `showSuccess`는 5초 뒤 닫힙니다. 토스트 영역에 마우스를 올리거나 포커스가 있는 동안은 모든 토스트가 닫히지 않습니다.
 * - 토스트 영역은 "알림 (F8)" 랜드마크입니다. 키보드 사용자는 F8로 바로 들어갈 수 있습니다.
 * - `showError`는 자동으로 닫히지 않고 닫기 버튼이 있습니다.
 * - 오류를 토스트로만 알리지 마세요. 고쳐야 할 위치가 있으면 그곳에도 표시합니다.
 * - 토스트는 오른쪽 위에 새 것부터 쌓이고 개수 제한은 없습니다. 화면 높이를 넘으면 쌓인 영역 안에서 스크롤됩니다.
 * - 고정 헤더가 있으면 `--toast-offset-top`(기본 2rem)으로 헤더 아래로 내리세요. 일반 콘텐츠와의 겹침 순서는 `--toast-z-index`(기본 1000)로 바꿀 수 있습니다.
 * - AlertDialog 같은 모달이 열려 있는 동안에는 모달 바깥이 비활성(inert)이 되어, 토스트를 누르거나 F8로 들어갈 수 없습니다. 모달은 브라우저의 최상위 레이어에 그려지므로 `--toast-z-index`로도 모달 위에 올릴 수 없습니다. 모달 안의 결과는 모달 안에서 알리세요.
 */
const meta = {
  title: "Providers/ToastProvider/Toast",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      // 토스트는 position: fixed라서 Docs 페이지에서 스토리마다 별도 프레임이 필요하다.
      story: { inline: false, iframeHeight: 200 },
    },
  },
  argTypes: {
    style: { control: "inline-radio", options: ["success", "error"] },
  },
  render: (args) => (
    <ToastProvider>
      <ShowToast {...args} />
    </ToastProvider>
  ),
} satisfies Meta<ToastState>;

export default meta;
type Story = StoryObj<typeof meta>;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const Success: Story = {
  args: { message: "성공했습니다", style: "success" },
  play: async ({ canvas }) => {
    // 보이는 메시지가 곧 라이브 영역이므로 DOM에 한 번만 있다.
    const message = await canvas.findByText("성공했습니다");
    await expect(message).toHaveAttribute("role", "status");
    await expect(canvas.queryByRole("alert")).toBeNull();
  },
};

export const ErrorToast: Story = {
  name: "Error",
  args: { message: "실패했습니다", style: "error" },
  play: async ({ canvas, userEvent }) => {
    const alert = await canvas.findByText("실패했습니다");
    await expect(alert).toHaveAttribute("role", "alert");
    await expect(within(alert).queryByRole("button")).toBeNull();
    await expect(canvas.queryByRole("status")).toBeNull();

    await wait(TOAST_DURATION + 500);
    await expect(alert).toHaveTextContent("실패했습니다");

    const close = canvas.getByRole("button", { name: "닫기" });
    await expect(close).toHaveAccessibleDescription("실패했습니다");
    await userEvent.click(close);
    await expect(canvas.queryByRole("alert")).toBeNull();
  },
};
