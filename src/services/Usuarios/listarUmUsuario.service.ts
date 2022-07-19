import AppDataSource from "../../data-source";
import Usuarios from "../../entities/usuarios.entity";
import { IDataUuid } from "../../interfaces";
const listarUmUsuarioService = async ({ id }: IDataUuid) => await AppDataSource.getRepository(Usuarios).findOne({ where: { id } });
export default listarUmUsuarioService;
