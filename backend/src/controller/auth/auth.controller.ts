import { RequestWithUser } from "@/middleware/authMiddleware.type";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { make } from "simple-body-validator";
import { loginValidation, registerValidation } from "./auth.validation";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import * as bcrypt from "bcrypt";

const authUseCase = {
    login: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, loginValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (!user) {
            res.status(401).json(msgTemplate("Username atau password salah"));
            return;
        }

        bcrypt.compare(data.password, user.password, (err, result) => {
            if (err) {
                res.status(500).json(
                    msgTemplate("Terjadi kesalahan", { error: err }),
                );
                return;
            }

            if (!result) {
                res.status(401).json(
                    msgTemplate("Username atau password salah"),
                );
                return;
            }

            if (process.env.JWT_SECRET) {
                const accessToken = jwt.sign(user, process.env.JWT_SECRET);
                res.json(
                    msgTemplate("Login berhasil", {
                        ...user,
                        accessToken: accessToken,
                    }),
                );
                return;
            }
        });
    },

    register: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, registerValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        bcrypt.hash(data.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json(
                    msgTemplate("Terjadi kesalahan", { error: err }),
                );
                return;
            }
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: hash,
                },
            });

            if (process.env.JWT_SECRET) {
                const accessToken = jwt.sign(user, process.env.JWT_SECRET);
                res.json(
                    msgTemplate("Registrasi berhasil", {
                        ...user,
                        accessToken: accessToken,
                    }),
                );
            } else {
                res.status(500).json(
                    msgTemplate("JSON token tidak terdeteksi."),
                );
            }
        });
    },

    check: async (req: RequestWithUser, res: Response) => {
        res.json({
            msg: "middleware success",
            user: req.user,
        });
        return;
    },
};

export default authUseCase;
