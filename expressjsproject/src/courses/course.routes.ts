import { Router } from "express";
import {  UserRoles } from "../user/user.intity";
import { CourseService } from "./courser.service";
import { CourseController } from "./course.controller";


export default function courseRoutes(courseService: CourseService,createAuthMiddlewares:any) {
  const router = Router();
  const courseController = new CourseController(courseService);
  const{authenticate,authorize,authOwnerOrAdmin}=createAuthMiddlewares;
  router.get("/", courseController.getAll);
  router.get("/:id", courseController.getById);


  router.post("/", authenticate, authorize(UserRoles.ADMIN,UserRoles.COACH),(req,res)=> courseController.create(req,res));
  router.put("/:id", authenticate, authorize(UserRoles.ADMIN,UserRoles.COACH),authOwnerOrAdmin,(req,res)=> courseController.update(req,res));
  router.delete("/:id", authenticate, authorize(UserRoles.ADMIN,UserRoles.COACH),authOwnerOrAdmin,(req,res)=> courseController.delete(req,res));
  return router;
}


