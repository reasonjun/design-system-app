import { Button } from "../../atoms/Button";
import { IconButton } from "../../atoms/IconButton";
import { useAlertDialogAction, useAlertDialogState } from "./hooks";
import styles from "./styles.module.css";

interface AlertDialogProps {
  onConfirm?: () => void;
}

export const AlertDialog = ({ onConfirm }: AlertDialogProps) => {
  const { isShown, title, message, okButtonLabel, cancelButtonLabel } =
    useAlertDialogState();
  const { hideAlertDialog } = useAlertDialogAction();

  if (!isShown) return null;

  const handleOkClick = () => {
    onConfirm?.();
    hideAlertDialog();
  };

  return (
    <div className={styles.module}>
      <div className={styles.alertdialog} role="alertdialog" aria-label="확인">
        <IconButton
          className={styles.close}
          label="닫기"
          icon="×"
          variant="subtle"
          onClick={hideAlertDialog}
        />
        <div className={styles.content}>
          <h2 className={styles.heading}>{title}</h2>
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
      </div>
    </div>
  );
};
