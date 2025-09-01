import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";


export default function authRoutes(authService: AuthService) {
    const router = Router();
    const authController = new AuthController(authService);

    router.post("/login", (req, res) => authController.login(req, res));
    router.post("/signup", (req, res) => authController.signup(req, res));

    return router;
}
