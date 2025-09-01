import { GenericRepository } from "../shared/generic.repository";
import { v4 as uuid } from "uuid";
import Course from "./course.entity";
import { CustomError } from "../shared/errors/customError";

export class CourseService {

  constructor(private courseRepo: GenericRepository<Course>) {}

  async getAll() {
    return this.courseRepo.getAll();
  }

  async getById(id: string) {
    return this.courseRepo.getById(id);
  }

  async create(data: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    let  newCourse: Course = {
      ...data,
      id: String(uuid()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.courseRepo.create(newCourse);
  }

  async update(id: string, data: Omit<Course, "id" | "createdAt" | "updatedAt" |"createdBy">,userId:string): Promise<Course | null> {
    const course = await this.courseRepo.getById(id);
    if (!course) throw new CustomError("Course not found", 404);
    if(course.createdBy!== userId) throw new CustomError("Unauthorized", 403);
    const updatedCourse:Course = { ...course, ...data,updatedAt:new Date() } as Course;
    return this.courseRepo.update(updatedCourse);
  }

  async delete(id: string, userId:string): Promise<boolean> {
    const course = await this.courseRepo.getById(id);
    if (!course) throw new CustomError("Course not found", 404);
    if(course.createdBy!== userId) throw new CustomError("Unauthorized", 403);
    return this.courseRepo.delete(id);
  }
}
