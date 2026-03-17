import styles from "./MatchCard.module.scss";

export const MatchCard = (props) => {
  const { team1, team2 } = props;

  return (
    <div className={styles.card}>
      <div className={styles.teamRow}>
        <div className={styles.team}>{team1.name}</div>
        <div className={styles.score}></div>
      </div>

      <div className={styles.teamRow}>
        <div className={styles.team}>{team2.name}</div>
        <div className={styles.score}></div>
      </div>
    </div>
  );
};
