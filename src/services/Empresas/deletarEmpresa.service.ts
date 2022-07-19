import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import Enderecos from "../../entities/enderecos.entity";
import Usuarios_empresas from "../../entities/usuarios_empresas.entity";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
import { IDataUuid } from "../../interfaces";
const deletarEmpresaService = async ({ id }: IDataUuid) => {
    await setNull({ id });
    await AppDataSource.getRepository(Empresas).delete(id);
};
const setNull = async ({ id }: IDataUuid) => {
    await AppDataSource.getRepository(Usuarios_empresas_imoveis).update({ uei_id_empresa_fk: id } as any, { uei_id_empresa_fk: null } as any);
    await AppDataSource.getRepository(Usuarios_empresas).update({ ue_id_empresa_fk: id } as any, { ue_id_empresa_fk: null } as any);
    await AppDataSource.getRepository(Enderecos).update({ end_id_empresa_fk: id } as any, { end_id_empresa_fk: null } as any);
};
export default deletarEmpresaService;
