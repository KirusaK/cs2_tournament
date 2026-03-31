import styles from "./MatchCardEmpty.module.scss";

export const MatchCardEmpty = ({ isLast, gap }) => {
  return (
    <div
      className={styles.cards}
      style={{
        "--line-height": `${gap / 2}px`,
        "--gap-value": `${gap}px`,
      }}
      data-debug-gap={gap}
    >
      <div className={styles.teamRow}>
        <div className={styles.team}>
          <span className={styles.text}>NULL</span>
        </div>
        <div className={styles.score}></div>
      </div>
      {!isLast && <div className={styles.verticalLine}></div>}
    </div>
  );
};
