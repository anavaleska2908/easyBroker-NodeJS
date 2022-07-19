import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import criarAgendamentoService from "../services/Agendamentos/criarAgendamento.service";
import atualizarAgendamentoService from "../services/Agendamentos/atualizarAgendamento.service";
import listarAgendamentosService from "../services/Agendamentos/listarAgendamentos.service";
import listarUmAgendamentoService from "../services/Agendamentos/listarUmAgendamento.service";
import deletarAgendamentoService from "../services/Agendamentos/deletarAgendamento.service";
class Controller {
    static store = async (req: Request, res: Response) => {
        const {
            body: { observacoes, status_agendamento, horario_inicio, horario_fim, cliente, empresa, corretor, lista_imoveis },
        } = req;
        let resposta = await criarAgendamentoService({
            agn_observacoes: observacoes,
            agn_status_agendamento: status_agendamento,
            agn_horario_inicio: horario_inicio,
            agn_horario_fim: horario_fim,
            agn_id_cliente_fk: cliente,
            agn_id_empresa_fk: empresa,
            agn_id_corretor_fk: corretor,
            ids_imoveis: lista_imoveis,
        });
        return res.status(201).json(resposta);
    };
    static index = async (req: Request, res: Response) => {
        const resposta = await listarAgendamentosService();
        return res.status(200).json(instanceToPlain(resposta));
    };
    static show = async (req: Request, res: Response) => {
        const {
            params: { id },
        } = req;
        const resposta = await listarUmAgendamentoService({ id });
        return res.status(200).json(resposta);
    };
    static update = async (req: Request, res: Response) => {
        const {
            body: { observacoes, status_agendamento },
            params: { id },
        } = req;
        let resposta = await atualizarAgendamentoService(
            {
                agn_observacoes: observacoes,
                agn_status_agendamento: status_agendamento,
            },
            { id }
        );
        return res.status(200).json(resposta);
    };
    static delete = async (req: Request, res: Response) => {
        const {
            params: { id },
        } = req;
        await deletarAgendamentoService({ id });
        return res.status(204).json();
    };
}
export default Controller;
