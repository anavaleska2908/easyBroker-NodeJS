import Agendamentos from "../entities/agendamentos.entity";
import { Request, Response, NextFunction } from "express";
import Enderecos from "../entities/enderecos.entity";
import Usuarios from "../entities/usuarios.entity";
import Empresas from "../entities/empresas.entity";
import Imoveis from "../entities/imoveis.entity";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import { version, validate } from "uuid";
const verificarIds = async (req: Request, res: Response, next: NextFunction) => {
    const {
        baseUrl,
        params: { id },
    } = req;
    if (validate(id) && version(id) === 4) {
        const existe = await verificarExiste({ id, baseUrl });
        !!existe && next();
        if (!!!existe) throw new AppError(404, "Não encontrado!");
    } else {
        throw new AppError(404, "ID invalido!");
    }
};
const verificarExiste = async ({ id, baseUrl }: any) => {
    switch (baseUrl) {
        case "/imoveis": {
            let validacao = await AppDataSource.getRepository(Imoveis).findOne({ where: { id } });
            return !!validacao;
        }
        case "/usuarios": {
            let validacao = await AppDataSource.getRepository(Usuarios).findOne({ where: { id } });
            return !!validacao;
        }
        case "/empresas": {
            let validacao = await AppDataSource.getRepository(Empresas).findOne({ where: { id } });
            return !!validacao;
        }
        case "/enderecos": {
            let validacao = await AppDataSource.getRepository(Enderecos).findOne({ where: { id } });
            return !!validacao;
        }
        case "/agendamentos": {
            let validacao = await AppDataSource.getRepository(Agendamentos).findOne({ where: { id } });
            return !!validacao;
        }
        case "/arrendar": {
            let validacao = await AppDataSource.getRepository(Imoveis).findOne({ where: { id } });
            return !!validacao;
        }
        default: {
            throw new AppError(400, "Requisição invalida!");
        }
    }
};
export default verificarIds;
