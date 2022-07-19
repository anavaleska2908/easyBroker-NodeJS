import { hashSync } from "bcryptjs";
import AppDataSource from "../../data-source";
import Usuarios from "../../entities/usuarios.entity";
import { IDataUuid, IUsuarios } from "../../interfaces";
const atualizarUsuarioService = async ({ usr_nome, usr_email, usr_senha, usr_telefone, usr_status_permissao }: IUsuarios, { id }: IDataUuid) => {
    const usuariosRepository = AppDataSource.getRepository(Usuarios);
    const { usr_senha: senha_atual }: any = await usuariosRepository.findOne({
        where: { id },
    });
    await usuariosRepository.update(id, {
        usr_nome,
        usr_email,
        usr_senha: !!usr_senha ? hashSync(usr_senha, 8) : senha_atual,
        usr_telefone,
        usr_status_permissao,
    });
    return await usuariosRepository.findOne({ where: { id } });
};
export default atualizarUsuarioService;
