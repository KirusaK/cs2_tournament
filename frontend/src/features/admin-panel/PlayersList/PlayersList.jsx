import styles from "./PlayersList.module.scss";

export const PlayersList = (props) => {
  const { players } = props;

  return (
    <div className={styles.playersList}>
      <div className={styles.playersList__Header}>
        <h1>Nickname</h1>
        <h1>Team</h1>
      </div>
      <div className={styles.playersList__Content}>
        {players && players.length > 0 ? (
          players.map((player) => (
            <div key={player.id} className={styles.PlayersRow}>
              <h1>{player.nickname}</h1>
              <h1>{player.teamName}</h1>
            </div>
          ))
        ) : (
          <h1 style={{ color: "white" }}>No players added yet</h1>
        )}
      </div>
    </div>
  );
};
