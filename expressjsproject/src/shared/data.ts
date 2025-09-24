import { v4 as uuid } from "uuid";
import Course from "../courses/course.entity";
import { User, UserRoles } from "../user/user.intity";
import { faker } from '@faker-js/faker';

export const users: User[] = [];
export const courses: Course[] = [];


export  function createRandomUser(userRole:UserRoles|undefined=undefined): User {
  return {
    id: uuid(),
    name : faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    role:userRole?userRole: faker.helpers.arrayElement([
      UserRoles.ADMIN,
      UserRoles.COACH,
      UserRoles.STUDENT,
    ]),
  };
}

export function createRandomCourse(): Course {
  return {
  id: uuid(),
  title : faker.lorem.words(3),
  description: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  createdBy: faker.helpers.arrayElement(users).id,
};
}

export  function migrateInitialUsers() {
    users.push( createRandomUser(UserRoles.ADMIN))
    users.push( createRandomUser(UserRoles.COACH))
    users.push( createRandomUser(UserRoles.STUDENT))
    Array.from({ length: 10 }).forEach(() => {
      users.push( createRandomUser());   
    });
    Array.from({ length: 10 }).forEach(() => {
      courses.push( createRandomCourse());   
    });
}
