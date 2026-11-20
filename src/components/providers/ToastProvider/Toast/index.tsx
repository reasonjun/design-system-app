import { useEffect, useEffectEvent, useId, useState } from "react";
import { IconButton } from "../../../atoms/IconButton/index.js";
import { ToastId, ToastStyle } from "../ToastContext.js";
import ErrorIcon from "./assets/failed.svg?react";
import SuccessIcon from "./assets/succeed.svg?react";
import CloseIcon from "../../../../assets/icons/close.svg?react";
import styles from "./styles.module.scss";

export const TOAST_DURATION = 5_000;

// 오류는 읽던 내용을 끊고(alert) 닫을 때까지 남는다. 완료 안내는 순서를 기다리고(status) 스스로 닫힌다.
const STYLE: Record<
  ToastStyle,
  { role: "status" | "alert"; Icon: typeof SuccessIcon; isDismissible: boolean }
> = {
  success: { role: "status", Icon: SuccessIcon, isDismissible: false },
  error: { role: "alert", Icon: ErrorIcon, isDismissible: true },
};
// 첫 프레임을 data-mounted="false"로 그려야 CSS 등장 전환이 실행된다.
const ENTER_TRANSITION_DELAY = 50;

const useEnterTransition = () => {
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(
      () => setHasEntered(true),
      ENTER_TRANSITION_DELAY,
    );
    return () => clearTimeout(timeout);
  }, []);
  return hasEntered;
};

const useAutoHide = (isEnabled: boolean, hide: () => void) => {
  // effect 이벤트라서 부모가 다시 렌더링되며 onClose가 새로 와도 타이머가 다시 시작되지 않는다.
  const onTimeout = useEffectEvent(hide);
  useEffect(() => {
    if (!isEnabled) return;
    const timeout = setTimeout(onTimeout, TOAST_DURATION);
    return () => clearTimeout(timeout);
  }, [isEnabled]);
};

interface Props {
  id: ToastId;
  message: string;
  style: ToastStyle;
  /** 알림 랜드마크 안에 포커스나 포인터가 있는 동안 ToastProvider가 true로 둔다. */
  isPaused: boolean;
  onClose: () => void;
}

export const Toast = ({ id, message, style, isPaused, onClose }: Props) => {
  const hasEntered = useEnterTransition();
  const messageId = useId();
  const { role, Icon, isDismissible } = STYLE[style];

  useAutoHide(!isDismissible && !isPaused, onClose);

  return (
    <div
      className={styles.module}
      data-toast-id={id}
      data-style={style}
      data-mounted={hasEntered}
    >
      <Icon role="presentation" />
      {/* 메시지 자체가 라이브 영역이다. 비어 있는 채로 마운트되고 토스트가 나타날 때 채워지므로,
          글자가 들어올 때 스크린 리더는 이미 이 영역을 지켜보고 있다. */}
      <p id={messageId} role={role} className={styles.message}>
        {hasEntered && message}
      </p>
      {isDismissible && (
        <IconButton
          className={styles.close}
          label="닫기"
          // 닫기 버튼마다 어떤 오류를 닫는지 함께 읽힌다.
          aria-describedby={messageId}
          icon={<CloseIcon role="presentation" />}
          variant="subtle"
          size="small"
          onClick={onClose}
        />
      )}
    </div>
  );
};
