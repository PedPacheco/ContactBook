import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const { loading, request } = useFetch();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function login(event, email, password) {
    event.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ email: email, senha: password }),
    };

    const { json } = await request("auth", options);

    if (json.status === 200) {
      setUser(json.data);
      localStorage.setItem("Usuário", JSON.stringify(json.data));
      navigate("/contacts");
    }

    setUser(json.mensagem);
    return false;
  }

  async function signUp(event, email, password, name) {
    event.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ email: email, senha: password, nome: name }),
    };

    const { json } = await request("user", options);

    if (json.status === 200) {
      setUser(json.data);
      localStorage.setItem("Usuário", JSON.stringify(json.data));
      navigate("/contacts");
    }

    setUser(json.mensagem)
    return false;
  }

  return (
    <AuthContext.Provider value={{ user, login, signUp }}>
      {props.children}
    </AuthContext.Provider>
  );
}
