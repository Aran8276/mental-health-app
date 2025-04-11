import { msgTemplate } from "@/config/msgTemplate";
// import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import { geminiAiValidation } from "./geminiAi.validation";
import { genAI } from "@/config/geminiAi";
import { ContentListUnion, PartUnion } from "@google/genai";
import { validateRequestBody } from "@/utils/crud.utils";

const geminiAiUseCase = {
    sendChat: async (req: Request, res: Response) => {
        if (!validateRequestBody(req, res, geminiAiValidation)) {
            return;
        }

        const data = req.body;

        const content: ContentListUnion = [];

        data.content.map((item: PartUnion) => content.push(item));

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: [...content],
        });

        res.json(
            msgTemplate("Percakapan berhasil diambil", {
                response: response.text,
            }),
        );
    },
};

export default geminiAiUseCase;
