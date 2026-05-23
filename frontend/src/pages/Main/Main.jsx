import { Header } from "../../widgets/header/Header";
import { MatchCard } from "../../entities/match/MatchCard";
import styles from "./Main.module.scss";
import { useState, useEffect, useRef } from "react";

export const Main = () => {
  // State для команд, результатов и статуса симуляции
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState({});
  const [isSimulating, setIsSimulating] = useState(false);
  const cardRefs = useRef({});

  // Фильтрация команд с 5 игроками и определение участников
  const filteredTeams = teams.filter((team) => team.players.length === 5);
  const count = filteredTeams.length > 0 ? filteredTeams.length : 4;
  const power = Math.floor(Math.log2(count));
  const limit = Math.pow(2, power);
  const participants =
    filteredTeams.length >= limit ? filteredTeams.slice(0, limit) : [];

  // Функция для симуляции турнира
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

  // Генерация структуры раундов и матчей на основе участников и результатов
  const rounds = [];
  for (let roundIndex = 0; roundIndex < power; roundIndex++) {
    const matchesInRound = Math.pow(2, power - roundIndex - 1);
    const roundMatches = [];

    for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
      if (roundIndex === 0) {
        roundMatches.push({
          team1: participants[matchIndex * 2] || { name: "Team 1" },
          team2: participants[matchIndex * 2 + 1] || { name: "Team 2" },
        });
      } else {
        const prevRound = roundIndex - 1;
        const winner1 = results[`${prevRound}-${matchIndex * 2}`];
        const winner2 = results[`${prevRound}-${matchIndex * 2 + 1}`];
        roundMatches.push({
          team1: winner1 || { name: "NULL" },
          team2: winner2 || { name: "NULL" },
        });
      }
    }
    rounds.push(roundMatches);
  }

  const ultimateWinner = results[`${power - 1}-0`];

  // Получение данных о командах при загрузке компонента
  useEffect(() => {
    fetch("http://localhost:5000/api/generate-tournament")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Błąd: ", err));
  }, []);

  // Константы карточки
  const CARD_HEIGHT = 232;
  const FIRST_GAP = 90;
  const COL_GAP = 130;

  const tops = [];

  // Вычисление вертикальных позиций для каждой карточки в каждом раунде
  if (rounds.length > 0) {
    const firstTops = rounds[0].map((_, i) => i * (CARD_HEIGHT + FIRST_GAP));
    tops.push(firstTops);

    for (let r = 1; r < rounds.length; r++) {
      const prevTops = tops[r - 1];
      const currentTops = rounds[r].map((_, m) => {
        const topCard = prevTops[m * 2];
        const bottomCard = prevTops[m * 2 + 1];
        const topCardCenter = topCard + CARD_HEIGHT / 2;
        const bottomCardCenter = bottomCard + CARD_HEIGHT / 2;
        return (topCardCenter + bottomCardCenter) / 2 - CARD_HEIGHT / 2;
      });
      tops.push(currentTops);
    }
  }

  // Вычисление высоты контейнера для правильного позиционирования победителя
  const firstRoundCount = rounds[0]?.length || 0;
  const containerHeight =
    firstRoundCount > 0
      ? (firstRoundCount - 1) * (CARD_HEIGHT + FIRST_GAP) + CARD_HEIGHT
      : 0;

  const winnerTop = containerHeight / 2 - 70 / 2;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.bracketContainer}>
        <div style={{ position: "relative", height: `${containerHeight}px` }}>
          {rounds.map((roundMatches, roundIndex) =>
            roundMatches.map((match, matchIndex) => (
              <div
                key={`${roundIndex}-${matchIndex}`}
                style={{
                  position: "absolute",
                  top: `${tops[roundIndex]?.[matchIndex] ?? 0}px`,
                  left: `${roundIndex * (300 + COL_GAP)}px`,
                }}
              >
                <MatchCard team1={match.team1} team2={match.team2} />
              </div>
            )),
          )}

          {/* Winner */}
          <div
            style={{
              position: "absolute",
              left: `${rounds.length * (300 + COL_GAP)}px`,
              top: `${winnerTop}px`,
            }}
          >
            <div className={styles.winnerWrapper}>
              {/* <div className={styles.winnerLabel}>WINNER</div> */}
              <div className={styles.card}>
                <div className={styles.teamRow}>
                  <div className={styles.team}>
                    {ultimateWinner ? ultimateWinner.name : "NULL"}
                  </div>
                  <div className={styles.score}></div>
                </div>
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
