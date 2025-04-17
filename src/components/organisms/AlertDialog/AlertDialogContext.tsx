import { createContext } from "react";

export interface AlertDialogState {
  isShown: boolean;
  title: string;
  message: string;
  cancelButtonLabel?: string;
  okButtonLabel?: string;
}

export const initialState: AlertDialogState = {
  isShown: false,
  title: "",
  message: "",
  cancelButtonLabel: "아니오",
  okButtonLabel: "네",
};

export const AlertDialogStateContext =
  createContext<AlertDialogState>(initialState);

export const AlertDialogActionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  showAlertDialog: (_?: Partial<Omit<AlertDialogState, "isShown">>) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideAlertDialog: () => {},
});
