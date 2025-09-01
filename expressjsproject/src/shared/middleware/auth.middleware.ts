import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../errors/customError";
import { User, UserRoles } from "../../user/user.intity";
import { GenericRepository } from "../generic.repository";
import Course from "../../courses/course.entity";

const JWT_SECRET = String(process.env.JWT_SECRET);
export interface AuthRequest extends Request {
    user?: any;
}


export const createAuthMiddleware = (userRepository: GenericRepository<User>, courserepo: GenericRepository<Course>) => {
    const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) throw new CustomError("Unauthorizeddd", 401);


        const decoded: any = jwt.verify(token, JWT_SECRET);
        if (!decoded) throw new CustomError("Invalid token", 401);

        const user = await userRepository.getById(decoded.id)

        if (!user || user.role !== decoded.role) throw new CustomError("User not found or changed", 401);
        req.user = decoded;
        next();

    };
    const authOwnerOrAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = await userRepository.getById(req.user.id)
        const postauther = (await courserepo.getById(req.params.id))?.createdBy;

        if (!postauther) throw new CustomError("Course not found", 404);
        if (!user) throw new CustomError("User not found or removed", 401);
        else { if (user.id !== postauther && user.role !== UserRoles.ADMIN) throw new CustomError("Forbidden", 403); }
        next();
    };
    const authorize = (...roles: UserRoles[]) => {
        return async (req: AuthRequest, res: Response, next: NextFunction) => {
            const user = await userRepository.getById(req.user.id)
            if (!user) throw new CustomError("User not found or removed", 401);
            if (!roles.includes(user?.role)) throw new CustomError("Forbidden", 403);
            next();
        };
    };



    return { authenticate, authorize, authOwnerOrAdmin };
};
