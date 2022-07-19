import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
import Agendamentos_imoveis from "../../entities/agendamentos_imoveis.entity";
import Imoveis from "../../entities/imoveis.entity";
import { IAgendamentos } from "../../interfaces";
const criarAgendamentoService = async ({ agn_observacoes, agn_status_agendamento, agn_horario_inicio, agn_horario_fim, agn_id_cliente_fk, agn_id_empresa_fk, agn_id_corretor_fk, ids_imoveis }: IAgendamentos) => {
    const agendamentosRepository = AppDataSource.getRepository(Agendamentos);
    const dadosAgendamentos = agendamentosRepository.create({
        agn_observacoes,
        agn_status_agendamento,
        agn_horario_inicio,
        agn_horario_fim,
        agn_id_cliente_fk,
        agn_id_empresa_fk,
        agn_id_corretor_fk,
    } as any);
    const agendamento = await agendamentosRepository.save(dadosAgendamentos);
    const imoveis = await vincularImoveis({ agendamento, ids_imoveis } as any);
    return { ...agendamento, agn_imoveis: imoveis };
};
const vincularImoveis = async ({ agendamento, ids_imoveis }: any) => {
    if (!!ids_imoveis && ids_imoveis.length > 0) {
        const agendamentos_imoveisRepository = AppDataSource.getRepository(Agendamentos_imoveis);
        ids_imoveis.forEach(async (id: string) => {
            let imovel = await AppDataSource.getRepository(Imoveis).findOne({ where: { id } });
            if (!!imovel) {
                let dadosVinculo = agendamentos_imoveisRepository.create({
                    ai_id_agendamento_fk: agendamento,
                    ai_id_imovel_fk: imovel,
                } as any);
                await agendamentos_imoveisRepository.save(dadosVinculo);
            }
        });
    }
};
export default criarAgendamentoService;
