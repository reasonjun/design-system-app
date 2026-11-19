import { useToastAction } from "../hooks.js";
import { ToastStyle } from "../ToastContext.js";
import { useState, useEffect } from "react";
import FailedIcon from "./assets/failed.svg?react";
import SucceedIcon from "./assets/succeed.svg?react";
import styles from "./styles.module.scss";

export const TOAST_DURATION = 2000;
// 첫 프레임을 data-mounted="false"로 그려야 CSS 등장 전환이 실행된다
const ENTER_TRANSITION_DELAY = 50;

interface Props {
  message: string;
  style: ToastStyle;
}

export const Toast = ({ message, style }: Props) => {
  const [isMount, setIsMount] = useState(false);
  const { hideToast } = useToastAction();

  useEffect(() => {
    const mountTimeout = setTimeout(() => {
      setIsMount(true);
    }, ENTER_TRANSITION_DELAY);

    const hideTimeout = setTimeout(() => {
      hideToast();
    }, TOAST_DURATION);

    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(hideTimeout);
    };
  }, [hideToast]);

  return (
    <p
      role="alert"
      className={styles.module}
      data-style={style}
      data-mounted={isMount}
    >
      {style === "succeed" ? (
        <SucceedIcon role="presentation" />
      ) : (
        <FailedIcon role="presentation" />
      )}
      {message}
    </p>
  );
};
