import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

let connection: DataSource;
let usuarioIdErrado = process.env.ID;
let arrendarToken = "";
let usuarioId = "";
let arrendamentoId = "";

let usuarioTeste = {
  nome: "Teste",
  cpf: `ARRU ${Math.floor(Math.random() * 10001)}`,
  email: "teste@mail.com.br",
  senha: "123456",
  telefone: "11987654321",
  status_permissao: 0,
};

let arrendarTeste = {
  imovel: "",
  empresa: "",
  valor: 500,
};

let imovelTeste = {
  inscricao_imobiliaria: `ARRI ${Math.floor(Math.random() * 10001)}`,
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

let empresaTeste = {
  nome_fantasia: "Teste",
  razao_social: "Teste LTDA",
  cnpj: `ARR ${Math.floor(Math.random() * 10001)}`,
  email: "teste@mail.com.br",
  inscricao_municipal: "123456",
  inscricao_estadual: "123456123456",
  telefone: "11987654321",
};

describe("Testes na rota de arrendar", () => {
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

  test("Deve inserir as informações de um novo arrendamento no banco de dados", async () => {
    const usuarioResponse = await request(app)
      .post("/usuarios")
      .send(usuarioTeste);

    const login = await request(app).post("/login").send({
      cpf: usuarioTeste.cpf,
      senha: usuarioTeste.senha,
    });

    arrendarToken = login?.body?.token;

    const empresaResponse = await request(app)
      .post("/empresas")
      .send(empresaTeste);

    imovelTeste.usuario = usuarioResponse?.body?.id;

    const imovelResponse = await request(app)
      .post("/imoveis")
      .send(imovelTeste)
      .set("Authorization", `Bearer ${arrendarToken}`);

    arrendarTeste.empresa = empresaResponse?.body?.id;
    arrendarTeste.imovel = imovelResponse?.body?.id;

    const arrendamentoResponse = await request(app)
      .post("/arrendar")
      .send(arrendarTeste)
      .set("Authorization", `Bearer ${arrendarToken}`);

    arrendamentoId = arrendamentoResponse?.body?.id;

    expect(arrendamentoResponse.status).toBe(201);
    expect(arrendamentoResponse.body).toHaveProperty("id");
  });

  test("Deve listar todos os arrendamentos cadastrados no banco de dados", async () => {
    const response = await request(app)
      .get("/arrendar")
      .set("Authorization", `Bearer ${arrendarToken}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveLength(0);
  });

  test("Deve atualizar um arrendamento no banco de dados", async () => {
    const response = await request(app)
      .patch(`/arrendar/${arrendarTeste.imovel}`)
      .set("Authorization", `Bearer ${arrendarToken}`)
      .send({
        empresa: arrendarTeste.empresa,
        valor: 700,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.uei_valor_imovel).toContain("700");
  });

  test("Deve deletar um arrendamento no banco de dados", async () => {
    const response = await request(app)
      .delete(`/arrendar/${arrendarTeste.imovel}`)
      .set("Authorization", `Bearer ${arrendarToken}`)
      .send({
        empresa: arrendarTeste.empresa,
      });

    expect(response.status).toBe(204);
  });
});
