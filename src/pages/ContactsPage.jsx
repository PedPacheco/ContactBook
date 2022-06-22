import Header from "../components/Header";

import styles from "../styles/ContactsPage.module.css";
import Pencil from "../images/pencil.svg";
import Bin from "../images/bin.svg";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

function ContactsPage() {
  const navigate = useNavigate();
  const { request } = useFetch();
  const { user } = useAuth();
  const [contactList, setContactList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredListContact, setFilteredListContact] = useState([]);
  const [deletedContactId, setDeletedContactId] = useState("")

  function handleNavigateFromUptadePage(contact) {
    navigate(`/contacts/uptade/${contact.id}`);
  }

  function handleNavigateFromContactDetails(contact) {
    navigate(`/contacts/${contact.id}`);
  }

  function filterForContacts({ target }) {
    setFilter(target.value);
  }

  function searchContact(event) {
    event.preventDefault();
    const filteredContacts = contactList.filter((contato) => {
      if (filter.trim() === "") {
        return contactList;
      }
      return (
        contato.nome.toLowerCase().trim() === filter.toLowerCase().trim() ||
        contato.telefones[0].numero.trim() === filter.trim()
      );
    });
    setFilteredListContact(filteredContacts);
  }

  const userStorage = JSON.parse(localStorage.getItem("Usuário"));

  useEffect(async () => {
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

    const { json } = await request("contact", options);
    setContactList(json.data);
    setFilteredListContact(json.data);
  }, [deletedContactId]);

  async function deleteContact(id) {

    let token;
    if (user?.token) {
      token = user.token;
    } else {
      token = userStorage.token;
    }

    const options = {
      method: "DELETE",
      tokenUser: `Bearer ${token}`,
      body: JSON.stringify({ idContato: id }),
    };

    await request("contact", options);
    setOpenModal(false)
    setDeletedContactId(id)
  }
  

  return (
    <>
      {openModal && (
        <Modal>
          <p>Excluir esse contato ?</p>
          <div>
            <button onClick={() => setOpenModal(false)}>Cancelar</button>
            <button type="button" onClick={() => deleteContact(id)}>
              Excluir
            </button>
          </div>
        </Modal>
      )}

      <Header filter={filterForContacts} search={searchContact} />

      <div className={styles.table}>
        <div className={styles.title}>Nome</div>
        <div className={styles.extraInfo}>E-mail</div>
        <div className={styles.extraInfo}>Número de telefone</div>
        <div className={styles.extraInfo}>Cidade</div>
      </div>

      <ul>
        {filteredListContact?.map((contato) => (
          <li className={styles.contacts} key={contato.id}>
            <div
              id={styles["info"]}
              onClick={() => handleNavigateFromContactDetails(contato)}
            >
              <div className={styles.contactsName}>
                <img src={contato.foto} alt="" />
                <span>{contato.nome}</span>
              </div>
              <div className={styles.extraInfo}>
                <span>{contato.email}</span>
              </div>
              <div className={styles.extraInfo}>
                {contato.telefones.map((contato, index) => (
                  <span key={index}>
                    {contato.tipo}: {contato.numero}
                  </span>
                ))}
              </div>
              <div className={styles.extraInfo}>
                <span>{contato.endereco.cidade}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpenModal(true);
                setId(contato.id);
              }}
            >
              <img src={Bin} alt="ícone de lixeira" />
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigateFromUptadePage(contato);
              }}
            >
              <img src={Pencil} alt="ícone de lápis" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ContactsPage;
