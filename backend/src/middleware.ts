import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface MyJwtPayload extends JwtPayload {
    userId: ObjectId; 
    firstName: string;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) {
        res.status(403).json({message: "token does not exist"});
        return;
    }
    else {
        try {
            const decoded = verify(token, process.env.JWT_SECRET as string);
            if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && 'firstName' in decoded) {
                const userPayload = decoded as MyJwtPayload;
                req.user = {
                    userId: userPayload.userId,
                    firstName: userPayload.firstName,
                };
                next();
            }
        }
        catch(error) {
            res.status(403).json({message: "invalid token"});
        }
    }
}