import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarEnderecoservice from "../services/Enderecos/criarEndereco.service";
import listarEnderecosService from "../services/Enderecos/listarEnderecos.service";
import listarUmaEnderecoservice from "../services/Enderecos/listarUmaEndereco.service";
import atualizarEnderecoservice from "../services/Enderecos/atualizarEndereco.service";
import deletarEnderecoservice from "../services/Enderecos/deletarEndereco.service";
class Constroller {
  static store = async (req: Request, res: Response) => {
    const {
      body: { uf, cidade, bairro, rua, numero, cep, usuario, empresa, imovel },
    } = req;
    let resposta = await criarEnderecoservice({
      end_uf: uf,
      end_cidade: cidade,
      end_bairro: bairro,
      end_rua: rua,
      end_numero: numero,
      end_cep: cep,
      id_usuario: usuario,
      id_empresa: empresa,
      id_imovel: imovel,
    });
    return res.status(201).json(resposta);
  };
  static index = async (req: Request, res: Response) => {
    const resposta = await listarEnderecosService();
    return res.status(200).json(instanceToPlain(resposta));
  };
  static show = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const resposta = await listarUmaEnderecoservice({ id });
    return res.status(200).json(instanceToPlain(resposta));
  };
  static update = async (req: Request, res: Response) => {
    const {
      body: { uf, cidade, bairro, rua, numero, cep },
      params: { id },
    } = req;

    let resposta = await atualizarEnderecoservice(
      {
        end_uf: uf,
        end_cidade: cidade,
        end_bairro: bairro,
        end_rua: rua,
        end_numero: numero,
        end_cep: cep,
      },
      { id }
    );
    return res.status(200).json(resposta);
  };
  static delete = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    await deletarEnderecoservice({ id });
    return res.status(204).json();
  };
}
export default Constroller;
