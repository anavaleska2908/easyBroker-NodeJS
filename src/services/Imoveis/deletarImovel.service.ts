import AppDataSource from "../../data-source";
import Agendamentos_imoveis from "../../entities/agendamentos_imoveis.entity";
import Enderecos from "../../entities/enderecos.entity";
import Imoveis from "../../entities/imoveis.entity";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
import { IDataUuid } from "../../interfaces";
const deletarImovelService = async ({ id }: IDataUuid) => {
    await setNull({ id });
    await AppDataSource.getRepository(Imoveis).delete(id);
};
const setNull = async ({ id }: IDataUuid) => {
    await AppDataSource.getRepository(Agendamentos_imoveis).delete({ ai_id_imovel_fk: id } as any);
    await AppDataSource.getRepository(Usuarios_empresas_imoveis).delete({ uei_id_imovel_fk: id } as any);
    await AppDataSource.getRepository(Enderecos).delete({ end_id_imovel_fk: id } as any);
};
export default deletarImovelService;
