import "dotenv/config";
import morgan from "morgan";
import express from "express";
import { errorHandler, notFoundHandler } from "./shared/middleware/error.middleware";
import { migrateInitialUsers, users } from "./shared/data";
import helmet from "helmet";
import { courseRoutes } from "./courses/course.routes";
import { userRoutes } from "./user/user.routes";
import { authRoutes } from "./auth/auth.routes";
const PORT = process.env.PORT || 3000;
migrateInitialUsers();
export const app = express();
app.use(express.json());

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(helmet());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes)

app.use(errorHandler);
app.use(notFoundHandler);
if (process.env.NODE_ENV !== "test")

    app.listen(PORT, () => {
        console.log(`app is listening on port: ${PORT}`);
    });