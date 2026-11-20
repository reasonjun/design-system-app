import type { ChoiceFieldProps } from "../../molecule/ChoiceField/index.js";

export interface ChoiceFieldGroupOption extends Pick<
  ChoiceFieldProps,
  "label" | "description" | "disabled" | "id"
> {
  value: string;
  children?: ChoiceFieldGroupOption[];
}

interface ChoiceFieldGroupBaseProps {
  name: string;
  label?: string;
  description?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export type ChoiceFieldGroupProps = ChoiceFieldGroupBaseProps &
  (
    | {
        type: "checkbox";
        options: ChoiceFieldGroupOption[];
        value?: string[];
        onChange?: (value: string[]) => void;
      }
    | {
        type: "radio";
        options: Omit<ChoiceFieldGroupOption, "children">[];
        value?: string;
        onChange?: (value: string) => void;
      }
  );
