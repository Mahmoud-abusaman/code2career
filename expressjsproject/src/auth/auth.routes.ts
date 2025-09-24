import { Router } from "express";
import { authController } from "./auth.controller";


export const authRoutes = Router();

authRoutes.post("/login", (req, res) => authController.login(req, res));
authRoutes.post("/signup", (req, res) => authController.signup(req, res));

