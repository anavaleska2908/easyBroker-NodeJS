import express from "express";
import { UserCreate } from "../../src/interfaces";
declare global {
    namespace Express {
        interface Request {
            newUser: UserCreate;
        }
    }
}
