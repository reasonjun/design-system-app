import { useEffect, useId, useRef } from "react";
import { Button } from "../../atoms/Button/index.js";
import { IconButton } from "../../atoms/IconButton/index.js";
import { useAlertDialogAction, useAlertDialogState } from "./hooks.js";
import styles from "./styles.module.scss";

interface AlertDialogProps {
  onConfirm?: () => void;
}

export const AlertDialog = ({ onConfirm }: AlertDialogProps) => {
  const { isShown, title, message, okButtonLabel, cancelButtonLabel } =
    useAlertDialogState();
  const { hideAlertDialog } = useAlertDialogAction();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isShown && !dialog.open) dialog.showModal();
    if (!isShown) dialog.close();
  }, [isShown]);

  const handleOkClick = () => {
    onConfirm?.();
    hideAlertDialog();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.alertdialog}
      role="alertdialog"
      aria-labelledby={headingId}
      onClose={hideAlertDialog}
    >
      <IconButton
        className={styles.close}
        label="닫기"
        icon="×"
        variant="subtle"
        onClick={hideAlertDialog}
      />
      <div className={styles.content}>
        <h2 id={headingId} className={styles.heading}>
          {title}
        </h2>
        <p className={styles.body}>{message}</p>
      </div>
      <footer className={styles.footer}>
        {cancelButtonLabel && (
          <Button type="button" variant="secondary" onClick={hideAlertDialog}>
            {cancelButtonLabel}
          </Button>
        )}
        {okButtonLabel && (
          <Button type="button" onClick={handleOkClick}>
            {okButtonLabel}
          </Button>
        )}
      </footer>
    </dialog>
  );
};
