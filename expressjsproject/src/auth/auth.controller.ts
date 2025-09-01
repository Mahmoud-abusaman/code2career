import { Request, Response } from 'express';
import {  z } from 'zod';
import { UserRoles } from '../user/user.intity';
import { AuthService } from './auth.service';
import { removeFields } from '../utils/object.util';


const signupSchema = z.object({
    name: z.string().min(3),
    password: z.string().min(6),
    email: z.email(),

});

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export class AuthController {
    
    constructor(private authService:AuthService){}
    async signup(req: Request, res: Response) {
        const parseResult = signupSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.issues });
        }
        const {name,email,password}=parseResult.data;
        const user=await this.authService.signup(name,email,password);
        return res.status(201).json({ success:true,data:removeFields(user,["password"]) });
    }

    async login(req: Request, res: Response) {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.issues });
        }
        const {email,password}=parseResult.data;
        const token=await this.authService.login(email,password);
        return res.status(200).json({ success:true, data:{token} });
    }
}