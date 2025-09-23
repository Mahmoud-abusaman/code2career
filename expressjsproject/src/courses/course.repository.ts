import { GenericRepository } from "../shared/generic.repository";
import Course from "./course.entity";

const courseRepository = new GenericRepository<Course>([]);
export default courseRepository;