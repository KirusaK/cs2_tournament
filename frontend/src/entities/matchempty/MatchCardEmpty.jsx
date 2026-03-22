import styles from "./MatchCardEmpty.module.scss";

export const MatchCardEmpty = () => {
  return (
    <div className={styles.cards}>
      <div className={styles.teamRow}>
        <div className={styles.team}>
          <span className={styles.text}>NULL</span>
        </div>
        <div className={styles.score}></div>
      </div>
    </div>
  );
};
