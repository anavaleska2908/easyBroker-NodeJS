import AppDataSource from "../../data-source";
import Agendamentos from "../../entities/agendamentos.entity";
const listarAgendamentosService = async () => await AppDataSource.getRepository(Agendamentos).find();
export default listarAgendamentosService;
