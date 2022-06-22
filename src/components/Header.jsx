import Profile from "../images/contacts.png";
import Search from "../images/search.svg";
import Plus from "../images/plus.svg";

import styles from "../styles/components/Header.module.css";

import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function navigateRoute() {
    navigate("/contacts/new");
  }

  return (
    <header className={styles.header}>
      <div className={styles.containerLogo}>
        <a className={styles.link} href="/contacts">
          <img src={Profile} alt="Logo" />
          <span>Contatos</span>
        </a>
      </div>

      <form className={styles.form}>
        <button type="submit" onClick={props.search}>
          <img src={Search} alt="ícone de busca"  />
        </button>
        <input
          type="text"
          placeholder="Pesquisa"
          onChange={props.filter}
        />
      </form>

      <button type="button" className={styles.button} onClick={navigateRoute}>
        <img src={Plus} alt="ícone de adicionar" />
        <span>Criar contato</span>
      </button>
    </header>
  );
}

export default Header;
