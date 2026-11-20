import styles from "./styles.module.scss";

interface RequiredMarkProps {
  /** 입력 요소가 이미 필수 여부를 보조기기에 알릴 때(input[required]나 aria-required)는 false. */
  shouldAnnounce?: boolean;
}

export const RequiredMark = ({ shouldAnnounce = true }: RequiredMarkProps) => (
  <>
    <span className={styles.mark} aria-hidden="true">
      *
    </span>
    {shouldAnnounce && (
      <span className={styles["visually-hidden"]}>{"(필수)"}</span>
    )}
  </>
);
