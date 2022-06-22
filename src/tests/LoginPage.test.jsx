import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as ReactRouterDom from "react-router-dom";
import { describe, expect, it } from "vitest";

import { AuthContextProvider } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";

const invalidResponseMock = {
  mensagem: "Requisição inválida",
  erros: ["Parâmetro 'senha' não pode ser null/undefined ou vazio"],
};

const validRequestMock = {
  email: "pedro@gmail.com",
  senha: "pedro123",
};

const validResponseMock = {
  id: "c88e7c51-611e-4217-987f-fcf46bbf853a",
  email: "pedro@gmail.com",
  nome: "pedro",
  foto: "foto do mickey",
  token: "Token do usuario",
  status: 200,
};

export const restHandlers = [
  rest.post("http://localhost:5000/v1/auth", (req, res, ctx) => {
    const { email, senha } = req.body;

    if (email === validRequestMock.email && senha === validRequestMock.senha) {
      return res(ctx.status(200), ctx.json(validResponseMock));
    }

    return res(ctx.status(400), ctx.json(invalidResponseMock));
  }),
];

const server = setupServer(...restHandlers);

// const mockedHistoryPush = vi.fn();
// // vi.mock("react-router-dom", () => {
// //   return {
// //     useNavigate: () => mockedHistoryPush,
// //   };
// // });

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() => {
  render(
    <ReactRouterDom.BrowserRouter>
      <AuthContextProvider>
        <ReactRouterDom.Routes>
          <ReactRouterDom.Route element={<LoginPage />} path="/" exact />
        </ReactRouterDom.Routes>
      </AuthContextProvider>
    </ReactRouterDom.BrowserRouter>
  );
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginPage", () => {
  it(`Dado os campos não preechidos e clique no botao de login,
        Quando a API retornar requisicao invalida
        Entao a mensagem de erro tem que ser mostrada na tela`, async () => {
    const loginButton = screen.getAllByText("Login")[1];

    await userEvent.click(loginButton);

    expect(
      await screen.findByText(invalidResponseMock.mensagem)
    ).toBeInTheDocument();
  });

  it(`Dado os campos preechidos corretamente e clique no botao de login,
      Quando a API retornar requisicao sucesso
      Entao o usuario sera redirecionado para a pagina de contatos`, async () => {
    const emailInput = screen.getByLabelText("Usuario");
    const passwordInput = screen.getByLabelText("Senha");
    const loginButton = screen.getAllByText("Login")[1];

    await act(async () => {
      userEvent.type(emailInput, "pedro@gmail.com");
      userEvent.type(passwordInput, "pedro123");
      userEvent.click(loginButton);
    });

    expect(window.location.href).toBe("http://localhost:3000/");
  });
});
