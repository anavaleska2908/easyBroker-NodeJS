import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarEmpresaService from "../services/Empresas/criarEmpresa.service";
import listarEmpresasService from "../services/Empresas/listarEmpresas.service";
import listarUmaEmpresaService from "../services/Empresas/listarUmaEmpresa.service";
import atualizarEmpresaService from "../services/Empresas/atualizarEmpresa.service";
import deletarEmpresaService from "../services/Empresas/deletarEmpresa.service";
class Controller {
    static store = async (req: Request, res: Response) => {
        const {
            body: { nome_fantasia, razao_social, cnpj, inscricao_municipal, inscricao_estadual, email, telefone, endereco },
        } = req;
        let resposta = await criarEmpresaService({
            emp_nome_fantasia: nome_fantasia,
            emp_razao_social: razao_social,
            emp_incricao_municipal: inscricao_municipal,
            emp_incricao_estadual: inscricao_estadual,
            emp_email: email,
            emp_telefone: telefone,
            emp_cnpj: cnpj,
            emp_enderecos: !!endereco
                ? ({
                      end_uf: endereco?.uf,
                      end_cidade: endereco?.cidade,
                      end_bairro: endereco?.bairro,
                      end_rua: endereco?.rua,
                      end_numero: endereco?.numero,
                      end_cep: endereco?.cep,
                  } as any)
                : (undefined as any),
        });
        return res.status(201).json(resposta);
    };
    static index = async (req: Request, res: Response) => {
        const resposta = await listarEmpresasService();
        return res.status(200).json(instanceToPlain(resposta));
    };
    static show = async (req: Request, res: Response) => {
        const {
            params: { id },
        } = req;
        const resposta = await listarUmaEmpresaService({ id });
        return res.status(200).json(instanceToPlain(resposta));
    };
    static update = async (req: Request, res: Response) => {
        const {
            body: { nome_fantasia, razao_social, inscricao_municipal, inscricao_estadual, email, telefone },
            params: { id },
        } = req;
        let resposta = await atualizarEmpresaService(
            {
                emp_nome_fantasia: nome_fantasia,
                emp_razao_social: razao_social,
                emp_incricao_municipal: inscricao_municipal,
                emp_incricao_estadual: inscricao_estadual,
                emp_email: email,
                emp_telefone: telefone,
                emp_cnpj: undefined as any,
                emp_enderecos: {},
            },
            { id }
        );
        return res.status(200).json(resposta);
    };
    static delete = async (req: Request, res: Response) => {
        const {
            params: { id },
        } = req;
        await deletarEmpresaService({ id });
        return res.status(204).json();
    };
}
export default Controller;
