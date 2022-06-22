import Header from "../components/Header";
import Profile from "../components/Profile";

import { useState } from "react";

function UptadeContact() {
  const [uptade, setUpdate] = useState("editar");

  return (
    <>
      <Header />
      <Profile method={uptade} />
    </>
  );
}

export default UptadeContact;
