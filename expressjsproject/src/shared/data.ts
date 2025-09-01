import { v4 as uuid } from "uuid";

import Course from "../courses/course.entity";
import { User, UserRoles } from "../user/user.intity";
import bcrypt from "bcryptjs";

export const users: User[] = [

];
export async function migrateInitialUsers() {
    users.push(    {
        id: uuid(),
        name: "ADMIN",
        email: "admin@no.com",
        password: await bcrypt.hash("admin123", await bcrypt.genSalt()),
        role: UserRoles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}
export const courses: Course[] = [];
