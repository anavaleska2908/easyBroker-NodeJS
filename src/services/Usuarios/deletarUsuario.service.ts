import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
import Enderecos from "../../entities/enderecos.entity";
import Usuarios from "../../entities/usuarios.entity";
import Usuarios_empresas from "../../entities/usuarios_empresas.entity";
import { IDataUuid } from "../../interfaces";
const deletarUsuarioService = async ({ id }: IDataUuid) => {
    await setNull({ id });
    await AppDataSource.getRepository(Usuarios).delete(id);
};
const setNull = async ({ id }: IDataUuid) => {
    await AppDataSource.getRepository(Enderecos).update({ end_id_usuario_fk: id } as any, { end_id_usuario_fk: null } as any);
    await AppDataSource.getRepository(Agendamentos).update({ agn_id_corretor_fk: id } as any, { agn_id_corretor_fk: null } as any);
    await AppDataSource.getRepository(Agendamentos).update({ agn_id_cliente_fk: id } as any, { agn_id_cliente_fk: null } as any);
    await AppDataSource.getRepository(Usuarios_empresas).update({ ue_id_usuario_fk: id } as any, { ue_id_usuario_fk: null } as any);
};
export default deletarUsuarioService;
