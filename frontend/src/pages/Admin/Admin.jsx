import styles from "./Admin.module.scss";
import { Header } from "../../widgets/header/Header";

export const Admin = () => {
  return (
    <div className={styles.pages}>
      <Header />

      <main>
        <div className={styles.main}>
          <div>
            <h1 className={styles.main__Title}>ADMIN LOGIN</h1>
            <div className={styles.main__Content}>
              <img src="../../assets/image/admin_login.png" alt="Admin Login" />
              <hr />
              <form action="">
                <div className={styles.formGroup}>
                  <label htmlFor="Username"></label>
                  <input
                    className={styles.formInput}
                    type="text"
                    name="Username"
                    id="Username"
                    placeholder="Enter your username"
                  />

                  <label htmlFor="Password"></label>
                  <input
                    className={styles.formInput}
                    type="password"
                    name="Password"
                    id="Password"
                    placeholder="Enter your password"
                  />
                </div>
              </form>
              <button className={styles.loginButton}>LOGIN</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
