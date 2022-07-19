import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Empresas from "../entities/empresas.entity";
import Imoveis from "../entities/imoveis.entity";
import Usuarios from "../entities/usuarios.entity";
import { AppError } from "../errors/appError";
export const seExisteUsuarioMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {
        body: { cpf },
    } = req;
    const usuario = await AppDataSource.getRepository(Usuarios).findOne({
        where: { usr_cpf: cpf },
    });
    !!!usuario && next();
    if (!!usuario) {
        throw new AppError(409, "CPF já cadastrado!");
    }
};
export const seExisteEmpresaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {
        body: { cnpj },
    } = req;
    const empresa = await AppDataSource.getRepository(Empresas).findOne({
        where: { emp_cnpj: cnpj },
    });
    !!!empresa && next();
    if (!!empresa) {
        throw new AppError(409, "CNPJ já cadastrado!");
    }
};
export const seExisteImovelMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {
        body: { inscricao_imobiliaria },
    } = req;
    const imovel = await AppDataSource.getRepository(Imoveis).findOne({
        where: { imv_inscricao_iptu: inscricao_imobiliaria } as any,
    });
    !!!imovel && next();
    if (!!imovel) {
        throw new AppError(409, "Inscrição imobiliaria já cadastrada!");
    }
};
