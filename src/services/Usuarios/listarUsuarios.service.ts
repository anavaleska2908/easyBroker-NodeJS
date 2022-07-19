import AppDataSource from "../../data-source";
import usuariosEntity from "../../entities/usuarios.entity";
const listarUsuariosService = async () => await AppDataSource.getRepository(usuariosEntity).find();
export default listarUsuariosService;
