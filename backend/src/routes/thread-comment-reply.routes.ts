import threadCommentReplyUseCase from "@/controller/thread-comment-reply/threadCommentReply.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const {
    createThreadCommentReply,
    readThreadCommentReply,
    readThreadCommentReplyById,
    updateThreadCommentReply,
    deleteThreadCommentReply,
} = threadCommentReplyUseCase;

router.post("/", authenticateToken, createThreadCommentReply);
router.get("/", readThreadCommentReply);
router.get("/:id", readThreadCommentReplyById);
router.put("/:id", authenticateToken, updateThreadCommentReply);
router.delete("/:id", authenticateToken, deleteThreadCommentReply);

export default router;
