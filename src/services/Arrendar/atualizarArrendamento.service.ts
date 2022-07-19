import AppDataSource from "../../data-source";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
const atualizarArrendamentoService = async ({ id_usuario, id_empresa, valor }: any, { id_imovel }: any) => {
    let where = !!id_usuario ? ({ uei_id_usuario_fk: id_usuario } as any) : ({ uei_id_empresa_fk: id_empresa } as any);
    await AppDataSource.getRepository(Usuarios_empresas_imoveis).update({ ...where, uei_id_imovel_fk: id_imovel }, { uei_valor_imovel: valor });
    return await returning({ id_usuario, id_imovel, id_empresa });
};
const returning = async ({ id_usuario, id_empresa, id_imovel }: any) => {
    let whereQuery = !!id_usuario ? "uei.uei_id_usuario_fk = :id_usuario" : "uei.uei_id_empresa_fk = :id_empresa";
    return await AppDataSource.getRepository(Usuarios_empresas_imoveis).createQueryBuilder("uei").where("uei.uei_id_imovel_fk = :id_imovel", { id_imovel }).andWhere(whereQuery, { id_usuario, id_empresa }).getOne();
};
export default atualizarArrendamentoService;
