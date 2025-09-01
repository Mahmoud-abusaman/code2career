
import { GenericRepository } from "../shared/generic.repository";
import {User, UserRoles } from "./user.intity";
import bcrypt from "bcryptjs"
import { v4 as uuid } from "uuid";

import { removeFields } from "../utils/object.util";
export class UsersService {
    
    constructor(private userRepo: GenericRepository<User>) { }

    async createCoach (name:string ,email:string, password:string, role:UserRoles){
        const newUser: User = {
            id: uuid(),
            name,
            email,
            password:await bcrypt.hash(password,await bcrypt.genSalt()),
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
        };        
        let result= await this.userRepo.create(newUser);
        return removeFields(result, [ "password" ]);
    }
    async getCurrentUser(userId:string){
        let user=await  this.userRepo.getById(userId);
        return removeFields(user!,["password"])
    }
    async updateCurentUser(currentUserId:string, name:string, password:string, email:string){
        let user= await this.userRepo.getById(currentUserId);
        if(!user){
            throw new Error("User not found");
        }
        user.name=name;
        user.password=  await bcrypt.hash(password, await bcrypt.genSalt());
        user.email=email;
        user.updatedAt=new Date();
        
        let newUser=await this.userRepo.update(user);
        return removeFields(newUser, ["password"]);
    }

}



