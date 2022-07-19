import AppDataSource from "../../data-source";
import Enderecos from "../../entities/enderecos.entity";
import { IDataUuid } from "../../interfaces";
const deletarEnderecoService = async ({ id }: IDataUuid) => await AppDataSource.getRepository(Enderecos).delete(id);
export default deletarEnderecoService;
