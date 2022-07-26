import { Router } from "express";
import Controller from "../controllers/agendamentos.controller";
import verificarCampos from "../middlewares/verificarCampos.middleware";
import verificarIds from "../middlewares/verificarIds.middleware";
const agendamentos = Router();
agendamentos.get("/", Controller.index);
agendamentos.get("/:id", verificarIds, Controller.show);
agendamentos.post("/", verificarCampos, Controller.store);
agendamentos.patch("/:id", verificarIds, verificarCampos, Controller.update);
agendamentos.delete("/:id", verificarIds, Controller.delete);
export default agendamentos;
