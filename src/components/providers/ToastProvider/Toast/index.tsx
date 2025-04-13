import { useToastAction } from "../hooks";
import { ToastStyle } from "../ToastContext";
import { useState, useEffect } from "react";
import FailedIcon from "./assets/failed.svg?react";
import SucceedIcon from "./assets/succeed.svg?react";
import styles from "./styles.module.css";

type Props = { message: string; style: ToastStyle };

export const Toast = ({ message, style }: Props) => {
  const [isMount, setIsMount] = useState(false);
  const { hideToast } = useToastAction();

  useEffect(() => {
    // Mount animation with delay
    const mountTimeout = setTimeout(() => {
      setIsMount(true);
    }, 50);

    // Auto-hide toast after 2 seconds
    const hideTimeout = setTimeout(() => {
      hideToast();
    }, 2000);

    // Clean up timers
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
