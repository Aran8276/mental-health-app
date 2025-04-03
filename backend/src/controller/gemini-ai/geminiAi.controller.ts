import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
// import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import { geminiAiValidation } from "./geminiAi.validation";
import * as env from "dotenv";
import { GoogleGenAI } from "@google/genai";

env.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const geminiAiUseCase = {
    sendChat: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, geminiAiValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: data.body,
        });

        res.json(
            msgTemplate("Data berhasil diambil", {
                response: response.text,
            }),
        );
    },
};

export default geminiAiUseCase;
