import { Header } from "../../widgets/header/Header";
import { MatchCard } from "../../entities/match/MatchCard";
import { MatchCardEmpty } from "../../entities/matchempty/MatchCardEmpty";
import styles from "./Main.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export const Main = () => {
  const [teams, setTeams] = useState([]);

  const filteredTeams = teams.filter((team) => team.players.length === 5);
  const power =
    filteredTeams.length > 0 ? Math.floor(Math.log2(filteredTeams.length)) : 0;
  const limit = Math.pow(2, power);
  const participants = filteredTeams.slice(0, limit);

  const rounds = Array.from({ length: power + 1 }, (_, roundIndex) => {
    const matchesInRound = Math.floor(limit / Math.pow(2, roundIndex));
    const roundMatches = [];

    for (let matchIndex = 0; matchIndex < matchesInRound; matchIndex++) {
      if (roundIndex === 0) {
        const team1Index = matchIndex * 2;
        const team2Index = team1Index + 1;
        const team1 = participants[team1Index];
        const team2 = participants[team2Index];
        if (team1 && team2) {
          roundMatches.push({ type: "match", team1, team2, matchIndex });
        }
      } else {
        roundMatches.push({ type: "empty", matchIndex });
      }
    }
    return roundMatches;
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/generate-tournament")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Błąd ładowania: ", err));
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.bracketContainer}>
        {rounds.map((roundMatches, roundIndex) => {
          const baseGap = 90;

          const nullGapMultiplier = 1.8;
          const topPaddingMultiplier = 0.7;

          const elementGap =
            baseGap * Math.pow(2, roundIndex) * nullGapMultiplier;
          const matchesCount = roundMatches.length;
          const columnHeight = (matchesCount - 1) * elementGap + 140;
          const firstRoundHeight = (Math.floor(limit / 2) - 1) * baseGap + 140;
          const centeringOffset =
            (Math.abs(firstRoundHeight - columnHeight) / 2) *
            topPaddingMultiplier;

          return (
            <div
              key={roundIndex}
              className={styles.column}
              style={{
                gap: `${elementGap}px`,
                paddingTop: `${centeringOffset}px`,
                paddingBottom: `${centeringOffset}px`,
              }}
            >
              {roundMatches.map((match, matchIndex) => {
                const isLast = matchIndex === roundMatches.length - 1;

                return match.type === "match" ? (
                  <MatchCard
                    key={`${roundIndex}-${matchIndex}`}
                    team1={match.team1}
                    team2={match.team2}
                  />
                ) : (
                  <MatchCardEmpty
                    key={`${roundIndex}-${matchIndex}`}
                    isLast={isLast}
                    gap={elementGap}
                  />
                );
              })}
            </div>
          );
        })}
      </main>
      <div className={styles.simulationButton}>
        <button className={styles.simulationButton__button}>
          Symulacja meczu
        </button>
      </div>
    </div>
  );
};
