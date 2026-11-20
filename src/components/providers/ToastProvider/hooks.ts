import { useContext } from "react";
import { ToastActionContext } from "./ToastContext.js";

export function useToastAction() {
  const action = useContext(ToastActionContext);
  if (!action) {
    throw new Error("useToastAction은 ToastProvider 안에서만 쓸 수 있습니다.");
  }
  return action;
}
