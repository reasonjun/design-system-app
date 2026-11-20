import { useEffect, useId, useRef } from "react";
import { Button } from "../../atoms/Button/index.js";
import { IconButton } from "../../atoms/IconButton/index.js";
import CloseIcon from "../../../assets/icons/close.svg?react";
import { AlertDialogOptions } from "./AlertDialogContext.js";
import styles from "./styles.module.scss";

interface AlertDialogProps extends AlertDialogOptions {
  isShown: boolean;
  onConfirm: () => void;
  /** 취소·Esc·닫기 버튼으로 닫힐 때 호출된다. */
  onCancel: () => void;
}

/** AlertDialogProvider가 그리는 표시 전용 컴포넌트. 패키지에서 내보내지 않는다. */
export const AlertDialog = ({
  isShown,
  title,
  message,
  okButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isShown && !dialog.open) dialog.showModal();
    if (!isShown) dialog.close();
  }, [isShown]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.alertdialog}
      role="alertdialog"
      aria-labelledby={headingId}
      // close 이벤트는 비동기로 온다. 그사이 다시 열렸다면 이전 닫힘의 이벤트이므로 무시한다.
      onClose={(event) => {
        if (!event.currentTarget.open) onCancel();
      }}
    >
      <IconButton
        className={styles.close}
        label="닫기"
        icon={<CloseIcon role="presentation" />}
        variant="subtle"
        size="small"
        onClick={onCancel}
      />
      <div className={styles.content}>
        <h2 id={headingId} className={styles.heading}>
          {title}
        </h2>
        <p className={styles.body}>{message}</p>
      </div>
      <footer className={styles.footer}>
        {cancelButtonLabel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelButtonLabel}
          </Button>
        )}
        {okButtonLabel && (
          <Button type="button" onClick={onConfirm}>
            {okButtonLabel}
          </Button>
        )}
      </footer>
    </dialog>
  );
};
