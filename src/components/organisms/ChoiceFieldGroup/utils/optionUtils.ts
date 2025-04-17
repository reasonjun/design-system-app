import { ChoiceFieldGroupOption } from "../types";

/**
 * 모든 옵션의 값을 가져오는 함수
 */
export const getAllValues = (opts: ChoiceFieldGroupOption[]): string[] => {
  const result: string[] = [];
  const traverse = (items: ChoiceFieldGroupOption[]) => {
    items.forEach((item) => {
      result.push(item.value);
      if (item.children?.length) traverse(item.children);
    });
  };
  traverse(opts);
  return result;
};

/**
 * 특정 옵션의 모든 자식 값을 가져오는 함수
 */
export const getChildValues = (option: ChoiceFieldGroupOption): string[] => {
  const result: string[] = [];
  const traverse = (item: ChoiceFieldGroupOption) => {
    if (item.children?.length) {
      item.children.forEach((child) => {
        result.push(child.value);
        traverse(child);
      });
    }
  };
  traverse(option);
  return result;
};

/**
 * 옵션의 선택 상태를 업데이트하는 함수
 */
export const updateOptionStates = (
  opts: ChoiceFieldGroupOption[],
  selected: string[]
): ChoiceFieldGroupOption[] => {
  // 첫 번째 패스: 기본 상태 계산 (bottom-up)
  const calculateStates = (
    nodes: ChoiceFieldGroupOption[]
  ): ChoiceFieldGroupOption[] => {
    return nodes.map((node) => {
      // 리프 노드 처리
      if (!node.children?.length) {
        return {
          ...node,
          checked: selected.includes(node.value),
          indeterminate: false,
        };
      }

      // 자식 노드 처리
      const processedChildren = calculateStates(node.children);

      // 자식 노드 상태 확인
      const hasCheckedChild = processedChildren.some(
        (child) => child.checked
      );
      const hasIndeterminateChild = processedChildren.some(
        (child) => child.indeterminate
      );
      const allChildrenChecked =
        processedChildren.length > 0 &&
        processedChildren.every((child) => child.checked);

      // 상태 결정
      const isDirectlySelected = selected.includes(node.value);

      let isChecked = false;
      let isIndeterminate = false;

      if (isDirectlySelected) {
        isChecked = true;
      } else if (allChildrenChecked && !hasIndeterminateChild) {
        isChecked = true;
      } else if (hasCheckedChild || hasIndeterminateChild) {
        // 자식이 하나라도 체크되었거나 indeterminate 상태면
        // 부모는 indeterminate
        isIndeterminate = true;
      }

      return {
        ...node,
        children: processedChildren,
        checked: isChecked,
        indeterminate: isIndeterminate,
      };
    });
  };

  // 상태 계산 수행
  return calculateStates(opts);
};
