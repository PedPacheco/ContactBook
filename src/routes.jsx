import { BrowserRouter, Route, Routes } from "react-router-dom";

import ContactsPage from "./pages/ContactsPage";
import LoginPage from "./pages/LoginPage";
import CreateContact from "./pages/CreateContact";
import UptadeContact from "./pages/UptadeContact";
import SignUpPage from "./pages/SignUpPage";
import { AuthContextProvider } from "./contexts/AuthContext";
import ContactDetails from "./pages/ContactDetails";

function PageRoutes() {
  return (
    <BrowserRouter>
      <AuthContextProvider >
        <Routes>
          <Route element={<LoginPage />} path="/" exact />
          <Route element={<SignUpPage />} path="/sign-up" exact />
          <Route element={<ContactsPage />} path="/contacts" />
          <Route element={<CreateContact />} path="/contacts/new" />
          <Route element={<UptadeContact />} path="/contacts/uptade/:id" />
          <Route element={<ContactDetails />} path="/contacts/:id" />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default PageRoutes;
