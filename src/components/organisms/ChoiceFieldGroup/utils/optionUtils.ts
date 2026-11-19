import { ChoiceFieldGroupOption } from "../index.js";

export const getLeafValues = (option: ChoiceFieldGroupOption): string[] =>
  option.children?.length
    ? option.children.flatMap(getLeafValues)
    : [option.value];

export const withSelectionState = (
  options: ChoiceFieldGroupOption[],
  selectedValues: string[],
): ChoiceFieldGroupOption[] => {
  const selected = new Set(selectedValues);
  const calculate = (node: ChoiceFieldGroupOption): ChoiceFieldGroupOption => {
    if (!node.children?.length) {
      return {
        ...node,
        checked: selected.has(node.value),
        indeterminate: false,
      };
    }
    const children = node.children.map(calculate);
    const checked = children.every((child) => child.checked);
    return {
      ...node,
      children,
      checked,
      indeterminate:
        !checked &&
        children.some((child) => child.checked || child.indeterminate),
    };
  };
  return options.map(calculate);
};
