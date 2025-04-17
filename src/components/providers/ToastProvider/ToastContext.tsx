import { createContext } from "react";

export type ToastStyle = "succeed" | "failed" | "busy";

export interface ToastState {
  isShown: boolean;
  message: string;
  style: ToastStyle;
}

export const initialState: ToastState = {
  isShown: false,
  message: "",
  style: "succeed",
};

export const ToastStateContext = createContext<ToastState>(initialState);

export interface ToastAction {
  showToast: (state?: Partial<Omit<ToastState, "isShown">>) => void;
  hideToast: () => void;
}

export const initialAction: ToastAction = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showToast: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideToast: () => {},
};

export const ToastActionContext = createContext<ToastAction>(initialAction);
