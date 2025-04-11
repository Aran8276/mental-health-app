import geminiAiUseCase from "@/controller/gemini-ai/geminiAi.controller";
import { Router } from "express";

const router = Router();

const { sendChat } = geminiAiUseCase;

router.post("/chat", sendChat);

export default router;
