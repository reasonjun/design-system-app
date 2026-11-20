import { createContext } from "react";

export interface AlertDialogOptions {
  title: string;
  message: string;
  /** 기본값 "아니오". `undefined`를 넘기면 취소 버튼을 숨긴다. */
  cancelButtonLabel?: string;
  /** 기본값 "네". */
  okButtonLabel?: string;
}

export const defaultOptions: AlertDialogOptions = {
  title: "",
  message: "",
  cancelButtonLabel: "아니오",
  okButtonLabel: "네",
};

export interface AlertDialogAction {
  /**
   * 다이얼로그를 열고, 닫힐 때 사용자의 결정을 돌려준다.
   * 확인은 `true`, 취소·Esc·닫기 버튼·`hideAlertDialog`는 `false`다.
   * 열려 있는 동안 다시 열거나 Provider가 사라지면 이전 결과는 `false`로 끝난다.
   * 확인 뒤에 할 일은 호출한 쪽에서 결과를 보고 처리한다.
   *
   * @example
   * if (await showAlertDialog({ title: "삭제", message: "삭제할까요?" })) {
   *   await remove(id);
   * }
   */
  showAlertDialog: (options: AlertDialogOptions) => Promise<boolean>;
  /** 다이얼로그를 닫는다. 결과는 `false`다. */
  hideAlertDialog: () => void;
}

// Provider 밖에서 쓰면 조용히 무시하지 않고 훅이 에러를 던지도록 기본값은 null이다.
export const AlertDialogActionContext = createContext<AlertDialogAction | null>(
  null,
);
