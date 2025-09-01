import "dotenv/config";
import morgan from "morgan";
import express from "express";
import { GenericRepository } from "./shared/generic.repository";
import { User } from "./user/user.intity";
import Course from "./courses/course.entity";
import { UsersService } from "./user/user.service";
import { CourseService } from "./courses/courser.service";
import { AuthService } from "./auth/auth.service";
import userRoutes from "./user/user.routes";
import authRoutes from "./auth/auth.routes";
import courseRoutes from "./courses/course.routes";
import { errorHandler, notFoundHandler } from "./shared/middleware/error.middleware";
import { migrateInitialUsers, users } from "./shared/data";
import helmet from "helmet";
import { createAuthMiddleware } from "./shared/middleware/auth.middleware";




const PORT = process.env.PORT || 3000;
migrateInitialUsers();
const app=express();
app.use(express.json());

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(helmet());

 const theuserRepository = new GenericRepository<User>(users);
const courseRepository = new GenericRepository<Course>([]);
const authService = new AuthService(theuserRepository);
const userService = new UsersService(theuserRepository);
const courseService = new CourseService(courseRepository);
const authMiddlewares = createAuthMiddleware(theuserRepository, courseRepository);
app.use("/users", userRoutes(userService, authMiddlewares));
app.use("/auth", authRoutes(authService));
app.use("/courses",courseRoutes(courseService,authMiddlewares))

app.use(errorHandler);
app.use(notFoundHandler);
app.listen(PORT,()=>{console.log(`app is listening on port: ${PORT}`);
})