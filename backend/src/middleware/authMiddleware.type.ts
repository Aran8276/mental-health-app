import { Request } from "express";
import * as jwt from "jsonwebtoken";

export interface RequestWithUser extends Request {
    user?: string | jwt.JwtPayload | undefined;
}
