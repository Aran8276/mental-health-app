import { msgTemplate } from "@/config/msgTemplate";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RequestWithUser } from "./authMiddleware.type";

const authenticateToken = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json(msgTemplate("Unauthorized"));
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json(
            msgTemplate("Internal Server Error: JWT secret missing"),
        );
        return;
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.status(403).json(msgTemplate("Forbidden"));
            return;
        }

        req.user = user;
        next();
    });
};

export default authenticateToken;
