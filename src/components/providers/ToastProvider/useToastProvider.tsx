import { useCallback, useState } from "react";
import { initialState, ToastState } from "./ToastContext.js";

export function useToastProvider(defaultState?: Partial<ToastState>) {
  const [{ isShown, message, style, id }, setState] = useState({
    ...initialState,
    ...defaultState,
    id: 0,
  });
  const showToast = useCallback(
    (props?: Partial<Omit<ToastState, "isShown">>) => {
      // id 증가: 표시 중에 다시 호출돼도 Toast를 새로 마운트해 자동 숨김 타이머를 재시작
      setState((prev) => ({
        ...prev,
        ...props,
        isShown: true,
        id: prev.id + 1,
      }));
    },
    [],
  );
  const hideToast = useCallback(() => {
    setState((prev) => ({ ...prev, isShown: false }));
  }, []);
  return { isShown, message, style, id, showToast, hideToast };
}
