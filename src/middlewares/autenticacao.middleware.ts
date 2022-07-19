import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";
export const autenticacaoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {
        headers: { authorization },
    } = req;
    const token = authorization?.split(" ")[1];
    if (!!token) {
        let pass = true;
        jwt.verify(token as string, "SECRET_KEY" as string, (err, decoded) => {
            if (!!err) pass = false;
        });
        if (!!!pass) throw new AppError(401, "Token inválido!");
        !!pass && next();
    } else {
        throw new AppError(401, "Token não enviado!");
    }
};
