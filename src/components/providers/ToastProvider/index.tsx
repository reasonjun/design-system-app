import { ReactNode, useRef, useState } from "react";
import { Toast } from "./Toast/index.js";
import {
  ToastActionContext,
  ToastId,
  ToastState,
  ToastStyle,
} from "./ToastContext.js";
import { useToastProvider } from "./useToastProvider.js";
import { useNotificationsHotkey, useToastFocus } from "./useToastFocus.js";
import styles from "./styles.module.scss";

// eslint-disable-next-line react-refresh/only-export-components
export { useToastAction } from "./hooks.js";
export type { ToastId, ToastState, ToastStyle };

/** 앱에 한 번 둔다. 토스트는 `useToastAction()`으로 띄운다. */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { toasts, removeToast, removeAllToasts, showSuccess, showError } =
    useToastProvider();
  const stackRef = useRef<HTMLDivElement>(null);
  const { rememberReturnFocus, returnFocus, keepFocus } =
    useToastFocus(stackRef);
  useNotificationsHotkey(stackRef);

  // 랜드마크 안에 포커스나 포인터가 있는 동안 모든 타이머가 멈춘다.
  const [isPaused, setIsPaused] = useState(false);

  const dismiss = (id: ToastId) => {
    // toasts 배열 대신 DOM으로 찾는다. toasts를 읽으면 dismiss가 매번 새 함수가 되어,
    // effect 의존성에 dismiss를 넣은 사용처가 무한히 다시 실행된다.
    keepFocus((toast) => toast.getAttribute("data-toast-id") === String(id));
    removeToast(id);
  };
  const dismissAll = () => {
    keepFocus(() => true);
    removeAllToasts();
  };

  return (
    <ToastActionContext.Provider
      value={{ showSuccess, showError, dismiss, dismissAll }}
    >
      {children}
      <div className={styles.viewport}>
        <div
          ref={stackRef}
          role="region"
          aria-label="알림 (F8)"
          tabIndex={-1}
          className={styles.stack}
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => setIsPaused(false)}
          onKeyDown={(event) => {
            // Escape는 랜드마크를 나가 포커스가 들어온 곳으로 돌아간다.
            if (event.key !== "Escape") return;
            event.preventDefault();
            returnFocus();
          }}
          onFocus={(event) => {
            setIsPaused(true);
            rememberReturnFocus(event);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              style={toast.style}
              isPaused={isPaused}
              onClose={() => dismiss(toast.id)}
            />
          ))}
        </div>
      </div>
    </ToastActionContext.Provider>
  );
};
