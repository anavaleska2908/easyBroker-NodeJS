import { ILogin } from "../../interfaces";
import AppDataSource from "../../data-source";
import Usuarios from "../../entities/usuarios.entity";
import jwt from "jsonwebtoken";
const logarUsuarioServices = async ({ usr_cpf, usr_senha }: ILogin) => {
    const usuarioRepository = AppDataSource.getRepository(Usuarios);
    const usuario = await usuarioRepository.findOne({ where: { usr_cpf } });
    const token = jwt.sign({ cpf: usr_cpf, senha: usr_senha }, "SECRET_KEY", { expiresIn: "24h" });
    return { usuario, token };
};
export default logarUsuarioServices;
