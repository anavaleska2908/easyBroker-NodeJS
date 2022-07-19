import AppDataSource from "../../data-source";
import Imoveis from "../../entities/imoveis.entity";
const listarImoveisService = async () => await AppDataSource.getRepository(Imoveis).find();
export default listarImoveisService;
