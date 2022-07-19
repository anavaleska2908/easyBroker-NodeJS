import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import Enderecos from "../../entities/enderecos.entity";
import Imoveis from "../../entities/imoveis.entity";
import Usuarios from "../../entities/usuarios.entity";
import { ICriacaoEnd } from "../../interfaces";
const criarEnderecoService = async ({ end_uf, end_cidade, end_bairro, end_rua, end_numero, end_cep, id_usuario, id_empresa, id_imovel }: ICriacaoEnd) => {
    const enderecosRepository = AppDataSource.getRepository(Enderecos);
    const usuarioId = !!id_usuario ? await AppDataSource.getRepository(Usuarios).findOne({ where: { id: id_usuario } }) : null;
    const empresaId = !!id_empresa ? await AppDataSource.getRepository(Empresas).findOne({ where: { id: id_empresa } }) : null;
    const imoveisId = !!id_imovel ? await AppDataSource.getRepository(Imoveis).findOne({ where: { id: id_imovel } }) : null;
    const objEndereco = enderecosRepository.create({
        end_uf,
        end_cidade,
        end_bairro,
        end_rua,
        end_numero,
        end_cep,
        end_id_usuario_fk: usuarioId,
        end_id_empresa_fk: empresaId,
        end_id_imovel_fk: imoveisId,
    } as any);
    await enderecosRepository.save(objEndereco);
    return objEndereco;
};
export default criarEnderecoService;
