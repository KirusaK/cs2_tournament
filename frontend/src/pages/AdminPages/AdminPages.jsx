import { PlayersList } from "../../features/admin-panel/PlayersList/PlayersList";
import { TeamList } from "../../features/admin-panel/TeamList/TeamList";
import { Header } from "../../widgets/header/Header";
import { Link } from "react-router-dom";
import styles from "./AdminPages.module.scss";

export const AdminPages = () => {
  return (
    <div className={styles.pages}>
      <Header isAdmin={true} />

      <main>
        <div className={styles.main}>
          <div className={styles.main__Button}>
            <button>ADD PLAYER</button>
            <button>ADD TEAM</button>
            <button>GENERATE TOURNAMENT</button>
          </div>
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
