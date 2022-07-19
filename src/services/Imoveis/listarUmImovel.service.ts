import AppDataSource from "../../data-source";
import Imoveis from "../../entities/imoveis.entity";
import { IDataUuid } from "../../interfaces";
const listarUmImovelService = async ({ id }: IDataUuid) => await AppDataSource.getRepository(Imoveis).findOne({ where: { id } });
export default listarUmImovelService;
