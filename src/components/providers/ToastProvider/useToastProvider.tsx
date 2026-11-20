import { useRef, useState } from "react";
import { ToastId, ToastState, ToastStyle } from "./ToastContext.js";

type ToastItem = ToastState & { id: ToastId };

export function useToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const showToast = (message: string, style: ToastStyle): ToastId => {
    const toast = { id: nextId.current++, message, style };
    setToasts((prev) => [toast, ...prev]); // 새 토스트가 맨 앞
    return toast.id;
  };
  const removeToast = (id: ToastId) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  const removeAllToasts = () => setToasts([]);
  const showSuccess = (message: string) => showToast(message, "success");
  const showError = (message: string) => showToast(message, "error");

  return { toasts, removeToast, removeAllToasts, showSuccess, showError };
}
