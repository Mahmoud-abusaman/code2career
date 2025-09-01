
export enum UserRoles {
    STUDENT="STUDENT",
    ADMIN="ADMIN",
    COACH="COACH"
}
export interface User {
  id: string ;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
