import aiConversationUseCase from "@/controller/ai-conversation/aiConversation.controller";
import authenticateToken from "@/middleware/authMiddleware";
import { Router } from "express";

const router = Router();

const {
    createAiConversation,
    readAiConversations,
    readAiConversationById,
    updateAiConversation,
    deleteAiConversation,
} = aiConversationUseCase;

router.post("/", authenticateToken, createAiConversation);
router.get("/", authenticateToken, readAiConversations);
router.get("/:id", authenticateToken, readAiConversationById);
router.put("/:id", authenticateToken, updateAiConversation);
router.delete("/:id", authenticateToken, deleteAiConversation);

export default router;
