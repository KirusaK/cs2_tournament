import { PlayersList } from "../../features/admin-panel/PlayersList/PlayersList";
import { TeamList } from "../../features/admin-panel/TeamList/TeamList";
import { Header } from "../../widgets/header/Header";
import { Link } from "react-router-dom";
import { AddPlayerForm } from "../../features/admin-panel/AddPlayerForm/AddPlayerForm";
import { useState, useEffect } from "react";
import { AddTeamsForm } from "../../features/admin-panel/AddTeamsForm/AddTeamsForm";
import styles from "./AdminPages.module.scss";

export const AdminPages = () => {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const togglePlayerModal = () => {
    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  const toggleTeamModal = () => {
    setIsTeamModalOpen(!isTeamModalOpen);
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/players");
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error loading players:", err);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();
      setTeams(data);
    } catch (err) {
      console.error("Error loading teams:", err);
    }
  };

  const deleteTeam = async (id) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć tę komendę?",
    );
    const url = `http://localhost:5000/api/teams/${id}`;

    if (confirmDelete) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Team deleted!");
          fetchTeams();
          fetchPlayers();
        } else {
          alert("Błąd podczas usuwania komendy na serwerze");
        }
      } catch (err) {
        console.error("Network error:", err);
      }
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();
      setTeams(data);
    };

    fetchTeams();
    fetchPlayers();
  }, []);

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
            <AddPlayerForm
              onClose={() => setIsPlayerModalOpen(false)}
              onPlayerAdded={fetchPlayers}
            />
          )}

          {isTeamModalOpen && (
            <AddTeamsForm
              onClose={() => setIsTeamModalOpen(false)}
              onTeamAdded={fetchTeams}
            />
          )}

          <hr />
          <h1 className={styles.main__Title}>Players List</h1>
          <PlayersList players={players} />
          <hr />
          <h1 className={styles.main__Title}>Team List</h1>

          <TeamList teams={teams} onDeleteTeam={deleteTeam} />
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
