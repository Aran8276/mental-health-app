import authUseCase from "@/controller/auth/auth.controller";
import authenticateToken from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

const {
    login,
    register,
    check,
    verify,
    resetPassword,
    verifyResetPasswordToken,
} = authUseCase;

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-password", verifyResetPasswordToken);
router.get("/check", authenticateToken, check);

export default router;
