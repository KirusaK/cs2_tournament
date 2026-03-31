import { Header } from "../../widgets/header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.scss";

export const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/");
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };

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
              <form action="" onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                  <label htmlFor="Username"></label>
                  <input
                    className={styles.formInput}
                    type="text"
                    name="Username"
                    id="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />

                  <label htmlFor="Password"></label>
                  <input
                    className={styles.formInput}
                    type="password"
                    name="Password"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <div className={styles.login}>
                  <button className={styles.login__Button} type="submit">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
