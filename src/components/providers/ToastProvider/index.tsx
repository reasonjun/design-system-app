import { ReactNode } from "react";
import { Toast } from "./Toast";
import {
  ToastActionContext,
  ToastState,
  ToastStateContext,
  ToastStyle,
} from "./ToastContext";
import { useToastProvider } from "./useToastProvider";

// eslint-disable-next-line react-refresh/only-export-components
export { useToastAction, useToastState } from "./hooks";
export type { ToastState, ToastStyle };

export const ToastProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState?: Partial<ToastState>;
}) => {
  const { isShown, message, style, showToast, hideToast } =
    useToastProvider(defaultState);
  return (
    <>
      {/* 하위 컴포넌트에서 isShown, message, style을 참조할 수 있다 */}
      <ToastStateContext.Provider value={{ isShown, message, style }}>
        {/* 하위 컴포넌트에서 showToast, hideToast를 참조할 수 있다 */}
        <ToastActionContext.Provider value={{ showToast, hideToast }}>
          {children}
          {isShown && <Toast message={message} style={style} />}{" "}
        </ToastActionContext.Provider>
      </ToastStateContext.Provider>
    </>
  );
};
