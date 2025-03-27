import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
import { threadValidation } from "./thread.validation";
import { RequestWithUser } from "@/middleware/authMiddleware.type";

const threadUseCase = {
    createThread: async (req: RequestWithUser, res: Response) => {
        const data = req.body;
        const validator = make(data, threadValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const thread = await prisma.thread.create({
            data: data,
        });

        res.json(msgTemplate("Data berhasil ditambahkan", thread));
    },

    readThread: async (req: Request, res: Response) => {
        const thread = await prisma.thread.findMany();
        res.json(msgTemplate("Data berhasil diambil", thread));
    },

    readThreadById: async (req: Request, res: Response) => {
        const thread = await prisma.thread.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!thread) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil diambil", thread));
    },

    updateThread: async (req: Request, res: Response) => {
        const thread = await prisma.thread.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
        });

        const data = req.body;
        const validator = make(data, threadValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        res.json(msgTemplate("Data berhasil diupdate", thread));
    },

    deleteThread: async (req: Request, res: Response) => {
        const threadExists = await prisma.thread.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
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
