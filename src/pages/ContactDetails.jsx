import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import Close from "../images/close.svg";

import styles from "../styles/ContactDetails.module.css";

function ContactDetails() {
  const [contact, setContact] = useState({});
  const { user } = useAuth();
  const { id } = useParams();
  const { request } = useFetch();
  const navigate = useNavigate();

  useEffect(async () => {
    const userStorage = JSON.parse(localStorage.getItem("Usuário"));

    let token;
    if (user?.token) {
      token = user.token;
    } else {
      token = userStorage.token;
    }

    const options = {
      method: "GET",
      tokenUser: `Bearer ${token}`,
    };

    const { json } = await request(`contact/${id}`, options);
    setContact(json.data)
  }, []);

  function handleNavigateContactsPage() {
    navigate("/contacts");
  }

  function handleNavigateUptadePage() {
    navigate(`/contacts/uptade/${id}`);
  }

  return (
    <>
      <Header />
      <div className={styles.uptade}>
        <button className={styles.close} onClick={handleNavigateContactsPage}>
          <img src={Close} alt="ícone pra fechar" />
        </button>
        <div className={styles.profile}>
          <img
            src={contact.foto}
            className={styles.perfil}
            alt="Imagem de perfil"
          />
          <h2>{contact.nome}</h2>
        </div>

        <button className={styles.save} onClick={handleNavigateUptadePage}>
          Editar
        </button>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>Detalhes do contato</span>
        <div className={styles.data}>
          Apelido:
          <span>
            {contact.apelido ? contact.apelido : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Email:
          <span>
            {contact.email ? contact.email : "Não existe está informação"}
          </span>
        </div>
        <ul className={styles.phoneList}>
          {contact.telefones?.map((item, index) => (
            <li className={styles.data} key={index}>
              Telefones:{" "}
              <span>
                {item.tipo}:{" "}
                {item.numero ? item.numero : "Não existe está informação"}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.data}>
          Logradouro:
          <span>
            {contact.endereco?.logradouro
              ? contact.endereco?.logradouro
              : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Cidade:
          <span>
            {contact.endereco?.cidade
              ? contact.endereco?.cidade
              : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Estado:
          <span>
            {contact.endereco?.estado
              ? contact.endereco?.estado
              : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Cep:
          <span>
            {contact.endereco?.cep
              ? contact.endereco?.cep
              : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Pais:
          <span>
            {contact.endereco?.pais
              ? contact.endereco?.pais
              : "Não existe está informação"}
          </span>
        </div>
        <div className={styles.data}>
          Notas:
          <span>
            {contact.notas ? contact.notas : "Não existe está informação"}
          </span>
        </div>
      </div>
    </>
  );
}

export default ContactDetails;
