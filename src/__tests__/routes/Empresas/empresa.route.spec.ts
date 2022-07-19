import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

describe("Testes na rota de empresas", () => {
  let connection: DataSource;
  let empresaToken = "";
  let empresaId = "";

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

  let empresaTeste = {
    nome_fantasia: "Teste",
    razao_social: "Teste LTDA",
    cnpj: `Empresa ${Math.floor(Math.random() * 10001)}`,
    email: "teste@mail.com.br",
    inscricao_municipal: "123456",
    inscricao_estadual: "123456123456",
    telefone: "11987654321",
  };

  test("Deve inserir as informações de uma nova empresa no banco de dados", async () => {
    const response = await request(app).post("/empresas").send(empresaTeste);
    const login = await request(app)
      .post("/login")
      .send({
        cpf: `admin-${empresaTeste.cnpj}`,
        senha: `${empresaTeste.cnpj}-admin`,
      });
    empresaId = response?.body?.id;
    empresaToken = login?.body?.token;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve listar todos as empresas cadastradas no banco de dados", async () => {
    const response = await request(app)
      .get("/empresas")
      .set("Authorization", `Bearer ${empresaToken}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveLength(0);
  });

  test("Deve listar uma empresa específica no banco de dados", async () => {
    const response = await request(app)
      .get(`/empresas/${empresaId}`)
      .set("Authorization", `Bearer ${empresaToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(empresaId);
  });

  test("Deve atualizar uma empresa no banco de dados", async () => {
    const response = await request(app)
      .patch(`/empresas/${empresaId}`)
      .set("Authorization", `Bearer ${empresaToken}`)
      .send({
        nome_fantasia: "Teste Alterado",
        razao_social: "Teste Alterado LTDA",
        email: "testealterado@mail.com.br",
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.emp_nome_fantasia).toContain("Alterado");
    expect(response.body.emp_razao_social).toContain("Alterado");
    expect(response.body.emp_email).toContain("testealterado");
  });

  test("Deve deletar uma empresa no banco de dados", async () => {
    const response = await request(app)
      .delete(`/empresas/${empresaId}`)
      .set("Authorization", `Bearer ${empresaToken}`);

    expect(response.status).toBe(204);
  });
});
