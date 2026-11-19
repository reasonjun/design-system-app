import { ChoiceFieldGroupOption } from "../index.js";
import { getLeafValues, withSelectionState } from "../utils/optionUtils.js";

export function useChoiceFieldState(
  type: "checkbox" | "radio",
  options: ChoiceFieldGroupOption[],
  value?: string | string[],
  onChange?: (value: string | string[]) => void,
) {
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  // 렌더 중에 계산: effect로 동기화하면 첫 렌더가 빈 옵션으로 그려진다
  const optionsState = withSelectionState(options, selectedValues);

  const handleChange = (option: ChoiceFieldGroupOption) => {
    if (!onChange) return;

    if (type === "radio") {
      onChange(option.value);
      return;
    }

    const leaves = new Set(getLeafValues(option));
    onChange(
      option.checked
        ? selectedValues.filter((v) => !leaves.has(v))
        : [...new Set([...selectedValues, ...leaves])],
    );
  };

  return { optionsState, handleChange };
}
