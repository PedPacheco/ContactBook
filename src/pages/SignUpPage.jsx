import styles from "../styles/LoginPage.module.css";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, signUp } = useAuth();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(true);
  }, []);

  async function handleClickSignUp(event) {
    const response = await signUp(event, email, password, name);
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
              {!isValid && email.trim() === "" && (
                <p>O campo de email não foi preechido</p>
              )}
            </div>

            <div className={styles.cardContentArea}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {!isValid && password.trim() === "" && (
                <p>O campo de senha não foi preechido</p>
              )}
            </div>

            <div className={styles.cardContentArea}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {!isValid && name.trim() === "" && (
                <p>O campo de nome não foi preechido</p>
              )}
            </div>
          </div>

          <div className={styles.cardFooter}>
            <button
              type="submit"
              className={styles.cadastrar}
              onClick={handleClickSignUp}
            >
              Cadastrar
            </button>

            {!isValid && <p>{user}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUpPage;
