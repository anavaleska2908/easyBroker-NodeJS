import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarImovelService from "../services/Imoveis/criarImovel.service";
import listarImoveisService from "../services/Imoveis/listarImoveis.service";
import listarUmImovelService from "../services/Imoveis/listarUmImovel.service";
import atualizarImovelService from "../services/Imoveis/atualizarImovel.service";
import deletarImovelService from "../services/Imoveis/deletarImovel.service";
class Controller {
  static store = async (req: Request, res: Response) => {
    const {
      body: {
        inscricao_imobiliaria,
        descricao,
        valor,
        status_situacao,
        status_condominio,
        status_servico,
        qtde_quartos,
        status_tipo,
        qtde_banheiros,
        qtde_suites,
        status_garagem,
        qtde_vagas_garagem,
        endereco: { uf, cidade, bairro, rua, numero, cep },
        usuario,
        empresa,
      },
    } = req;
    let resposta = await criarImovelService({
      imv_inscricao_iptu: inscricao_imobiliaria,
      imv_descricao: descricao,
      imv_status_situacao: status_situacao,
      imv_status_condominio: status_condominio,
      imv_status_servico: status_servico,
      imv_qtde_quartos: qtde_quartos,
      imv_status_tipo: status_tipo,
      imv_qtde_banheiros: qtde_banheiros,
      imv_qtde_suites: qtde_suites,
      imv_status_garagem: status_garagem,
      imv_qtde_vagas_garagem: qtde_vagas_garagem,
      imv_enderecos: {
        end_uf: uf,
        end_cidade: cidade,
        end_bairro: bairro,
        end_rua: rua,
        end_numero: numero,
        end_cep: cep,
      },
      id_usuario: usuario,
      id_empresa: empresa,
      valor,
    });
    return res.status(201).json(resposta);
  };
  static index = async (req: Request, res: Response) => {
    const resposta = await listarImoveisService();
    return res.status(200).json(instanceToPlain(resposta));
  };
  static show = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const resposta = await listarUmImovelService({ id });
    return res.status(200).json(instanceToPlain(resposta));
  };
  static update = async (req: Request, res: Response) => {
    const {
      body: {
        descricao,
        status_situacao,
        status_condominio,
        status_servico,
        qtde_quartos,
        status_tipo,
        qtde_banheiros,
        qtde_suites,
        status_garagem,
        qtde_vagas_garagem,
      },
      params: { id },
    } = req;
    let resposta = await atualizarImovelService(
      {
        imv_descricao: descricao,
        imv_status_situacao: status_situacao,
        imv_status_condominio: status_condominio,
        imv_status_servico: status_servico,
        imv_qtde_quartos: qtde_quartos,
        imv_status_tipo: status_tipo,
        imv_qtde_banheiros: qtde_banheiros,
        imv_qtde_suites: qtde_suites,
        imv_status_garagem: status_garagem,
        imv_qtde_vagas_garagem: qtde_vagas_garagem,
      } as any,
      { id }
    );
    return res.status(200).json(resposta);
  };
  static delete = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    await deletarImovelService({ id });
    return res.status(204).json();
  };
}
export default Controller;
