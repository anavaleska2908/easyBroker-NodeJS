import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
import { IDataUuid } from "../../interfaces";
const atualizarAgendamentoService = async ({ agn_observacoes, agn_status_agendamento }: any, { id }: IDataUuid) => {
    const agendamentosRepository = AppDataSource.getRepository(Agendamentos);
    await agendamentosRepository.update(id, {
        agn_observacoes,
        agn_status_agendamento,
    } as any);
    return agendamentosRepository.findOne({ where: { id } });
};
export default atualizarAgendamentoService;
