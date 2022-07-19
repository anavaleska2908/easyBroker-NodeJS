import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Usuarios from "../entities/usuarios.entity";
import * as bcrypt from "bcryptjs";
import { AppError } from "../errors/appError";
const verificarUsuarioSenha = async (req: Request, res: Response, next: NextFunction) => {
    let match = false;
    const {
        body: { cpf, senha },
    } = req;
    if (!!cpf && !!senha) {
        const usuario = await AppDataSource.getRepository(Usuarios).findOne({ where: { usr_cpf: cpf } });
        if (!!usuario) {
            match = bcrypt.compareSync(senha, usuario?.usr_senha);
            !!match && next();
        }
    }
    if (!!!match) throw new AppError(400, "Usuário ou Senha incorretos!");
};
export default verificarUsuarioSenha;
