import { Express } from "express";
import loginRoute from "./login.route";
import empresaRoute from "./empresas.route";
import usuarioRoute from "./usuarios.route";
import imoveisRoute from "./imoveis.route";
import agendamentoRoute from "./agendamentos.route";
import arrendarRoute from "./arrendar.route";
import enderecosRoute from "./enderecos.route";
import { autenticacaoMiddleware } from "../middlewares/autenticacao.middleware";
export const AppRoutes = (app: Express) => {
    app.use("/login", loginRoute);
    app.use("/empresas", empresaRoute);
    app.use("/usuarios", usuarioRoute);
    app.use(autenticacaoMiddleware);
    app.use("/enderecos", enderecosRoute);
    app.use("/imoveis", imoveisRoute);
    app.use("/agendamentos", agendamentoRoute);
    app.use("/arrendar", arrendarRoute);
};
