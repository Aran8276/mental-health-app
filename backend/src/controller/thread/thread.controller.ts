import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import { threadValidation } from "./thread.validation";
import { RequestWithUser } from "@/middleware/authMiddleware.type";

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    role: string;
    iat: number;
}

const threadUseCase = {
    createThread: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadValidation);
        const user = req.user as User;

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        try {
            const thread = await prisma.thread.create({
                data: { ...data, owner_id: user.id },
            });

            res.json(msgTemplate("Data berhasil ditambahkan", thread));
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json(
                    msgTemplate("Terjadi kesalahan", {
                        error: error.message.replace("\n", ""),
                    }),
                );
            }
        }
    },

    readThread: async (req: Request, res: Response) => {
        const thread = await prisma.thread.findMany({
            include: {
                owner: true,
            },
        });

        res.json(msgTemplate("Data berhasil diambil", thread));
    },

    readThreadById: async (req: Request, res: Response) => {
        const thread = await prisma.thread.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                owner: true,
            },
        });

        if (!thread) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil diambil", thread));
    },

    updateThread: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadValidation);
        const user = req.user as User;

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const isOwnedAndFound = await prisma.thread.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!isOwnedAndFound) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const thread = await prisma.thread.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });

        res.json(msgTemplate("Data berhasil diupdate", thread));
    },

    deleteThread: async (req: RequestWithUser, res: Response) => {
        const user = req.user as User;

        const threadExists = await prisma.thread.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!threadExists) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const thread = await prisma.thread.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!thread) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil dihapus", thread));
    },
};

export default threadUseCase;
