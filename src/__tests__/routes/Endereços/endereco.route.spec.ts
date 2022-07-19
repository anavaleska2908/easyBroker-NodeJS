import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
describe("Testes na rota de usuário", () => {
  let connection: DataSource;
  let token = "";
  let usuarioId = "";
  let enderecoId = "";
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
  test("Deve inserir as informações de um novo endereço no banco de dados", async () => {
    let usuarioTeste = {
      nome: "Teste",
      cpf: `Teste ${Math.floor(Math.random() * 10001)}`,
      email: "teste@mail.com.br",
      senha: "123456",
      telefone: "11987654321",
      status_permissao: 0,
    };
    const responseUsuarioId = await request(app)
      .post("/usuarios")
      .send(usuarioTeste);
    const login = await request(app).post("/login").send({
      cpf: usuarioTeste.cpf,
      senha: usuarioTeste.senha,
    });

    token = login?.body?.token;
    usuarioId = responseUsuarioId?.body?.id;

    let enderecoTeste = {
      uf: "TE",
      cidade: "Teste",
      bairro: "Teste",
      rua: "Teste",
      numero: "2545",
      cep: "78998238",
      usuario: usuarioId,
    };
    const response = await request(app)
      .post("/enderecos")
      .set("Authorization", `Bearer ${token}`)
      .send(enderecoTeste);
    enderecoId = response?.body?.id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
  test("Deve listar todos os endereços cadastrados no banco de dados", async () => {
    const response = await request(app)
      .get("/enderecos")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id);
  });
  test("Deve listar um endereço específico no banco de dados", async () => {
    const response = await request(app)
      .get(`/enderecos/${enderecoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(enderecoId);
  });
  test("Deve atualizar um endereço no banco de dados", async () => {
    const response = await request(app)
      .patch(`/enderecos/${enderecoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        uf: "ET",
        cidade: "Teste Alterado",
        bairro: "Teste Alterado",
        rua: "Teste Alterado",
        numero: "2546",
        cep: "78998239",
      });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.end_uf).toContain("ET");
    expect(response.body.end_cidade).toContain("Alterado");
    expect(response.body.end_bairro).toContain("Alterado");
    expect(response.body.end_rua).toContain("Alterado");
    expect(response.body.end_numero).toContain("2546");
    expect(response.body.end_cep).toContain("78998239");
  });
  test("Deve deletar um endereço no banco de dados", async () => {
    const response = await request(app)
      .delete(`/enderecos/${enderecoId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
