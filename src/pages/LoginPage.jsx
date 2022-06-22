import styles from "../styles/LoginPage.module.css";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  function NavigateRoute() {
    navigate("/sign-up");
  }

  async function handleClickLogin(event) {
    const response = await auth.login(event, email, password);
    if (!response) {
      setIsValid(false);
    }
  }

  return (
    <>
      <div className={styles.login}>
        <form className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Login</h2>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.cardContentArea}>
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className={styles.cardContentArea}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.cardFooter}>
            <button
              type="submit"
              className={styles.buttonLogin}
              onClick={handleClickLogin}
            >
              Login
            </button>
            <button
              type="button"
              className={styles.cadastrar}
              onClick={NavigateRoute}
            >
              Cadastrar-se
            </button>

            {!isValid && <p>{auth.user}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
