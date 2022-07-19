import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarArrendamentoService from "../services/Arrendar/criarArrendamento.service";
import atualizarArrendamentoService from "../services/Arrendar/atualizarArrendamento.service";
import listarArrendamentosService from "../services/Arrendar/listarArrendamentos.service";
import listarUmArrendamentoService from "../services/Arrendar/listarUmArrendamento.service";
import listarImovelArrendamento from "../services/Arrendar/listarImovelArrendamento.service";
import deletarArrendamentoService from "../services/Arrendar/deletarArrendamento.service";
class Constroller {
  static store = async (req: Request, res: Response) => {
    const {
      body: { usuario, imovel, empresa, valor },
    } = req;
    let resposta = await criarArrendamentoService({
      id_usuario: usuario,
      id_imovel: imovel,
      id_empresa: empresa,
      valor,
    });
    return res.status(201).json(resposta);
  };
  static index = async (req: Request, res: Response) => {
    const resposta = await listarArrendamentosService();
    return res.status(200).json(instanceToPlain(resposta));
  };
  static show = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const resposta = await listarUmArrendamentoService({ id });
    return res.status(200).json(resposta);
  };
  static showImovel = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const resposta = await listarImovelArrendamento({ id });
    return res.status(200).json(resposta);
  };
  static update = async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { usuario, empresa, valor },
    } = req;
    let resposta = await atualizarArrendamentoService(
      {
        id_usuario: usuario,
        id_empresa: empresa,
        valor,
      },
      { id_imovel: id }
    );
    return res.status(200).json(resposta);
  };
  static delete = async (req: Request, res: Response) => {
    const {
      params: { id },
      body: { usuario, empresa },
    } = req;
    await deletarArrendamentoService(
      {
        id_usuario: usuario,
        id_empresa: empresa,
      },
      { id_imovel: id }
    );
    return res.status(204).json();
  };
}
export default Constroller;
