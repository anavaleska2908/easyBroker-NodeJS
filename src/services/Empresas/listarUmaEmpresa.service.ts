import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import { IDataUuid } from "../../interfaces";
const listarUmaEmpresaService = async ({ id }: IDataUuid) => {
    const empresasRepository = AppDataSource.getRepository(Empresas);
    const empresa = await empresasRepository.findOne({ where: { id } });
    return empresa;
};
export default listarUmaEmpresaService;
