import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
const verificarCampos = async (req: Request, res: Response, next: NextFunction) => {
    const { baseUrl, method, body } = req;
    const camposObrigatorios = await getCamposObrigatorios({ baseUrl, method });
    camposObrigatorios.forEach((campo) => {
        if (method === "POST") {
            if (!!body[campo] || body[campo] >= 0) {
            } else {
                throw new AppError(400, ` '${campo}' não informado!`);
            }
        }
        if (!!body[campo] && method === "PATCH") throw new AppError(400, ` '${campo}' não pode ser alterado!`);
    });
    next();
};
const getCamposObrigatorios = async ({ baseUrl, method }: any) => {
    switch (baseUrl) {
        case "/usuarios": {
            return method === "POST" ? ["nome", "cpf", "email", "senha", "telefone"] : ["cpf"];
        }
        case "/empresas": {
            return method === "POST" ? ["nome_fantasia", "razao_social", "cnpj", "inscricao_municipal", "inscricao_estadual", "email", "telefone"] : ["cnpj"];
        }
        case "/imoveis": {
            // "usuario" "empresa",
            return method === "POST" ? ["inscricao_imobiliaria", "descricao", "valor", "status_situacao", "status_condominio", "status_servico", "qtde_quartos", "status_tipo", "qtde_banheiros", "qtde_suites", "status_garagem", "qtde_vagas_garagem", "endereco"] : ["inscricao_imobiliaria"];
        }
        case "/agendamentos": {
            return method === "POST" ? ["horario_inicio", "horario_fim", "lista_imoveis", "cliente", "corretor", "empresa"] : [];
        }
        case "/enderecos": {
            // "usuario" "empresa", "imovel"
            return method === "POST" ? ["uf", "cidade", "bairro", "rua", "numero", "cep"] : [];
        }
        case "/arrendar": {
            return method === "POST" ? ["valor", "empresa", "imovel"] : [];
        }
        default: {
            throw new AppError(400, "Requisição invalida!");
        }
    }
};
export default verificarCampos;
