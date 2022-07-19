import AppDataSource from "../../data-source";
import Empresas from "../../entities/empresas.entity";
import Enderecos from "../../entities/enderecos.entity";
import Imoveis from "../../entities/imoveis.entity";
import Usuarios from "../../entities/usuarios.entity";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
import { ICriacaoImv } from "../../interfaces";
const criarImovelService = async ({
  imv_inscricao_iptu,
  imv_descricao,
  imv_status_situacao,
  imv_status_condominio,
  imv_status_servico,
  imv_status_tipo,
  imv_status_garagem,
  imv_qtde_vagas_garagem,
  imv_qtde_quartos,
  imv_qtde_banheiros,
  imv_qtde_suites,
  imv_enderecos,
  id_usuario,
  id_empresa,
  valor,
}: ICriacaoImv) => {
  const imoveisRepository = AppDataSource.getRepository(Imoveis);
  const enderecosRepository = AppDataSource.getRepository(Enderecos);
  const UsuariosRepository = AppDataSource.getRepository(Usuarios);
  const EmpresasRepository = AppDataSource.getRepository(Empresas);
  const pivotRepository = AppDataSource.getRepository(
    Usuarios_empresas_imoveis
  );
  const usuarioId = !!id_usuario
    ? await UsuariosRepository.findOne({ where: { id: id_usuario } })
    : null;
  const empresaId = !!id_empresa
    ? await EmpresasRepository.findOne({ where: { id: id_empresa } })
    : null;
  const { end_uf, end_cidade, end_bairro, end_rua, end_numero, end_cep }: any =
    imv_enderecos;
  const objEndereco = enderecosRepository.create({
    end_uf,
    end_cidade,
    end_bairro,
    end_rua,
    end_numero,
    end_cep,
  } as any);
  const endereco = await enderecosRepository.save(objEndereco);
  const objImovel = imoveisRepository.create({
    imv_inscricao_iptu,
    imv_descricao,
    imv_status_situacao,
    imv_status_condominio,
    imv_status_servico,
    imv_qtde_quartos,
    imv_status_tipo,
    imv_qtde_banheiros,
    imv_qtde_suites,
    imv_status_garagem,
    imv_qtde_vagas_garagem,
    imv_enderecos: [endereco],
  } as any);
  const imovel = await imoveisRepository.save(objImovel);
  const objPivot = pivotRepository.create({
    uei_valor_imovel: valor,
    uei_id_usuario_fk: usuarioId,
    uei_id_empresa_fk: empresaId,
    uei_id_imovel_fk: imovel,
  } as any);
  await pivotRepository.save(objPivot);
  return imovel;
};
export default criarImovelService;
