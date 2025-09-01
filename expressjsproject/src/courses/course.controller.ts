import { Request, Response, NextFunction } from "express";
import { CourseService } from "./courser.service";
import { AuthRequest } from "../shared/middleware/auth.middleware";
import { CustomError } from "../shared/errors/customError";
import { createCourseSchema, updateCourseSchema } from "./course.dto";
import { success } from "zod";

export class CourseController {

  constructor(private service: CourseService) {}

  getAll = async (req: Request, res: Response) => {
    res.json({success:true, data:{courses:await this.service.getAll()}});
  };

  getById = async (req: Request, res: Response) => {
     const course = await this.service.getById(req.params.id);
    if (!course) throw new CustomError("Course not found", 404);
    res.json({success:true, data:{course}});
  };

  create = async (req: AuthRequest, res: Response) => {
    const parsed = createCourseSchema.safeParse(req.body);
    if (!parsed.success) throw new CustomError(parsed.error.issues[0].message, 400);

    const newCourse = await this.service.create({
      ...parsed.data,
      createdBy: req.user.id
      
    });

    res.status(201).json({success:true, data:{course:newCourse}});
  };

  update =async  (req: AuthRequest, res: Response) => {
    const course = this.service.getById(req.params.id);
    if (!course) throw new CustomError("Course not found", 404);

    const parsed = updateCourseSchema.safeParse(req.body);
    if (!parsed.success) throw new CustomError(parsed.error.issues[0].message, 400);
    const updated = await this.service.update(req.params.id, parsed.data,req.user.id);
    res.json({success:true,data:{course:updated}});
  };

  delete = async (req: AuthRequest, res: Response) => {


    const result = await this.service.delete(req.params.id, req.user.id);
    res.json({ success: result });
  };
}
