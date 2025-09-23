import { Router } from "express";
import { UserRoles } from "./user.intity";
import { usersController } from "./users.controller";
import { authenticate, authorize } from "../shared/middleware/auth.middleware";





export const userRoutes = Router();

userRoutes.get("/me", authenticate, (req, res,) => { usersController.getCurrentUser(req, res) });
userRoutes.put("/me", authenticate, (req, res,) => { usersController.updateCurrentUser(req, res) });

userRoutes.post("/CreateCoach", authenticate, authorize(UserRoles.ADMIN), (req, res,) => { usersController.createCoach(req, res) });


