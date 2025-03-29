import userUseCase from "@/controller/user/user.controller";
import { Router } from "express";

const router = Router();

const { readUserById, readUser } = userUseCase;

// router.post("/", authenticateToken, createUser);
router.get("/", readUser);
router.get("/:id", readUserById);
// router.put("/:id", authenticateToken, updateUser);
// router.delete("/:id", authenticateToken, deleteUser);

export default router;
