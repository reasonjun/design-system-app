import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useEffectEvent } from "react";
import { expect, fireEvent, fn, mocked, waitFor } from "storybook/test";
import { Button } from "../../atoms/Button/index.js";
import {
  AlertDialogOptions,
  AlertDialogProvider,
  useAlertDialogAction,
} from ".";

type StoryArgs = AlertDialogOptions & {
  onResult: (confirmed: boolean) => void;
};

// 공개 API로 args의 다이얼로그를 연다. 처음 그릴 때와 Controls로 args가 바뀔 때 열린다.
function OpenDialog({ onResult, ...options }: StoryArgs) {
  const { showAlertDialog } = useAlertDialogAction();
  const open = () => showAlertDialog(options).then(onResult);
  const openOnArgsChange = useEffectEvent(open);
  const { title, message, okButtonLabel, cancelButtonLabel } = options;
  useEffect(() => {
    openOnArgsChange();
  }, [title, message, okButtonLabel, cancelButtonLabel]);
  return <Button onClick={open}>다이얼로그 열기</Button>;
}

/**
 * 되돌릴 수 없는 작업 전에 사용자의 결정을 받습니다.
 * `AlertDialogProvider`를 앱에 한 번 두고, `useAlertDialogAction().showAlertDialog()`로 엽니다.
 *
 * ```tsx
 * const { showAlertDialog } = useAlertDialogAction();
 * if (await showAlertDialog({ title: "삭제", message: "삭제할까요?" })) {
 *   await remove(id);
 * }
 * ```
 *
 * - 확인하면 `true`, 취소·Esc·닫기 버튼은 `false`로 끝납니다.
 * - 열려 있는 동안 다시 열면 이전 결과는 `false`로 끝나고 새 다이얼로그가 열립니다.
 */
const meta = {
  title: "Organisms/AlertDialog",
  tags: ["autodocs"],
  args: { onResult: fn() },
  render: (args) => (
    <AlertDialogProvider>
      <OpenDialog {...args} />
    </AlertDialogProvider>
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "알림", message: "성공했습니다" },
  play: async ({ args, canvas, userEvent, step }) => {
    const dialog = (await canvas.findByRole(
      "alertdialog",
    )) as HTMLDialogElement;
    // 모달 바깥은 inert라 접근성 트리에서 빠지므로 hidden까지 찾는다.
    const openButton = canvas.getByRole("button", {
      name: "다이얼로그 열기",
      hidden: true,
    });
    const onResult = mocked(args.onResult);
    const reopen = async () => {
      onResult.mockClear();
      await userEvent.click(openButton);
      await waitFor(() => expect(dialog).toHaveAttribute("open"));
    };
    // Esc는 close 이벤트가 비동기로 와서 결과도 나중에 정해지므로, 결과를 기다린 뒤 닫힘을 확인한다.
    const expectClosedWith = async (confirmed: boolean) => {
      await waitFor(() => expect(onResult).toHaveBeenCalledWith(confirmed));
      await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
      await expect(onResult).toHaveBeenCalledOnce();
    };

    await expect(dialog).toHaveAccessibleName("알림");
    await expect(dialog.matches(":modal")).toBe(true);
    await expect(dialog).toContainElement(
      document.activeElement as HTMLElement,
    );

    await step("확인하면 true로 한 번만 끝난다", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "네" }));
      await expectClosedWith(true);
    });

    await step("취소하면 false", async () => {
      await reopen();
      await userEvent.click(canvas.getByRole("button", { name: "아니오" }));
      await expectClosedWith(false);
    });

    await step("Esc를 누르면 false", async () => {
      await reopen();
      // 합성 Escape 이벤트는 브라우저의 cancel 동작을 일으키지 않는다. requestClose()가 같은 경로를 탄다.
      dialog.requestClose();
      await expectClosedWith(false);
    });

    await step("닫기 버튼을 누르면 false", async () => {
      await reopen();
      await userEvent.click(canvas.getByRole("button", { name: "닫기" }));
      await expectClosedWith(false);
    });

    await step("열린 채로 다시 열면 이전 결과는 false로 끝난다", async () => {
      await reopen();
      // 사용자는 inert인 바깥 버튼을 누를 수 없다. 코드에서 다시 여는 상황을 fireEvent로 흉내 낸다.
      fireEvent.click(openButton);
      await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
      await expect(dialog).toHaveAttribute("open");

      onResult.mockClear();
      await userEvent.click(canvas.getByRole("button", { name: "네" }));
      await expectClosedWith(true);
    });
  },
};

export const CustomButtonLabel: Story = {
  args: {
    title: "기사 공개 확인",
    message: "기사를 공개합니다. 진행하시겠습니까?",
    cancelButtonLabel: "CANCEL",
    okButtonLabel: "OK",
  },
};

export const ExcludeCancel: Story = {
  args: {
    title: "전송 완료",
    message: "전송됐습니다",
    cancelButtonLabel: undefined,
    okButtonLabel: "OK",
  },
};
