import { Request, Response } from 'express';
import { email, success, z } from 'zod';
import { UserRoles } from './user.intity';
import { UsersService } from './user.service';
import { AuthRequest } from '../shared/middleware/auth.middleware';
import { removeFields } from '../utils/object.util';


const updateUserDto = z.object({
    name: z.string().min(3),
    password: z.string().min(6),
    email: z.email(),
    role:z.enum(UserRoles),

});
const createCoachDto = updateUserDto;

export class UsersController {
    constructor(private userService:UsersService){}



    async getCurrentUser(req: AuthRequest, res: Response) {
        
        const user = await this.userService.getCurrentUser(req.user?.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({success:true, data:{user}});
    }

    async updateCurrentUser(req: AuthRequest, res: Response) {
        const parseResult = updateUserDto.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.issues });
        }
        const { name,password, email, role }=parseResult.data;
        const user = await this.userService.updateCurentUser(req.user?.id, name, password,email);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({success:true, data:{user}});
    }

    async createCoach(req: AuthRequest, res: Response){
        const parseResult=createCoachDto.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.issues });
        }
        const {name,email,password,role}=parseResult.data;
        let user= await this.userService.createCoach( name, email, password,role);
        res.json({success:true,data:{user}});
    }
}