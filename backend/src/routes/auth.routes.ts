import authUseCase from "@/controller/auth/auth.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const {
    login,
    register,
    check,
    verify,
    refresh,
    resetPassword,
    verifyResetPasswordToken,
} = authUseCase;

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.post("/reset-password", resetPassword);
router.post("/refresh", refresh);
router.post("/verify-reset-password", verifyResetPasswordToken);
router.get("/check", authenticateToken, check);

export default router;
