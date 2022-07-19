import AppDataSource from "../../data-source";
import Usuarios_empresas_imoveis from "../../entities/usuarios_empresas_imoveis.entity";
const deletarArrendamentoService = async (
  { id_usuario, id_empresa }: any,
  { id_imovel }: any
) => {
  let where = !!id_usuario
    ? ({ uei_id_usuario_fk: id_usuario } as any)
    : ({ uei_id_empresa_fk: id_empresa } as any);
  await AppDataSource.getRepository(Usuarios_empresas_imoveis).delete({
    ...where,
    uei_id_imovel_fk: id_imovel,
  });
};
export default deletarArrendamentoService;
