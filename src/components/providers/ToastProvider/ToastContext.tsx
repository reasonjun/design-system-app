import { createContext } from "react";

export type ToastStyle = "success" | "error";

export type ToastId = number;

export interface ToastState {
  message: string;
  style: ToastStyle;
}

export interface ToastAction {
  /** 작업이 끝났음을 알린다. 몇 초 뒤 스스로 닫힌다. */
  showSuccess: (message: string) => ToastId;
  /** 사용자를 막지 않는 실패를 알린다. 닫을 때까지 남는다. */
  showError: (message: string) => ToastId;
  /** 토스트 하나를 닫는다. 이미 없으면 아무것도 하지 않는다. */
  dismiss: (id: ToastId) => void;
  dismissAll: () => void;
}

// Provider 밖에서 쓰면 조용히 무시하지 않고 useToastAction이 에러를 던지도록 기본값은 null이다.
export const ToastActionContext = createContext<ToastAction | null>(null);
