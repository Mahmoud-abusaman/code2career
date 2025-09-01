import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid";

import { GenericRepository } from "../shared/generic.repository";
import {User, UserRoles } from "../user/user.intity";
import { CustomError } from "../shared/errors/customError";
const SECRET =  String(process.env.JWT_SECRET);


export class AuthService {
    constructor(private userRepo: GenericRepository<User>) { }


    async signup(name: string, email: string, password: string): Promise<User> {
        let newpass=await bcrypt.hash(password, await bcrypt.genSalt())
        let alreadyFound=await this.userRepo.find({email});
        if(alreadyFound.length){throw new CustomError("email already exist",400)}
        const newUser: User = {
            id: uuid(),
            name,
            email,
            password:newpass,
            role: UserRoles.STUDENT,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return this.userRepo.create(newUser);
    }

    async login(email: string, password: string): Promise<string | null> {
        const user:User = (await this.userRepo.find({email}))[0] ;        
        if (!user)throw new CustomError("Invalid email or password", 401);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new CustomError("Invalid email or password", 401);
        return jwt.sign({ id: user.id, role: user.role, email:user.email }, SECRET, { expiresIn: "1h" });
    }

    verifyToken(token: string) {
        return jwt.verify(token, SECRET);

    }
}
