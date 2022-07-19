import AppDataSource from "../../data-source";
import Enderecos from "../../entities/enderecos.entity";
import { IDataUuid, IEnderecos } from "../../interfaces";
const atualizarEnderecoService = async ({ end_uf, end_cidade, end_bairro, end_rua, end_numero, end_cep }: IEnderecos, { id }: IDataUuid) => {
    const enderecosRepository = AppDataSource.getRepository(Enderecos);
    await enderecosRepository.update(id, {
        end_uf,
        end_cidade,
        end_bairro,
        end_rua,
        end_numero,
        end_cep,
    } as any);
    return await enderecosRepository.findOne({ where: { id } });
};
export default atualizarEnderecoService;
