import type { ChoiceFieldGroupOption } from "../types.js";

export interface ChoiceFieldGroupOptionState extends ChoiceFieldGroupOption {
  checked: boolean;
  indeterminate: boolean;
  children?: ChoiceFieldGroupOptionState[];
}

const getSelectableLeafValues = (option: ChoiceFieldGroupOption): string[] => {
  if (option.disabled) return [];
  if (!option.children?.length) return [option.value];
  return option.children.flatMap(getSelectableLeafValues);
};

export const toggleLeafValues = (
  selectedValues: string[],
  option: ChoiceFieldGroupOptionState,
): string[] => {
  const leafValues = new Set(getSelectableLeafValues(option));
  if (option.checked) {
    return selectedValues.filter((value) => !leafValues.has(value));
  }
  return [...new Set([...selectedValues, ...leafValues])];
};

const isEveryChildDisabled = (children: ChoiceFieldGroupOptionState[]) =>
  children.every((child) => child.disabled);

const isEverySelectableChildChecked = (
  children: ChoiceFieldGroupOptionState[],
) =>
  children.some((child) => child.checked) &&
  children.every((child) => child.checked || child.disabled);

const hasCheckedDescendant = (children: ChoiceFieldGroupOptionState[]) =>
  children.some((child) => child.checked || child.indeterminate);

export const resolveOptionStates = (
  options: ChoiceFieldGroupOption[],
  selectedValues: string[],
): ChoiceFieldGroupOptionState[] => {
  const selected = new Set(selectedValues);

  const resolve = (
    option: ChoiceFieldGroupOption,
    isParentDisabled = false,
  ): ChoiceFieldGroupOptionState => {
    const disabled = Boolean(option.disabled) || isParentDisabled;
    if (!option.children?.length) {
      return {
        ...option,
        children: undefined,
        disabled,
        checked: selected.has(option.value),
        indeterminate: false,
      };
    }

    const children = option.children.map((child) => resolve(child, disabled));
    const checked = isEverySelectableChildChecked(children);
    return {
      ...option,
      children,
      disabled: disabled || isEveryChildDisabled(children),
      checked,
      indeterminate: !checked && hasCheckedDescendant(children),
    };
  };

  return options.map((option) => resolve(option));
};
