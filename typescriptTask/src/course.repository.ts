import { BaseRepository } from "./repository";
import { Course } from "./models/Course";

export class CourseRepository extends BaseRepository<Course> {
  constructor(arr:Course[]) {
    super(arr);
  }
}
