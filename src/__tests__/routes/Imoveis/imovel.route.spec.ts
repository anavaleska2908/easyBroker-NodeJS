import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

let connection: DataSource;
let imovelIdErrado = process.env.ID;
let token = "";
let imovelId = "";
let imovelInscricao = "";

let imovelTeste = {
  inscricao_imobiliaria: `Imovel ${Math.floor(Math.random() * 10001)}`,
  descricao:
    "Imovel novinho, nunca usado, reformado recentemente e passou apenas por um dono!",
  status_situacao: 1,
  status_condominio: 0,
  status_tipo: 1,
  status_servico: 0,
  qtde_quartos: 3,
  qtde_banheiros: 2,
  qtde_suites: 1,
  status_garagem: 0,
  qtde_vagas_garagem: 2,
  valor: 900,
  usuario: "",
  endereco: {
    uf: "SP",
    cidade: "São Paulo",
    bairro: "São Matheus",
    rua: "Orlindo de Carvalho",
    numero: "2545",
    cep: "78998238",
  },
};

describe("Testes na rota de imóveis", () => {
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

  test("Deve inserir as informações de um novo imóvel no banco de dados", async () => {
    let usuarioTeste = {
      nome: "Teste",
      cpf: `UsuarioEndereço ${Math.floor(Math.random() * 10001)}`,
      email: "teste@mail.com.br",
      senha: "123456",
      telefone: "11987654321",
      status_permissao: 0,
    };

    const usuario = await request(app).post("/usuarios").send(usuarioTeste);
    const login = await request(app).post("/login").send({
      cpf: usuarioTeste.cpf,
      senha: usuarioTeste.senha,
    });

    token = login?.body?.token;
    imovelTeste.usuario = usuario?.body?.id;

    const response = await request(app)
      .post("/imoveis")
      .set("Authorization", `Bearer ${token}`)
      .send(imovelTeste);

    imovelId = response?.body?.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("imv_inscricao_iptu");
  });

  test("Deve listar todos os imóveis cadastrados no banco de dados", async () => {
    const response = await request(app)
      .get("/imoveis")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveLength(0);
  });

  test("Deve listar um imóvel específico no banco de dados", async () => {
    const response = await request(app)
      .get(`/imoveis/${imovelId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(imovelId);
  });

  test("Deve atualizar um imóvel no banco de dados", async () => {
    const response = await request(app)
      .patch(`/imoveis/${imovelId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Descrição Alterada",
        qtde_suites: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.imv_descricao).toContain("Alterada");
  });

  test("Deve deletar um imóvel no banco de dados", async () => {
    const response = await request(app)
      .delete(`/imoveis/${imovelId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

describe("Testes de erros na rota de imóvel", () => {
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

  test("Não deve ser capaz de criar dois imóveis com a mesma inscrição imobiliária", async () => {
    const successResponse = await request(app)
      .post("/imoveis")
      .set("Authorization", `Bearer ${token}`)
      .send(imovelTeste);

    imovelInscricao = successResponse?.body?.imv_inscricao_iptu;
    imovelId = successResponse?.body?.id;

    const errorResponse = await request(app)
      .post("/imoveis")
      .set("Authorization", `Bearer ${token}`)
      .send(imovelTeste);

    expect(errorResponse.status).toBe(409);
    expect(errorResponse.body.message).toBeDefined();

    const _ = await request(app)
      .delete(`/imoveis/${imovelId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  test("Não deve ser capaz de criar um imóvel sem enviar campos obrigatórios", async () => {
    const response = await request(app)
      .post("/imoveis")
      .set("Authorization", `Bearer ${token}`)
      .send({
        inscricao_imobiliaria: "0066600",
        valor: 10000.5,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de listar um imóvel inexistente", async () => {
    const response = await request(app)
      .get(`/imoveis/${imovelIdErrado}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de atualizar um imóvel inexistente", async () => {
    const response = await request(app)
      .patch(`/imoveis/${imovelIdErrado}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Teste Alterado 2",
        valor: 0,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  test("Não deve ser capaz de deletar um imóvel inexistente", async () => {
    const response = await request(app)
      .delete(`/imoveis/${imovelIdErrado}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();

    await request(app)
      .delete(`/usuarios/${imovelTeste.usuario}`)
      .set("Authorization", `Bearer ${token}`);
  });
});
