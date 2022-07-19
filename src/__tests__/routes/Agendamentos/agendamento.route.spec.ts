import { DataSource } from "typeorm";
import { app } from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";

describe("Testes na rota de agendamento", () => {
  let connection: DataSource;
  let token = "";
  let agendamentoId = "";
  let clienteId = "";
  let corretorId = "";
  let empresaId = "";
  let imovelId = "";

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

  test("Deve inserir as informações de um novo agendamento no banco de dados", async () => {
    let usuarioCliente = {
      nome: "Teste",
      cpf: `Cliente ${Math.floor(Math.random() * 10001)}`,
      email: "teste@mail.com.br",
      senha: "123456",
      telefone: "11987654321",
      status_permissao: 0,
    };

    let usuarioCorretor = {
      nome: "Teste",
      cpf: `Corretor ${Math.floor(Math.random() * 10001)}`,
      email: "teste@mail.com.br",
      senha: "123456",
      telefone: "11987654321",
      status_permissao: 0,
    };

    await request(app).post("/usuarios").send(usuarioCliente);
    await request(app).post("/usuarios").send(usuarioCorretor);

    const login = await request(app).post("/login").send({
      cpf: usuarioCliente.cpf,
      senha: usuarioCliente.senha,
    });

    token = login?.body?.token;

    const lista = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    clienteId = lista?.body[0].id;
    corretorId = lista?.body[1].id;

    let empresaTeste = {
      nome_fantasia: "Teste",
      razao_social: "Teste LTDA",
      cnpj: `Emp${Math.floor(Math.random() * 10001)}`,
      email: "teste@mail.com.br",
      inscricao_municipal: "123456",
      inscricao_estadual: "123456123456",
      telefone: "11987654321",
    };

    const responseEmpresaId = await request(app)
      .post("/empresas")
      .send(empresaTeste);
    empresaId = responseEmpresaId?.body?.id;

    let imovelTeste = {
      inscricao_imobiliaria: `ImóvelAgendamento ${Math.floor(
        Math.random() * 10001
      )}`,
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
      usuario: `${clienteId}`,
      endereco: {
        uf: "SP",
        cidade: "São Paulo",
        bairro: "São Matheus",
        rua: "Orlindo de Carvalho",
        numero: "2545",
        cep: "78998238",
      },
    };

    const responseImovelId = await request(app)
      .post("/imoveis")
      .set("Authorization", `Bearer ${token}`)
      .send(imovelTeste);
    imovelId = responseImovelId?.body?.id;

    let agendamentoTeste = {
      observacoes: "Teste",
      status_agendamento: 0,
      horario_inicio: "2022-05-25 14:30:00",
      horario_fim: "2022-05-25 16:30:00",
      cliente: `${clienteId}`,
      empresa: `${empresaId}`,
      corretor: `${corretorId}`,
      lista_imoveis: [`${imovelId}`],
    };

    const response = await request(app)
      .post("/agendamentos")
      .set("Authorization", `Bearer ${token}`)
      .send(agendamentoTeste);
    agendamentoId = response?.body?.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  test("Deve listar todos os agendamentos cadastrados no banco de dados", async () => {
    const response = await request(app)
      .get("/agendamentos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id);
  });

  test("Deve listar um agendamento específico no banco de dados", async () => {
    const response = await request(app)
      .get(`/agendamentos/${agendamentoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(agendamentoId);
  });

  test("Deve atualizar um agendamento no banco de dados", async () => {
    const response = await request(app)
      .patch(`/agendamentos/${agendamentoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        observacoes: "Teste Alterado",
        status_agendamento: 0,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.agn_observacoes).toContain("Alterado");
    expect(response.body.agn_status_agendamento).toEqual(0);
  });

  test("Deve deletar um agendamento no banco de dados", async () => {
    const response = await request(app)
      .delete(`/agendamentos/${agendamentoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    await request(app)
      .delete(`/usuarios/${clienteId}`)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .delete(`/usuarios/${corretorId}`)
      .set("Authorization", `Bearer ${token}`);
    const list = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .delete(`/usuarios/${list?.body[0].id}`)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .delete(`/empresas/${empresaId}`)
      .set("Authorization", `Bearer ${token}`);
    await request(app)
      .delete(`/imoveis/${imovelId}`)
      .set("Authorization", `Bearer ${token}`);
  });
});
