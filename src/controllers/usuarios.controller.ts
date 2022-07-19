import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarUsuarioService from "../services/Usuarios/criarUsuario.service";
import atualizarUsuarioService from "../services/Usuarios/atualizarUsuario.service";
import listarUsuariosService from "../services/Usuarios/listarUsuarios.service";
import listarUmUsuarioService from "../services/Usuarios/listarUmUsuario.service";
import deletarUsuarioService from "../services/Usuarios/deletarUsuario.service";
class Constroller {
  static store = async (req: Request, res: Response) => {
    const {
      body: { nome, cpf, email, senha, telefone, status_permissao, endereco },
    } = req;
    let resposta = await criarUsuarioService({
      usr_nome: nome,
      usr_cpf: cpf,
      usr_email: email,
      usr_senha: senha,
      usr_telefone: telefone,
      usr_status_permissao: status_permissao,
      usr_enderecos: !!endereco
        ? {
            end_uf: endereco?.uf,
            end_cidade: endereco?.cidade,
            end_bairro: endereco?.bairro,
            end_rua: endereco?.rua,
            end_numero: endereco?.numero,
            end_cep: endereco?.cep,
          }
        : undefined,
    });
    return res.status(201).json(resposta);
  };
  static index = async (req: Request, res: Response) => {
    const resposta = await listarUsuariosService();
    return res.status(200).json(instanceToPlain(resposta));
  };
  static show = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    const resposta = await listarUmUsuarioService({ id });
    return res.status(200).json(resposta);
  };
  static update = async (req: Request, res: Response) => {
    const {
      body: { nome, cpf, email, senha, telefone, status_permissao },
      params: { id },
    } = req;
    let resposta = await atualizarUsuarioService(
      {
        usr_nome: nome,
        usr_email: email,
        usr_senha: senha,
        usr_telefone: telefone,
        usr_status_permissao: status_permissao,
      } as any,
      { id }
    );
    return res.status(200).json(resposta);
  };
  static delete = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;
    await deletarUsuarioService({ id });
    return res.status(204).json();
  };
}
export default Constroller;
