import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import logarUsuarioServices from "../services/Logar/logarUsuario.service";
class Controller {
    static store = async (req: Request, res: Response) => {
        const {
            body: { cpf, senha },
        } = req;
        let resposta = await logarUsuarioServices({
            usr_cpf: cpf,
            usr_senha: senha,
        });
        return res.status(200).json(instanceToPlain(resposta));
    };
}
export default Controller;
