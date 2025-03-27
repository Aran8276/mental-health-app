import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import {
    threadCommentUpdateValidation,
    threadCommentValidation,
} from "./threadComment.validation";
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

const threadCommentUseCase = {
    createThreadComment: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadCommentValidation);
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
            const threadComment = await prisma.threadComment.create({
                omit: {
                    id: true,
                },
                data: { ...data, owner_id: user.id },
            });

            res.json(msgTemplate("Data berhasil ditambahkan", threadComment));
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

    readThreadComment: async (req: Request, res: Response) => {
        const threadComment = await prisma.threadComment.findMany({
            include: {
                owner: true,
                thread: true,
                thread_comment_replies: true,
            },
        });

        res.json(msgTemplate("Data berhasil diambil", threadComment));
    },

    readThreadCommentById: async (req: Request, res: Response) => {
        const threadComment = await prisma.threadComment.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                owner: true,
                thread: true,
                thread_comment_replies: true,
            },
        });

        if (!threadComment) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil diambil", threadComment));
    },

    updateThreadComment: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadCommentUpdateValidation);
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

        const isOwnedAndFound = await prisma.threadComment.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!isOwnedAndFound) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const { id, thread_id, ...updateData } = data;
        void id;
        void thread_id;
        const threadComment = await prisma.threadComment.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: updateData,
        });

        res.json(msgTemplate("Data berhasil diupdate", threadComment));
    },

    deleteThreadComment: async (req: RequestWithUser, res: Response) => {
        const user = req.user as User;

        const threadCommentExists = await prisma.threadComment.findFirst({
            where: { id: parseInt(req.params.id), owner_id: user.id },
        });

        if (!threadCommentExists) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const threadComment = await prisma.threadComment.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!threadComment) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil dihapus", threadComment));
    },
};

export default threadCommentUseCase;
