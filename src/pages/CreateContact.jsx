import { useState } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";

function CreateContact() {
  const [create, setCreate] = useState("inserir");

  return (
    <>
      <Header />
      <Profile method={create} />
    </>
  );
}

export default CreateContact;
