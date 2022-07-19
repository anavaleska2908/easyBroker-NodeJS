import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
const listarEmpresasService = async () => {
    const empresasRepository = AppDataSource.getRepository(Empresas);
    const listaEmpresas = await empresasRepository.find();
    return listaEmpresas;
};
export default listarEmpresasService;
