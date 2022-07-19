import AppDataSource from "../../data-source";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
const listarImovelArrendamento = async ({ id }: any) => await AppDataSource.getRepository(Usuarios_empresas_imoveis).find({ uei_id_imovel_fk: id } as any);
export default listarImovelArrendamento;
