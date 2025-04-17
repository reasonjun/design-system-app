import { useCallback } from 'react';
import { ChoiceFieldGroupOption } from '../types';
import { getAllValues, getChildValues } from '../utils/optionUtils';

/**
 * 옵션 트리를 관리하는 훅
 */
export function useOptionTree() {
  // 모든 값 가져오기 - useCallback으로 최적화
  const getAllValuesCallback = useCallback(
    (opts: ChoiceFieldGroupOption[]): string[] => {
      return getAllValues(opts);
    }, 
    []
  );

  // 자식 값 가져오기 - useCallback으로 최적화
  const getChildValuesCallback = useCallback(
    (option: ChoiceFieldGroupOption): string[] => {
      return getChildValues(option);
    }, 
    []
  );

  return { 
    getAllValues: getAllValuesCallback, 
    getChildValues: getChildValuesCallback 
  };
}
