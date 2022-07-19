import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import Enderecos from "../../entities/enderecos.entity";
import Usuarios from "../../entities/usuarios.entity";
import { IUsuarios } from "../../interfaces";
const criarUsuarioService = async ({
  usr_nome,
  usr_cpf,
  usr_email,
  usr_senha,
  usr_telefone,
  usr_status_permissao,
  usr_enderecos,
}: IUsuarios) => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);
  const usuario = usuariosRepository.create({
    usr_nome,
    usr_cpf,
    usr_email,
    usr_senha: hashSync(usr_senha, 8),
    usr_telefone,
    usr_status_permissao,
  });
  await usuariosRepository.save(usuario);
  !!usr_enderecos && vincularEndereco({ usuario, usr_enderecos });
  return usuario;
};
const vincularEndereco = async ({ usuario, usr_enderecos }: any) => {
  const { end_uf, end_cidade, end_bairro, end_rua, end_numero, end_cep } =
    usr_enderecos;
  const enderecosRepository = AppDataSource.getRepository(Enderecos);
  const objEndereco = enderecosRepository.create({
    end_uf,
    end_cidade,
    end_bairro,
    end_rua,
    end_numero,
    end_cep,
    end_id_usuario_fk: usuario,
  });
  await enderecosRepository.save(objEndereco);
};
export default criarUsuarioService;
