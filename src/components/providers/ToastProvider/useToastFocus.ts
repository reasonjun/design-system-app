import { FocusEvent, RefObject, useEffect, useRef } from "react";

/**
 * 알림 랜드마크 안의 포커스를 관리한다.
 * - `rememberReturnFocus`: 랜드마크에 들어올 때(Tab, F8, 클릭) 포커스가 있던 곳을 기억한다.
 * - `keepFocus`: 토스트를 지우기 직전에 호출해 포커스가 `<body>`로 떨어지지 않게 한다.
 * - `returnFocus`: 기억해 둔 곳으로 포커스를 돌려보낸다.
 */
export function useToastFocus(stackRef: RefObject<HTMLDivElement | null>) {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const rememberReturnFocus = (event: FocusEvent<HTMLElement>) => {
    const from = event.relatedTarget;
    if (from instanceof HTMLElement && !event.currentTarget.contains(from)) {
      returnFocusRef.current = from;
    }
  };

  const returnFocus = () => {
    if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
  };

  // 포커스된 토스트를 지우면 포커스가 <body>로 떨어진다. 남은 토스트 중 아래, 없으면 위,
  // 그것도 없으면 들어오기 전 자리로 옮긴다. 브라우저가 포커스 링을 보일 때(키보드·보조기기)만
  // 옮긴다. Chrome은 마우스 클릭에도 버튼에 포커스를 주는데, 그때 옮기면 페이지가 예전 위치로
  // 스크롤된다.
  const keepFocus = (isRemoved: (toast: Element) => boolean) => {
    const stack = stackRef.current;
    const active = document.activeElement;
    if (!stack || !active?.matches(":focus-visible")) return;
    const items = [...stack.children];
    const current = items.find((item) => item.contains(active));
    // 랜드마크 자체에 포커스가 있으면(F8 직후) 랜드마크가 비었을 때만 옮기면 된다.
    if (!current) {
      if (active === stack && items.every(isRemoved)) returnFocus();
      return;
    }
    if (!isRemoved(current)) return;

    const index = items.indexOf(current);
    const target = [
      ...items.slice(index + 1),
      ...items.slice(0, index).reverse(),
    ]
      .filter((item) => !isRemoved(item))
      .map((item) => item.querySelector("button"))
      .find(Boolean);
    if (target) target.focus();
    else returnFocus();
  };

  return { rememberReturnFocus, returnFocus, keepFocus };
}

/**
 * F8로 알림 랜드마크에 바로 들어간다(Radix Toast와 같은 방식).
 * 성공 토스트처럼 포커스할 요소가 없는 토스트에도 키보드 사용자가 닿을 수 있다.
 */
export function useNotificationsHotkey(
  stackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const focusNotifications = (event: KeyboardEvent) => {
      const stack = stackRef.current;
      if (event.code !== "F8" || !stack?.childElementCount) return;
      event.preventDefault();
      stack.focus();
    };
    document.addEventListener("keydown", focusNotifications);
    return () => document.removeEventListener("keydown", focusNotifications);
  }, [stackRef]);
}
