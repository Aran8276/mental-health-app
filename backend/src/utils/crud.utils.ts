// --- Helper Functions ---

import { msgTemplate } from "@/config/msgTemplate";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { InitialRules, make } from "simple-body-validator";

/**
 * Parses and validates the ID from request parameters.
 * Sends a 400 response if the ID is invalid.
 */
const parseNumericId = (req: Request, res: Response): number | null => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json(
            msgTemplate("Invalid ID provided. ID must be a number."),
        );
        return null;
    }
    return id;
};

/**
 * Handles request body validation using simple-body-validator.
 * Sends a 422 response if validation fails.
 * Returns true if validation passes, false otherwise.
 */
const validateRequestBody = (
    req: Request,
    res: Response,
    rules: InitialRules,
): boolean => {
    const validator = make(req.body, rules);
    if (!validator.validate()) {
        res.status(422).json(
            msgTemplate(
                "Validation failed. Please check your input.", // More generic message
                validator.errors().all(),
            ),
        );
        return false;
    }
    return true;
};

/**
 * Standard error handler for controller actions.
 * Logs the error and sends an appropriate response.
 */
const handleControllerError = (
    res: Response,
    error: unknown,
    defaultMessage = "An unexpected error occurred",
) => {
    console.error("Controller Error:", error); // Log the actual error for debugging

    // Basic check for Prisma known errors, can be expanded
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Example: Unique constraint violation
        if (error.code === "P2002") {
            res.status(409).json(
                msgTemplate(
                    "Conflict: Resource already exists or violates constraints.",
                    { code: error.code },
                ),
            );
            return;
        }
        // Add more Prisma error codes as needed
    }

    if (error instanceof Error) {
        res.status(400).json(
            // Keep 400 as per original, but 500 might be better for truly unexpected errors
            msgTemplate(defaultMessage, {
                error: error.message.replace(/[\r\n]+/g, " "), // Clean up message
            }),
        );
    } else {
        res.status(500).json(
            // Use 500 for unknown errors
            msgTemplate(defaultMessage, { error: "Unknown error structure" }),
        );
    }
};

export { parseNumericId, validateRequestBody, handleControllerError };
