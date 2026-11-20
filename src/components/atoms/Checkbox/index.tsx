import { ComponentProps, MouseEvent } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface CheckboxProps extends ComponentProps<"input"> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = ({
  label,
  indeterminate = false,
  className,
  ref,
  onClick,
  ...props
}: CheckboxProps) => {
  // ref 콜백은 페인트 전에 실행되므로 혼합 상태가 체크 해제로 깜빡이지 않는다.
  // 사용처의 ref에도 요소를 전달한다. 그러지 않으면 사용처 ref가 이 ref를 덮어쓴다.
  const setRef = (input: HTMLInputElement | null) => {
    if (input) input.indeterminate = indeterminate;
    if (typeof ref === "function") return ref(input);
    if (ref) ref.current = input;
  };

  // 브라우저는 클릭할 때마다 indeterminate를 지운다. prop이 바뀔 때까지 유지한다.
  // onChange가 아니라 onClick인 이유: React가 사용처의 onChange보다 먼저 실행하므로 그쪽의
  // 상태 업데이트(flushSync 포함)가 최종 결과가 되고, checked만 있고 onChange가 없을 때의
  // React 경고도 사용처에 그대로 전달된다.
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.currentTarget.indeterminate = indeterminate;
    onClick?.(event);
  };

  return (
    <input
      type="checkbox"
      className={clsx(styles.module, className)}
      aria-label={label}
      {...props}
      onClick={handleClick}
      ref={setRef}
    />
  );
};
