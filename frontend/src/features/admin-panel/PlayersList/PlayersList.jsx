import styles from "./PlayersList.module.scss";

export const PlayersList = () => {
  return (
    <div className={styles.playersList}>
      <div className={styles.playersList__Header}>
        <h1>ID</h1>
        <h1>Nickname</h1>
        <h1>Team</h1>
      </div>
      <div className={styles.playersList__Content}>
        <h2>1</h2>
        <h2>s1mple</h2>
        <h2>Navi</h2>
      </div>
    </div>
  );
};
