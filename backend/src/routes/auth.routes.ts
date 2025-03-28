import authUseCase from "@/controller/auth/auth.controller";
import authenticateToken from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

const { login, register, check, verify } = authUseCase;

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.get("/check", authenticateToken, check);

export default router;
