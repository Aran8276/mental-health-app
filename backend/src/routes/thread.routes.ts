import threadUseCase from "@/controller/thread/thread.controller";
import { Router } from "express";

const router = Router();

const { createThread, readThread, readThreadById, updateThread, deleteThread } =
    threadUseCase;

router.post("/", createThread);
router.get("/", readThread);
router.get("/:id", readThreadById);
router.put("/:id", updateThread);
router.delete("/:id", deleteThread);

export default router;
