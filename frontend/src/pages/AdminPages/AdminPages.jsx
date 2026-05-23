import { PlayersList } from "../../features/admin-panel/PlayersList/PlayersList";
import { TeamList } from "../../features/admin-panel/TeamList/TeamList";
import { Header } from "../../widgets/header/Header";
import { Link, useNavigate } from "react-router-dom";
import { AddPlayerForm } from "../../features/admin-panel/AddPlayerForm/AddPlayerForm";
import { useState, useEffect } from "react";
import { AddTeamsForm } from "../../features/admin-panel/AddTeamsForm/AddTeamsForm";
import styles from "./AdminPages.module.scss";

export const AdminPages = () => {
  // State для управления модальными окнами, командами и игроками
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teams, setTeams] = useState(null);
  const [players, setPlayers] = useState([]);

  // Хук для навигации между страницами
  const navigate = useNavigate();

  // Функции для открытия и закрытия модальных окон
  const togglePlayerModal = () => {
    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  // Функция для открытия и закрытия модального окна добавления команды
  const toggleTeamModal = () => {
    setIsTeamModalOpen(!isTeamModalOpen);
  };

  // Функция для загрузки данных о игроках с сервера
  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/players");
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error loading players:", err);
    }
  };

  // Функция для загрузки данных о командах с сервера
  const fetchTeams = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teams");
      const data = await response.json();
      setTeams(data);
    } catch (err) {
      console.error("Error loading teams:", err);
    }
  };

  // Функция для удаления команды с сервера
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

  // Функция для генерации турнира и перехода на страницу с результатами
  const handleGenerateTournament = () => {
    navigate("/");
  };

  // Функция для симуляции турнира (можно вызвать при генерации турнира)
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
            <button onClick={handleGenerateTournament}>
              GENERATE TOURNAMENT
            </button>
          </div>

          {isPlayerModalOpen && (
            <AddPlayerForm
              onClose={() => setIsPlayerModalOpen(false)}
              onPlayerAdded={() => {
                fetchPlayers();
                fetchTeams();
              }}
              teams={teams}
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
