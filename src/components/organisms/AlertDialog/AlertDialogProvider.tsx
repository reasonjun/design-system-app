import { ReactNode, useEffect, useRef, useState } from "react";
import { AlertDialog } from "./AlertDialog.js";
import {
  AlertDialogActionContext,
  AlertDialogOptions,
  defaultOptions,
} from "./AlertDialogContext.js";

/** 앱에 한 번 둔다. 다이얼로그는 Provider가 직접 그린다. */
export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isShown, setIsShown] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const resolveRef = useRef<((result: boolean) => void) | null>(null);

  // 결과는 한 번만 정한다. 확인 직후 dialog.close()가 close 이벤트를 다시 일으켜도 무시된다.
  const settle = (result: boolean) => {
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.(result);
  };

  // Provider가 사라지면 기다리던 호출부가 멈추지 않도록 false로 끝낸다.
  useEffect(() => () => settle(false), []);

  const showAlertDialog = (next: AlertDialogOptions) => {
    settle(false);
    // 이전에 연 다이얼로그의 문구가 남지 않도록 매번 기본값에서 시작한다.
    setOptions({ ...defaultOptions, ...next });
    setIsShown(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const hideAlertDialog = () => {
    settle(false);
    setIsShown(false);
  };

  const confirmAlertDialog = () => {
    settle(true);
    setIsShown(false);
  };

  return (
    <AlertDialogActionContext.Provider
      value={{ showAlertDialog, hideAlertDialog }}
    >
      {children}
      <AlertDialog
        {...options}
        isShown={isShown}
        onConfirm={confirmAlertDialog}
        onCancel={hideAlertDialog}
      />
    </AlertDialogActionContext.Provider>
  );
};
