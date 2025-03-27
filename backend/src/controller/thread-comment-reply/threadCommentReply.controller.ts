import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import {
    threadCommentReplyUpdateValidation,
    threadCommentReplyValidation,
} from "./threadCommentReply.validation";
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

const threadCommentReplyUseCase = {
    createThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadCommentReplyValidation);
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
            const threadCommentReply = await prisma.threadCommentReply.create({
                omit: {
                    id: true,
                },
                data: { ...data, owner_id: user.id },
            });

            res.json(msgTemplate("Data berhasil ditambahkan", threadCommentReply));
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

    readThreadCommentReply: async (req: Request, res: Response) => {
        const threadCommentReply = await prisma.threadCommentReply.findMany({
            include: {
                owner: true,
                comment: true
            },
        });

        res.json(msgTemplate("Data berhasil diambil", threadCommentReply));
    },

    readThreadCommentReplyById: async (req: Request, res: Response) => {
        const threadCommentReply = await prisma.threadCommentReply.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                owner: true,
                comment: true
            },
        });

        if (!threadCommentReply) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil diambil", threadCommentReply));
    },

    updateThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadCommentReplyUpdateValidation);
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

        const isOwnedAndFound = await prisma.threadCommentReply.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!isOwnedAndFound) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const { id, thread_id, ...updateData } = data;
        void id;
        void thread_id;
        const threadCommentReply = await prisma.threadCommentReply.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: updateData,
        });

        res.json(msgTemplate("Data berhasil diupdate", threadCommentReply));
    },

    deleteThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        const user = req.user as User;

        const threadCommentReplyExists = await prisma.threadCommentReply.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!threadCommentReplyExists) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const threadCommentReply = await prisma.threadCommentReply.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!threadCommentReply) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil dihapus", threadCommentReply));
    },
};

export default threadCommentReplyUseCase;
