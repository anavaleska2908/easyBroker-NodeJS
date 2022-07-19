import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
import Agendamentos_imoveis from "../../entities/agendamentos_imoveis.entity";
import { IDataUuid } from "../../interfaces";
const deletarAgendamentoService = async ({ id }: IDataUuid) => {
    await AppDataSource.getRepository(Agendamentos_imoveis).delete({ ai_id_agendamento_fk: id } as any);
    await AppDataSource.getRepository(Agendamentos).delete(id);
};
export default deletarAgendamentoService;
