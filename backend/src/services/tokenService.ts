import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as env from "dotenv";
import { prisma } from "@/config/prismaClient"; // Adjust path if needed
import ms from "ms";

env.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_TOKEN_EXPIRY = (process.env.JWT_ACCESS_TOKEN_EXPIRY ||
    "15m") as ms.StringValue;
const REFRESH_TOKEN_EXPIRY = (process.env.JWT_REFRESH_TOKEN_EXPIRY ||
    "7d") as ms.StringValue;
const SALT_ROUNDS = 10; // Same as used for password hashing

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    console.error("FATAL ERROR: JWT Secret keys are not defined in .env file.");
    process.exit(1); // Exit if secrets aren't set
}

export interface TokenPayload {
    id: number; // Changed from userId to id to match your user model
    // Add other non-sensitive data if needed (e.g., roles)
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    // Generate the actual token
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return refreshToken;
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch (error: unknown) {
        console.error("Invalid access token:", error); // Log specific error if needed
        return null;
    }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch (error: unknown) {
        console.error("Invalid refresh token:", error);
        return null;
    }
};

/**
 * Stores the HASHED refresh token in the database for the user.
 */
export const storeRefreshToken = async (
    userId: number,
    refreshToken: string,
): Promise<boolean> => {
    try {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, SALT_ROUNDS);
        await prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedRefreshToken },
        });
        return true;
    } catch (error) {
        console.error(`Error storing refresh token for user ${userId}:`, error);
        return false;
    }
};

/**
 * Validates if the provided refresh token matches the hashed one stored for the user.
 */
export const validateStoredRefreshToken = async (
    userId: number,
    providedRefreshToken: string,
): Promise<boolean> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { hashedRefreshToken: true },
        });

        if (!user || !user.hashedRefreshToken) {
            console.warn(
                `No stored refresh token found for user ${userId} during validation.`,
            );
            return false; // No stored token or user doesn't exist
        }

        return await bcrypt.compare(
            providedRefreshToken,
            user.hashedRefreshToken,
        );
    } catch (error) {
        console.error(
            `Error validating stored refresh token for user ${userId}:`,
            error,
        );
        return false;
    }
};

/**
 * Removes the stored refresh token hash for the user (logout).
 */
export const removeRefreshToken = async (userId: number): Promise<boolean> => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: null },
        });
        return true;
    } catch (error) {
        console.error(
            `Error removing refresh token for user ${userId}:`,
            error,
        );
        return false;
    }
};
