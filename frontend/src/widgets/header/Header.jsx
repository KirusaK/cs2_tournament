import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>
          CS2 TOURNAMENT
        </a>
        <button className={styles.adminBtn}>Admin</button>
      </nav>
    </header>
  );
};
