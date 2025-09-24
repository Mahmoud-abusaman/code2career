import { Router } from "express";
import { UserRoles } from "../user/user.intity";
import { courseController } from "./course.controller";
import { authenticate, authorize, authOwnerOrAdmin } from "../shared/middleware/auth.middleware";


export const courseRoutes = Router();
courseRoutes.get("/", courseController.getAll);
courseRoutes.get("/:id", courseController.getById);

// create course - only admin and coach
courseRoutes.post("/", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), (req, res) => courseController.create(req, res));

// update course - only admin and owner coach 
courseRoutes.put("/:id", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), authOwnerOrAdmin, (req, res) => courseController.update(req, res));

// delete course - only admin and owner coach  
courseRoutes.delete("/:id", authenticate, authorize(UserRoles.ADMIN, UserRoles.COACH), authOwnerOrAdmin, (req, res) => courseController.delete(req, res));



