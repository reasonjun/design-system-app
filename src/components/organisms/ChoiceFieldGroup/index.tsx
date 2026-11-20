import { useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { DescriptionMessage } from "../../atoms/DescriptionMessage/index.js";
import { ErrorMessage } from "../../atoms/ErrorMessage/index.js";
import { RequiredMark } from "../../atoms/RequiredMark/index.js";
import { ChoiceField } from "../../molecule/ChoiceField/index.js";

import { useChoiceFieldState } from "./hooks/useChoiceFieldState.js";
import type { ChoiceFieldGroupOptionState } from "./utils/optionUtils.js";
import type { ChoiceFieldGroupOption, ChoiceFieldGroupProps } from "./types.js";

export type { ChoiceFieldGroupOption, ChoiceFieldGroupProps };

// ARIA 1.2에서 일반 group에는 aria-invalid·aria-required를 쓸 수 없다. 라디오는 radiogroup에
// 두 속성을 붙이고, 체크박스는 각 입력에 invalid를 표시하고 legend에 "(필수)"를 적는다.
const getGroupRoleProps = (
  type: ChoiceFieldGroupProps["type"],
  isInvalid: boolean,
  isRequired: boolean,
) => {
  if (type === "checkbox") return {};
  return {
    role: "radiogroup",
    "aria-invalid": isInvalid || undefined,
    "aria-required": isRequired || undefined,
  } as const;
};

interface OptionListContext {
  type: ChoiceFieldGroupProps["type"];
  name: string;
  idPrefix: string;
  inputErrorId?: string;
  onSelect: (option: ChoiceFieldGroupOptionState) => void;
}

const toInputId = (
  idPrefix: string,
  option: ChoiceFieldGroupOption,
  path: string,
) => option.id ?? `${idPrefix}-${path}`;

const toChildPath = (path: string, index: number) => `${path}-${index}`;

// 부모 상태는 자식에서 계산되므로 폼에는 리프 값만 제출한다.
const toFormName = (option: ChoiceFieldGroupOptionState, name: string) => {
  if (option.children?.length) return undefined;
  return name;
};

const ChoiceOption = ({
  option,
  path,
  context,
}: {
  option: ChoiceFieldGroupOptionState;
  path: string;
  context: OptionListContext;
}) => {
  const children = option.children ?? [];
  const childPaths = children.map((_, index) => toChildPath(path, index));
  const childInputIds = children.map((child, index) =>
    toInputId(context.idPrefix, child, childPaths[index]),
  );

  return (
    <div className={styles.optionGroup}>
      <ChoiceField
        type={context.type}
        id={toInputId(context.idPrefix, option, path)}
        name={toFormName(option, context.name)}
        label={option.label}
        description={option.description}
        value={option.value}
        disabled={option.disabled}
        checked={option.checked}
        indeterminate={option.indeterminate}
        onChange={() => context.onSelect(option)}
        aria-invalid={Boolean(context.inputErrorId) || undefined}
        aria-describedby={context.inputErrorId}
        aria-controls={clsx(...childInputIds) || undefined}
      />

      {children.length > 0 && (
        <div role="group" aria-label={option.label} className={styles.children}>
          {children.map((child, index) => (
            <ChoiceOption
              key={`${index}-${child.value}`}
              option={child}
              path={childPaths[index]}
              context={context}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * checkbox 계층 선택 규칙
 * - `value`에는 선택된 리프 옵션 값만 담는다. 부모 값은 무시되며, 부모 상태는 자식으로부터 계산된다.
 * - 비활성 노드는 부모 선택에 포함되지 않는다. 부모를 눌러도 비활성 자식은 바뀌지 않는다.
 * - 바꿀 수 있는 자식이 없는 부모와 비활성 부모의 자식은 모두 비활성으로 표시된다.
 */
export const ChoiceFieldGroup = (props: ChoiceFieldGroupProps) => {
  const {
    type,
    name,
    label,
    description,
    orientation = "vertical",
    disabled,
    required,
    error,
    className,
  } = props;
  const fieldsetId = useId();
  const descriptionId = `${fieldsetId}-description`;
  const errorId = `${fieldsetId}-error`;
  const isInvalid = Boolean(error);
  const { optionStates, selectOption } = useChoiceFieldState(props);

  const context: OptionListContext = {
    type,
    name,
    idPrefix: fieldsetId,
    inputErrorId: (type === "checkbox" && isInvalid && errorId) || undefined,
    onSelect: selectOption,
  };

  return (
    <fieldset
      className={clsx(
        styles["choice-field-group"],
        styles[orientation],
        disabled && styles.disabled,
        isInvalid && styles.error,
        className,
      )}
      disabled={disabled}
      id={fieldsetId}
      {...getGroupRoleProps(type, isInvalid, Boolean(required))}
      aria-describedby={
        clsx(
          type === "radio" && isInvalid && errorId,
          description && descriptionId,
        ) || undefined
      }
    >
      {label && (
        <legend className={styles.legend}>
          {label}
          {required && <RequiredMark shouldAnnounce={type === "checkbox"} />}
        </legend>
      )}

      {description && (
        <DescriptionMessage id={descriptionId} className={styles.description}>
          {description}
        </DescriptionMessage>
      )}

      <div className={styles.options}>
        {optionStates.map((option, index) => (
          // 인덱스 + 값: 순서가 바뀌면 다른 옵션에 포커스가 남지 않도록 다시 마운트하고,
          // 값이 무시되는 부모끼리는 값이 겹칠 수 있다.
          <ChoiceOption
            key={`${index}-${option.value}`}
            option={option}
            path={String(index)}
            context={context}
          />
        ))}
      </div>

      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </fieldset>
  );
};
