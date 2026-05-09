import { Header } from "../../widgets/header/Header";
import { MatchCard } from "../../entities/match/MatchCard";
import { MatchCardEmpty } from "../../entities/matchempty/MatchCardEmpty";
import styles from "./Main.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export const Main = () => {
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState({});
  const [isSimulating, setIsSimulating] = useState(false);

  // Данные для расчета сетки
  const filteredTeams = teams.filter((team) => team.players.length === 5);
  // Чтобы сетка не пропадала, берем либо реальное кол-во, либо заглушку (например, 4)
  const count = filteredTeams.length > 0 ? filteredTeams.length : 4;
  const power = Math.floor(Math.log2(count));
  const limit = Math.pow(2, power);
  const participants =
    filteredTeams.length >= limit ? filteredTeams.slice(0, limit) : [];

  const simulateTournament = () => {
    if (isSimulating || participants.length === 0) return;
    setIsSimulating(true);
    setResults({});

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    (async () => {
      let currentWinners = [...participants];

      for (let roundIndex = 0; roundIndex < power; roundIndex++) {
        const matchesInRound = Math.pow(2, power - roundIndex - 1);
        const nextRoundWinners = [];

        for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
          await delay(1000);

          const team1 = currentWinners[matchIndex * 2];
          const team2 = currentWinners[matchIndex * 2 + 1];
          // Если команд вдруг нет (пустая сетка), ставим заглушку
          const winner =
            team1 && team2
              ? Math.random() < 0.5
                ? team1
                : team2
              : team1 || team2 || { name: "TBD" };

          nextRoundWinners.push(winner);

          setResults((prev) => ({
            ...prev,
            [`${roundIndex}-${matchIndex}`]: winner,
          }));
        }
        currentWinners = nextRoundWinners;
      }
      setIsSimulating(false);
    })();
  };

  // ГЕНЕРАЦИЯ РАУНДОВ (чтобы сетка была всегда)
  const rounds = [];
  for (let roundIndex = 0; roundIndex < power; roundIndex++) {
    const matchesInRound = Math.pow(2, power - roundIndex - 1);
    const roundMatches = [];

    for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
      if (roundIndex === 0) {
        // Первый раунд (четвертьфиналы или полуфиналы)
        roundMatches.push({
          type: "match",
          team1: participants[matchIndex * 2] || { name: "Team 1" },
          team2: participants[matchIndex * 2 + 1] || { name: "Team 2" },
        });
      } else {
        // Последующие раунды (берем из результатов предыдущего)
        const prevRound = roundIndex - 1;
        const winner1 = results[`${prevRound}-${matchIndex * 2}`];
        const winner2 = results[`${prevRound}-${matchIndex * 2 + 1}`];

        roundMatches.push({
          type: "match",
          // Если победителя еще нет, показываем NULL или ???
          team1: winner1 || { name: "NULL" },
          team2: winner2 || { name: "NULL" },
        });
      }
    }
    rounds.push(roundMatches);
  }

  // Финальный чемпион (самый правый блок)
  const ultimateWinner = results[`${power - 1}-0`];

  useEffect(() => {
    fetch("http://localhost:5000/api/generate-tournament")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Błąd: ", err));
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.bracketContainer}>
        {rounds.map((roundMatches, roundIndex) => {
          const baseGap = 90;
          const elementGap = baseGap * Math.pow(2, roundIndex) * 1.8;

          // Центрирование относительно первого столбца
          const firstRoundHeight =
            (Math.pow(2, power - 1) - 1) * (baseGap * 1.8) + 140;
          const currentHeight = (roundMatches.length - 1) * elementGap + 140;
          const centeringOffset = (firstRoundHeight - currentHeight) / 2;

          return (
            <div
              key={roundIndex}
              className={styles.column}
              style={{
                gap: `${elementGap}px`,
                paddingTop: `${Math.max(0, centeringOffset)}px`,
              }}
            >
              {roundMatches.map((match, matchIndex) => (
                <MatchCard
                  key={`${roundIndex}-${matchIndex}`}
                  team1={match.team1}
                  team2={match.team2}
                />
              ))}
            </div>
          );
        })}

        {/* Последняя колонка с Победителем */}
        {/* Последняя колонка с Победителем */}
        <div className={styles.column} style={{ justifyContent: "center" }}>
          <div className={styles.winnerWrapper}>
            <div className={styles.winnerLabel}>WINNER</div>
            {/* Обертка карточки */}
            <div className={styles.card}>
              <div className={styles.teamRow}>
                <div className={styles.team}>
                  {ultimateWinner ? ultimateWinner.name : "NULL"}
                </div>
                {/* Зеленый блок для счета, как в MatchCard */}
                <div className={styles.score}></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className={styles.simulationButton}>
        <button
          className={styles.simulationButton__button}
          onClick={simulateTournament}
          disabled={isSimulating}
        >
          {isSimulating ? "Simulacja..." : "Symulacja meczu"}
        </button>
      </div>
    </div>
  );
};
