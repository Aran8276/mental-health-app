import authUseCase from "@/controller/auth/auth.controller";
import authenticateToken from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

const { login, register, check } = authUseCase;

router.post("/login", login);
router.post("/register", register);
router.get("/check", authenticateToken, check);

export default router;
