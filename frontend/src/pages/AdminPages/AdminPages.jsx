import { PlayersList } from "../../features/admin-panel/PlayersList/PlayersList";
import { TeamList } from "../../features/admin-panel/TeamList/TeamList";
import { Header } from "../../widgets/header/Header";
import { Link } from "react-router-dom";
import { AddPlayerForm } from "../../features/admin-panel/AddPlayerForm/AddPlayerForm";
import { useState } from "react";
import styles from "./AdminPages.module.scss";
import { AddTeamsForm } from "../../features/admin-panel/AddTeamsForm/AddTeamsForm";

export const AdminPages = () => {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const togglePlayerModal = () => {
    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  const toggleTeamModal = () => {
    setIsTeamModalOpen(!isTeamModalOpen);
  };

  return (
    <div className={styles.pages}>
      <Header isAdmin={true} />

      <main>
        <div className={styles.main}>
          <div className={styles.main__Button}>
            <button onClick={togglePlayerModal}>ADD PLAYER</button>
            <button onClick={toggleTeamModal}>ADD TEAM</button>
            <button>GENERATE TOURNAMENT</button>
          </div>

          {isPlayerModalOpen && (
            <AddPlayerForm onClose={() => setIsPlayerModalOpen(false)} />
          )}

          {isTeamModalOpen && (
            <AddTeamsForm onClose={() => setIsTeamModalOpen(false)} />
          )}

          <hr />
          <h1 className={styles.main__Title}>Players List</h1>
          <PlayersList />
          <hr />
          <TeamList />
          <div className={styles.main__Exit}>
            <Link to="/" className={styles.main__ExitLink}>
              <span>Exit</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
