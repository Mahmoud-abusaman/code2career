import { Router } from "express";
import { UserRoles } from "../user/user.intity";
import { courseController } from "./course.controller";
import { authenticate, authorize, authOwnerOrAdmin } from "../shared/middleware/auth.middleware";


export const courseRoutes = Router();
courseRoutes.get("/", courseController.getAll);
courseRoutes.get("/:id", courseController.getById);


courseRoutes.post("/", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), (req, res) => courseController.create(req, res));
courseRoutes.put("/:id", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), authOwnerOrAdmin, (req, res) => courseController.update(req, res));
courseRoutes.delete("/:id", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), authOwnerOrAdmin, (req, res) => courseController.delete(req, res));



