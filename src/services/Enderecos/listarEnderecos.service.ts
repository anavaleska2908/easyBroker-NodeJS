import AppDataSource from "../../data-source";
import Enderecos from "../../entities/enderecos.entity";
const listarEmpresasService = async () => await AppDataSource.getRepository(Enderecos).find();
export default listarEmpresasService;
