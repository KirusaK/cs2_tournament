import styles from "./TeamList.module.scss";

export const TeamList = (props) => {
  const { teams, onDeleteTeam } = props;

  return (
    <div className={styles.TeamList}>
      <div className={styles.TeamList__Header}>
        <h1>Team Name</h1>
        <h1>Status</h1>
      </div>
      <div className={styles.TeamList__Content}>
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className={styles.TeamRow}>
              <h1>{team.name}</h1>

              <h1
                className={
                  Number(team.player_count) >= 5 ? styles.full : styles.notFull
                }
              >
                {Number(team.player_count) >= 5
                  ? "✅ Full"
                  : `${team.player_count}/5`}
              </h1>

              <button
                className={styles.TeamList__button}
                onClick={() => onDeleteTeam(team.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1 style={{ color: "white" }}>Nie ma jeszcze żadnych zespołów</h1>
        )}
      </div>
    </div>
  );
};
