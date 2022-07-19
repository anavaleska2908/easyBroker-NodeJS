import AppDataSource from "../../data-source";
import Imoveis from "../../entities/imoveis.entity";
import { IDataUuid, IImoveis } from "../../interfaces";
const atualizarImovelService = async (
  {
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
  }: IImoveis,
  { id }: IDataUuid
) => {
  const imoveisRepository = AppDataSource.getRepository(Imoveis);
  await imoveisRepository.update(id, {
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
  } as any);
  return await imoveisRepository.findOne({ where: { id } });
};
export default atualizarImovelService;
