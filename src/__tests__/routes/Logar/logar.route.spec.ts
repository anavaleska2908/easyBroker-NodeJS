import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

let connection: DataSource;
let usuarioToken = "";
let usuarioId = "";

let usuarioTeste = {
  nome: "Teste",
  cpf: `Logar ${Math.floor(Math.random() * 10001)}`,
  email: "teste@mail.com.br",
  senha: "123456",
  telefone: "11987654321",
  status_permissao: 0,
};

describe("Testes na rota de login", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Deve ser capaz de fazer login com credenciais corretas", async () => {
    const response = await request(app).post("/usuarios").send(usuarioTeste);

    let loginTeste = {
      cpf: response.body.usr_cpf,
      senha: usuarioTeste.senha,
    };

    const login = await request(app).post("/login").send(loginTeste);

    usuarioId = response?.body?.id;
    usuarioToken = response?.body?.token;

    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty("token");

    await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${usuarioToken}`);
  });
});

describe("Testes de erros na rota de login", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during data source initialization", err)
      );
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Não deve ser capaz de fazer login com credenciais incorretas/que não existem", async () => {
    const response = await request(app).post("/login").send({
      cpf: "TesteNoExist222",
      senha: "s87dn39md",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de fazer login sem algum dos campos obrigatórios", async () => {
    const response = await request(app).post("/login").send({
      cpf: "TesteNoField222",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});
