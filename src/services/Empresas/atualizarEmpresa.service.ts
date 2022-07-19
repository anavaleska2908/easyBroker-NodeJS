import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import { IDataUuid, IEmpresas } from "../../interfaces";
const atualizarEmpresaService = async ({ emp_nome_fantasia, emp_razao_social, emp_incricao_municipal, emp_incricao_estadual, emp_email, emp_telefone }: IEmpresas, { id }: IDataUuid) => {
    const empresasRepository = AppDataSource.getRepository(Empresas);
    await empresasRepository.update(id, {
        emp_nome_fantasia,
        emp_razao_social,
        emp_incricao_municipal,
        emp_incricao_estadual,
        emp_email,
        emp_telefone,
    });
    return await empresasRepository.findOne({ where: { id } });
};
export default atualizarEmpresaService;
