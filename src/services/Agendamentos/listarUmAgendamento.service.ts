import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
import { IDataUuid } from "../../interfaces";
const listarUmAgendamentoService = async ({ id }: IDataUuid) => {
  return await AppDataSource.getRepository(Agendamentos).findOne({
    where: { id },
  });
};
export default listarUmAgendamentoService;
