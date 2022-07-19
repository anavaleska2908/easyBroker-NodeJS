import AppDataSource from "../../data-source";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
const listarUmArrendamentoService = async ({ id }: any) => AppDataSource.getRepository(Usuarios_empresas_imoveis).findOne({ where: { id } });
export default listarUmArrendamentoService;
