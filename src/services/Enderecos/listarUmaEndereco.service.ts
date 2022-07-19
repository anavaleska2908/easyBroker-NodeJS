import AppDataSource from "../../data-source";
import Enderecos from "../../entities/enderecos.entity";
import { IDataUuid } from "../../interfaces";
const listarUmaEnderecoService = async ({ id }: IDataUuid) => await AppDataSource.getRepository(Enderecos).findOne({ where: { id } });
export default listarUmaEnderecoService;
