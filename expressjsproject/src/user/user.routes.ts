import { Router } from "express";

import {  UserRoles } from "./user.intity";
import { UsersService } from "./user.service";
import { UsersController } from "./users.controller";

  

export default function userRoutes(userService: UsersService,createAuthMiddlewares:any ) {

const {authenticate,authorize}=createAuthMiddlewares;

  const router = Router();
  const usersController = new UsersController(userService);

router.get("/me", authenticate, (req,res,)=>{usersController.getCurrentUser(req,res)});
router.put("/me", authenticate, (req,res,)=>{usersController.updateCurrentUser(req,res)});

router.post("/CreateCoach", authenticate, authorize(UserRoles.ADMIN), (req,res,)=>{usersController.createCoach(req,res)});

  return router;
}
