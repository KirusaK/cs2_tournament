import { Header } from "../../widgets/header/Header";
import { MatchCard } from "../../entities/match/MatchCard";
import styles from "./Main.module.scss";

const allTeams = [
  { name: "NAVI", players: [1, 2, 3, 4, 5] },
  { name: "G2", players: [1, 2, 3, 4, 5] },
  { name: "Cloud9", players: [1, 2, 3, 4] },
];

const filteredTeams = allTeams.filter((team) => team.players.length === 5);

export const Main = () => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        <MatchCard team1={filteredTeams[0]} team2={filteredTeams[1]} />
      </main>
    </div>
  );
};
