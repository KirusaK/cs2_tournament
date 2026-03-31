import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = ({ isAdmin = false }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href={isAdmin ? "/admin/pages" : "/"} className={styles.logo}>
          {isAdmin ? "ADMIN PANEL" : "CS2 TOURNAMENT"}
        </a>
        {!isAdmin && (
          <Link to="/admin" className={styles.adminBtn}>
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
};
