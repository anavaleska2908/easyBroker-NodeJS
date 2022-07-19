import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

let connection: DataSource;
let usuarioIdErrado = process.env.ID;
let usuarioToken = "";
let usuarioId = "";

let usuarioTeste = {
  nome: "Teste",
  cpf: `Usuário ${Math.floor(Math.random() * 10001)}`,
  email: "teste@mail.com.br",
  senha: "123456",
  telefone: "11987654321",
  status_permissao: 0,
};

describe("Testes na rota de usuário", () => {
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

  test("Deve inserir as informações de um novo usuário no banco de dados", async () => {
    const response = await request(app).post("/usuarios").send(usuarioTeste);
    const login = await request(app).post("/login").send({
      cpf: usuarioTeste.cpf,
      senha: usuarioTeste.senha,
    });

    usuarioId = response?.body?.id;
    usuarioToken = login?.body?.token;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve listar todos os usuários cadastrados no banco de dados", async () => {
    const response = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveLength(0);
  });

  test("Deve listar um usuário específico no banco de dados", async () => {
    const response = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(usuarioId);
  });

  test("Deve atualizar um usuário no banco de dados", async () => {
    const response = await request(app)
      .patch(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${usuarioToken}`)
      .send({
        nome: "Teste Alterado",
        email: "testealterado@mail.com.br",
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.usr_nome).toContain("Alterado");
    expect(response.body.usr_email).toContain("testealterado");
  });

  test("Deve deletar um usuário no banco de dados", async () => {
    const response = await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(response.status).toBe(204);
  });
});

describe("Testes de erros na rota de usuário", () => {
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

  test("Não deve ser capaz de criar dois usuários com o mesmo CPF", async () => {
    const successResponse = await request(app)
      .post("/usuarios")
      .send(usuarioTeste);
    const login = await request(app).post("/login").send({
      cpf: usuarioTeste.cpf,
      senha: usuarioTeste.senha,
    });

    usuarioId = successResponse?.body?.id;
    usuarioToken = login?.body?.token;

    const errorResponse = await request(app)
      .post("/usuarios")
      .send(usuarioTeste);

    expect(errorResponse.status).toBe(409);
    expect(errorResponse.body.message).toBeDefined();
  });

  test("Não deve ser capaz de criar um usuário sem enviar campos obrigatórios", async () => {
    const response = await request(app).post("/usuarios").send({
      nome: "Teste 2",
      email: "teste@mail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de listar um usuário inexistente", async () => {
    const response = await request(app)
      .get(`/usuarios/${usuarioIdErrado}`)
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de atualizar um usuário inexistente", async () => {
    const response = await request(app)
      .patch(`/usuarios/${usuarioIdErrado}`)
      .set("Authorization", `Bearer ${usuarioToken}`)
      .send({
        nome: "Teste Alterado 2",
        email: "testealterado2@mail.com.br",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de deletar um usuário inexistente", async () => {
    const response = await request(app)
      .delete(`/usuarios/${usuarioIdErrado}`)
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();

    const _ = await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set("Authorization", `Bearer ${usuarioToken}`);
  });
});
