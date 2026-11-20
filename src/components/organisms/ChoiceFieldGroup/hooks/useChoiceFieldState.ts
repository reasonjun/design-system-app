import type { ChoiceFieldGroupProps } from "../types.js";
import {
  type ChoiceFieldGroupOptionState,
  resolveOptionStates,
  toggleLeafValues,
} from "../utils/optionUtils.js";

// JS 사용처는 체크박스 그룹에 문자열 하나를 넘길 수 있고, ""도 올바른 라디오 값이다.
const getSelectedValues = ({ value }: ChoiceFieldGroupProps): string[] => {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
};

export function useChoiceFieldState(props: ChoiceFieldGroupProps) {
  const selectedValues = getSelectedValues(props);

  // 렌더 중에 계산한다. effect로 동기화하면 첫 렌더가 빈 옵션으로 그려진다.
  const optionStates = resolveOptionStates(props.options, selectedValues);

  const selectOption = (option: ChoiceFieldGroupOptionState) => {
    if (props.type === "radio") {
      props.onChange?.(option.value);
      return;
    }
    props.onChange?.(toggleLeafValues(selectedValues, option));
  };

  return { optionStates, selectOption };
}
