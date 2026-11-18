import { useContext } from "react";
import {
  AlertDialogActionContext,
  AlertDialogStateContext,
} from "./AlertDialogContext.js";

export function useAlertDialogAction() {
  return useContext(AlertDialogActionContext);
}

export function useAlertDialogState() {
  return useContext(AlertDialogStateContext);
}
