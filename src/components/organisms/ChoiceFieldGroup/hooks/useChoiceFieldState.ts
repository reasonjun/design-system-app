import { useState, useEffect, useCallback, useMemo, ChangeEvent } from "react";
import { ChoiceFieldGroupOption } from "../types";
import { useOptionTree } from "./useOptionTree";
import { updateOptionStates } from "../utils/optionUtils";

/**
 * ChoiceFieldGroup의 상태를 관리하는 훅
 */
export function useChoiceFieldState(
  type: "checkbox" | "radio",
  options: ChoiceFieldGroupOption[],
  value?: string | string[],
  onChange?: (value: string | string[]) => void,
) {
  const { getAllValues, getChildValues } = useOptionTree();
  const [selectAllState, setSelectAllState] = useState<
    boolean | "indeterminate"
  >(false);
  const [optionsState, setOptionsState] = useState<ChoiceFieldGroupOption[]>(
    [],
  );

  const valueArray = useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  useEffect(() => setOptionsState([...options]), [options]);

  // 옵션 변경 처리
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, option: ChoiceFieldGroupOption) => {
      if (!onChange) return;

      if (type === "radio") {
        onChange(option.value);
      } else {
        if (valueArray.includes(option.value)) {
          // 체크 해제: 자신과 모든 하위 옵션 체크 해제
          const childValues = getChildValues(option);
          const newValues = valueArray.filter(
            (v) => v !== option.value && !childValues.includes(v),
          );
          onChange(newValues);
        } else {
          // 체크: 자신과 모든 하위 옵션 체크
          const childValues = getChildValues(option);
          const newValues = [
            ...new Set([...valueArray, option.value, ...childValues]),
          ];
          onChange(newValues);
        }
      }
    },
    [type, onChange, valueArray, getChildValues],
  );

  // 전체 선택 처리
  const handleSelectAll = useCallback(() => {
    if (!onChange) return;

    if (selectAllState === true || selectAllState === "indeterminate") {
      onChange([]);
    } else {
      onChange(getAllValues(options));
    }
  }, [onChange, selectAllState, getAllValues, options]);

  // 선택 여부 확인
  const isChecked = useCallback(
    (optionValue: string, option?: ChoiceFieldGroupOption) => {
      if (type === "radio") return value === optionValue;
      // 체크박스의 경우 실제 선택된 값과 계산된 상태 모두 체크
      return (
        valueArray.includes(optionValue) ||
        (option?.checked === true && !option?.indeterminate)
      );
    },
    [type, value, valueArray],
  );

  // 선택 상태 업데이트
  useEffect(() => {
    if (type === "checkbox" && options.length > 0) {
      const allValues = getAllValues(options);
      const selectedCount = valueArray.filter((v) =>
        allValues.includes(v),
      ).length;

      if (selectedCount === 0) setSelectAllState(false);
      else if (selectedCount === allValues.length) setSelectAllState(true);
      else setSelectAllState("indeterminate");

      // 선택 상태에 따라 옵션 상태 업데이트
      const updatedOptions = updateOptionStates(options, valueArray);

      // 옵션 상태 업데이트
      setOptionsState(updatedOptions);
    }
  }, [value, options, type, valueArray, getAllValues]);

  return {
    optionsState,
    selectAllState,
    handleChange,
    handleSelectAll,
    isChecked,
  };
}
