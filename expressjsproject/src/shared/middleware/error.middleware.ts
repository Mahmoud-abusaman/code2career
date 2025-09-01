import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    
    if (err instanceof CustomError) {
        return res.status(err.status).json({ message: err.message });
    }
    
    res.status(500).json({ message: "Internal Server Error" });
};

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
};
