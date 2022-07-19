import { Router } from "express";
import controller from "../controllers/logarUsuario.controller";
import middleware from "../middlewares/login.middleware";
const login = Router();
login.use(middleware);
login.post("/", controller.store);
export default login;
