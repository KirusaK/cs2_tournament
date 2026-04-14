import styles from "./TeamList.module.scss";

export const TeamList = (props) => {
  const { teams, onDeleteTeam } = props;

  return (
    <div className={styles.TeamList}>
      <div className={styles.TeamList__Header}>
        <h1>ID</h1>
        <h1>Team Name</h1>
      </div>
      <div className={styles.TeamList__Content}>
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className={styles.TeamRow}>
              <h2>{team.id}</h2>
              <h2>{team.name}</h2>
              <button
                className={styles.TeamList__button}
                onClick={() => onDeleteTeam(team.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>Loading teams...</p>
        )}
      </div>
    </div>
  );
};
