import { useContext } from "react";
import { AlertDialogActionContext } from "./AlertDialogContext.js";

export function useAlertDialogAction() {
  const action = useContext(AlertDialogActionContext);
  if (!action) {
    throw new Error(
      "useAlertDialogAction은 AlertDialogProvider 안에서만 쓸 수 있습니다.",
    );
  }
  return action;
}
