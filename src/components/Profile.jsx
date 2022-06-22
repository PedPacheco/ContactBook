import styles from "../styles/components/Profile.module.css";
import Close from "../images/close.svg";
import Add from "../images/adicionar.svg";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Compress from "compress.js";

function Profile(props) {
  const [contact, setContact] = useState("");
  const [insertAdress, setInsertAdress] = useState(false);
  const { request } = useFetch();
  const user = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState();
  const [typePhone, setTypePhone] = useState("");
  const [number, setNumber] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCep] = useState("");
  const [country, setCountry] = useState("");

  const userStorage = JSON.parse(localStorage.getItem("Usuário"));

  useEffect(async () => {
    if (props.method === "editar") {
      const userStorage = JSON.parse(localStorage.getItem("Usuário"));
      const contactId = id;

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

      const { json } = await request(`contact/${contactId}`, options);

      setContact(json.data.id)
      setName(json.data.nome);
      setNickname(json.data.apelido);
      setEmail(json.data.email);
      setNotes(json.data.notas);
      setTypePhone(json.data.telefones[0].tipo);
      setNumber(json.data.telefones[0].numero);
      setLogradouro(json.data.endereco.logradouro);
      setCity(json.data.endereco.cidade);
      setState(json.data.endereco.estado);
      setCep(json.data.endereco.cep);
      setCountry(json.data.endereco.pais);
    }
  }, []);

  async function createForm() {
    if (props.method === "inserir") {
      let token;
      if (user?.token) {
        token = user.token;
      } else {
        token = userStorage.token;
      }

      const options = {
        method: "POST",
        tokenUser: `Bearer ${token}`,
        body: JSON.stringify({
          nome: name,
          apelido: nickname,
          telefones: [
            {
              tipo: typePhone,
              numero: number,
            },
          ],
          email: email,
          endereco: {
            logradouro: logradouro,
            cidade: city,
            estado: state,
            cep: cep,
            pais: country,
          },
          notas: notes,
          foto: photo,
        }),
      };
      if(name.trim() === "") {
        alert("Escreve o nome filhão")
        return
      }
      const res = await request("contact", options);
      console.log(res);
    }

    if (props.method === "editar") {
      let token;
      if (user?.token) {
        token = user.token;
      } else {
        token = userStorage.token;
      }

      const options = {
        method: "PATCH",
        tokenUser: `Bearer ${token}`,
        body: JSON.stringify({
          idContato: contact,
          nome: name,
          apelido: nickname,
          telefones: [
            {
              tipo: typePhone,
              numero: number,
            },
          ],
          email: email,
          endereco: {
            logradouro: logradouro,
            cidade: city,
            estado: state,
            cep: cep,
            pais: country,
          },
          notas: notes,
          foto: photo,
        }),
      };
      await request("contact", options);
    }

    navigate("/contacts");
  }

  function handleNavigateContactsPage() {
    navigate("/contacts");
  }

  function handleInputFile(event) {
    const compress = new Compress();

    const files = [...event.target.files];
    compress
      .compress(files, {
        size: 4,
        quality: 1,
        maxWidth: 162,
        maxHeight: 162,
        resize: true,
        rotate: false,
      })
      .then((response) => {
        setPhoto(response[0].prefix + response[0].data);
      });
  }

  return (
    <div>
      <div className={styles.uptade}>
        <div className={styles.title}>
          <button className={styles.close}>
            <img
              src={Close}
              alt="ícone pra fechar"
              onClick={handleNavigateContactsPage}
            />
          </button>
          <h2>
            {props.method === "editar" ? "Editar contato" : "Criar contato"}
          </h2>
        </div>
        <button className={styles.save} onClick={createForm}>
          Salvar
        </button>
      </div>
      <div className={styles.info}>
        <form className={styles.form}>
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleInputFile}
              className={styles.inputForm}
            />
          </div>
          <div className={styles.name}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              className={styles.inputForm}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Apelido"
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
              }}
              className={styles.inputForm}
            />
          </div>
          <div className={styles.phone}>
            <input
              type="text"
              placeholder="Tipo"
              className={styles.type}
              value={typePhone}
              onChange={(event) => {
                setTypePhone(event.target.value);
              }}
            />

            <input
              type="number"
              placeholder="Telefone"
              className={styles.number}
              value={number}
              onChange={(event) => {
                setNumber(event.target.value);
              }}
            />

            {number !== "" && (
              <button type="button" className={styles.add}>
                {" "}
                <img src={Add} alt="Adicionar Telefone" />
              </button>
            )}
          </div>
          {/* {phoneBook.map(() => (
            <div className={styles.phone}>
              <input
                type="text"
                placeholder="Tipo"
                className={styles.type}
                value={typePhone}
                onChange={(event) => {
                  setTypePhone(event.target.value);
                }}
              />

              <input
                type="number"
                placeholder="Telefone"
                className={styles.number}
                value={number}
                onChange={(event) => {
                  setNumber(event.target.value);
                }}
              />

              {number !== "" && (
                <button type="button" className={styles.add} onClick={addPhoneBook}>
                  {" "}
                  <img src={Add} alt="Adicionar Telefone" />
                </button>
              )}
            </div>
          ))} */}
          <div className={styles.email}>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className={styles.inputForm}
            />
          </div>

          <div className={styles.notes}>
            <input
              type="text"
              placeholder="Notas"
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
              }}
              className={styles.inputForm}
            />
          </div>
          {!insertAdress && (
            <button
              type="button"
              className={styles.showAdress}
              onClick={() => setInsertAdress(true)}
            >
              Mostrar mais
            </button>
          )}
          {insertAdress && (
            <div className={styles.adress}>
              <input
                type="text"
                placeholder="Logradouro"
                value={logradouro}
                onChange={(event) => {
                  setLogradouro(event.target.value);
                }}
                className={styles.inputForm}
              />
              <input
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                className={styles.inputForm}
              />
              <input
                type="text"
                placeholder="Estado"
                value={state}
                onChange={(event) => {
                  setState(event.target.value);
                }}
                className={styles.inputForm}
              />
              <input
                type="text"
                placeholder="Cep"
                value={cep}
                onChange={(event) => {
                  setCep(event.target.value);
                }}
                className={styles.inputForm}
              />
              <input
                type="text"
                placeholder="Pais"
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
                className={styles.inputForm}
              />

              <button
                type="button"
                className={styles.closeAdress}
                onClick={() => setInsertAdress(false)}
              >
                Mostrar Menos
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
