import AppDataSource from "../../data-source";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
const listarArrendamentosService = async () => AppDataSource.getRepository(Usuarios_empresas_imoveis).find();
export default listarArrendamentosService;
