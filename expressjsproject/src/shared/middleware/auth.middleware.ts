import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../errors/customError";
import { UserRoles } from "../../user/user.intity";
import userRepository from "../../user/user.repository";
import courseRepository from "../../courses/course.repository";
import { USerPayloudI } from "../userPayload";

const JWT_SECRET = String(process.env.JWT_SECRET);


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new CustomError("Unauthorizeddd", 401);


    const decoded: USerPayloudI = jwt.verify(token, JWT_SECRET) as USerPayloudI;
    if (!decoded) throw new CustomError("Invalid token", 401);

    const user = await userRepository.getById(decoded.id)

    if (!user || user.role !== decoded.role) throw new CustomError("User not found or changed", 401);
    req.user = decoded;
    next();

};
export const authOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.getById(req.user.id)
    const postauther = (await courseRepository.getById(req.params.id))?.createdBy;

    if (!postauther) throw new CustomError("Course not found", 404);
    if (!user) throw new CustomError("User not found or removed", 401);
    else { if (user.id !== postauther && user.role !== UserRoles.ADMIN) throw new CustomError("Forbidden", 403); }
    next();
};
export const authorize = (...roles: UserRoles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = await userRepository.getById(req.user.id)
        if (!user) throw new CustomError("User not found or removed", 401);
        if (!roles.includes(user?.role)) throw new CustomError("Forbidden", 403);
        next();
    };
};




