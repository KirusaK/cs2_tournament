import styles from "./TeamList.module.scss";

export const TeamList = () => {
  return (
    <div className={styles.TeamList}>
      <div className={styles.TeamList__Header}>
        <h1>ID</h1>
        <h1>Team Name</h1>
      </div>
      <div className={styles.TeamList__Content}>
        <h2>1</h2>
        <h2>Navi</h2>
      </div>
    </div>
  );
};
