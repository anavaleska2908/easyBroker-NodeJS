import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
import Empresas from "../../entities/empresas.entity";
import Usuarios from "../../entities/usuarios.entity";
import Imoveis from "../../entities/imoveis.entity";
import { IArrendamentos } from "../../interfaces";
import AppDataSource from "../../data-source";
const criarArrendamentoService = async ({
  id_usuario,
  id_imovel,
  id_empresa,
  valor,
}: IArrendamentos) => {
  const usuario = !!id_usuario
    ? await AppDataSource.getRepository(Usuarios).findOne({
        where: { id: id_usuario },
      })
    : null;
  const imovel = !!id_imovel
    ? await AppDataSource.getRepository(Imoveis).findOne({
        where: { id: id_imovel },
      })
    : null;
  const empresa = !!id_empresa
    ? await AppDataSource.getRepository(Empresas).findOne({
        where: { id: id_empresa },
      })
    : null;
  const arrendarRepository = AppDataSource.getRepository(
    Usuarios_empresas_imoveis
  );
  const objArrendar = arrendarRepository.create({
    uei_id_usuario_fk: usuario,
    uei_id_imovel_fk: imovel,
    uei_id_empresa_fk: empresa,
    uei_valor_imovel: valor,
  } as any);
  return await arrendarRepository.save(objArrendar);
};
export default criarArrendamentoService;
