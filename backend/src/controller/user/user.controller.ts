// import { make } from "simple-body-validator";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import { Request, Response } from "express";
// import { userValidation } from "./user.validation";
// import { RequestWithUser } from "@/middleware/authMiddleware.type";

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     username: string;
//     password: string;
//     role: string;
//     iat: number;
// }

const userUseCase = {
    readUser: async (req: Request, res: Response) => {
        const user = await prisma.user.findMany({
            omit: {
                email_verified_at: true,
                password: true,
                role: true,
            },
            include: {
                _count: {
                    select: {
                        thread_comments: true,
                    },
                },
            },
        });

        res.json(msgTemplate("Data berhasil diambil", user));
    },

    readUserById: async (req: Request, res: Response) => {
        if (isNaN(parseInt(req.params.id))) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            omit: {
                email_verified_at: true,
                password: true,
                role: true,
            },
        });

        if (!user) {
            res.status(404).json(msgTemplate("Data tidak ditemukan"));
            return;
        }

        res.json(msgTemplate("Data berhasil diambil", user));
    },

    // updateUser: async (req: RequestWithUser, res: Response) => {
    //     const data = req.body;
    //     const validator = make(data, userValidation);
    //     const user = req.user as User;

    //     if (!validator.validate()) {
    //         res.status(422).json(
    //             msgTemplate(
    //                 "Semua input harus diisi",
    //                 validator.errors().all(),
    //             ),
    //         );
    //         return;
    //     }

    //     const isOwnedAndFound = await prisma.user.findFirst({
    //         where: { id: parseInt(req.params.id), owner_id: user.id },
    //     });

    //     if (!isOwnedAndFound) {
    //         res.status(404).json(msgTemplate("Data tidak ditemukan"));
    //         return;
    //     }

    //     const { id, ...updateData } = data;
    //     void id;
    //     const user = await prisma.user.update({
    //         where: {
    //             id: parseInt(req.params.id),
    //         },
    //         data: updateData,
    //     });

    //     res.json(msgTemplate("Data berhasil diupdate", user));
    // },

    // deleteUser: async (req: RequestWithUser, res: Response) => {
    //     const user = req.user as User;

    //     const userExists = await prisma.user.findFirst({
    //         where: { id: parseInt(req.params.id), owner_id: user.id },
    //     });

    //     if (!userExists) {
    //         res.status(404).json(msgTemplate("Data tidak ditemukan"));
    //         return;
    //     }

    //     const user = await prisma.user.delete({
    //         where: {
    //             id: parseInt(req.params.id),
    //         },
    //     });

    //     if (!user) {
    //         res.status(404).json(msgTemplate("Data tidak ditemukan"));
    //         return;
    //     }

    //     res.json(msgTemplate("Data berhasil dihapus", user));
    // },
};

export default userUseCase;
