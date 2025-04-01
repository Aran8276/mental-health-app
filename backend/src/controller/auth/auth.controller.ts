import { RequestWithUser } from "@/middleware/authMiddleware.type";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { make } from "simple-body-validator";
import {
    loginValidation,
    registerValidation,
    resetPasswordValidation,
    validateResetPasswordVerification,
    verificationValidation,
} from "./auth.validation";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { transporter } from "@/config/nodemailerClient";
import * as env from "dotenv";
import { Prisma } from "@prisma/client";
import { getEmail } from "@/config/emailTemplate";

env.config();

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

        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
            include: {
                verification_tokens: true,
            },
        });

        if (!user) {
            res.status(401).json(msgTemplate("Username atau password salah"));
            return;
        }

        if (!user.email_verified_at) {
            const emailTemplate = {
                header: " Langkah Terakhir: Verifikasi Email Anda!",
                body: `
                    Hai ${user.name},
                    Senang Anda bergabung dengan Mental Health App!<br/>
                    Untuk mengaktifkan akun Anda dan memulai perjalanan menuju ketenangan, mohon verifikasi alamat email<br/>
                    Anda dengan menekan tombol di bawah ini.
                `,
                buttonHref: `/email-verify?token=${user.verification_tokens[0].token}`,
                buttonText: "Verifikasi",
            };

            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL_FROM,
                to: user.email,
                subject: "Verifikasi Email - Mental Health App",
                html: getEmail(emailTemplate),
            });

            res.status(401).json(
                msgTemplate(
                    "Email anda belum diverifikasi. Verifikasi email sudah dikirim ulang 👍",
                ),
            );
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
            } else {
                res.status(500).json(msgTemplate("JWT Secret belum dibuat."));
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

            try {
                const user = await prisma.user.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        username: data.username,
                        password: hash,
                    },
                    omit: {
                        password: true,
                    },
                });

                const verifyToken = nanoid(64);

                await prisma.verificationToken.create({
                    data: {
                        user_id: user.id,
                        token: verifyToken,
                    },
                });

                const emailTemplate = {
                    header: " Langkah Terakhir: Verifikasi Email Anda!",
                    body: `
                        Hai ${user.name},
                        Senang Anda bergabung dengan Mental Health App!<br/>
                        Untuk mengaktifkan akun Anda dan memulai perjalanan menuju ketenangan, mohon verifikasi alamat email<br/>
                        Anda dengan menekan tombol di bawah ini.
                    `,
                    buttonHref: `/email-verify?token=${verifyToken}`,
                    buttonText: "Verifikasi",
                };

                await transporter.sendMail({
                    from: process.env.NODEMAILER_EMAIL_FROM,
                    to: data.email,
                    subject: "Verifikasi Email - Mental Health App",
                    html: getEmail(emailTemplate),
                });

                res.json(
                    msgTemplate(
                        "Registrasi berhasil. Silakan verifikasi email dan login",
                        user,
                    ),
                );
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code == "P2002") {
                        res.status(409).json(
                            msgTemplate("Email atau username sudah diambil."),
                        );

                        return;
                    }

                    res.status(400).json(
                        msgTemplate("Terjadi kesalahan", error),
                    );
                }
            }
        });
    },

    check: async (req: RequestWithUser, res: Response) => {
        res.json({
            msg: "Data berhasil diambil!",
            user: req.user,
        });
        return;
    },

    verify: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, verificationValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const user = (
            await prisma.verificationToken.findUnique({
                where: {
                    token: data.token,
                },
                include: {
                    user: {
                        omit: {
                            password: true,
                            email_verified_at: true,
                        },
                    },
                },
            })
        )?.user;

        if (!user) {
            res.status(400).json(msgTemplate("Token tidak valid."));
            return;
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                email_verified_at: new Date(),
            },
            omit: {
                password: true,
            },
        });

        await prisma.verificationToken.delete({
            where: {
                token: data.token,
            },
        });

        res.json(msgTemplate("Email berhasil diverifikasi", user));
    },

    verifyResetPasswordToken: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, validateResetPasswordVerification);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const user = (
            await prisma.resetPasswordToken.findUnique({
                where: {
                    token: data.token,
                },
                include: {
                    user: true,
                },
            })
        )?.user;

        if (!user) {
            res.status(400).json(msgTemplate("Token tidak valid."));
            return;
        }

        if (process.env.JWT_SECRET) {
            await prisma.resetPasswordToken.delete({
                where: {
                    token: data.token,
                },
            });
            const accessToken = jwt.sign(user, process.env.JWT_SECRET);
            res.json(
                msgTemplate("Login berhasil", {
                    ...user,
                    accessToken: accessToken,
                }),
            );
        } else {
            res.status(500).json(msgTemplate("JWT Secret belum dibuat."));
        }
    },

    resetPassword: async (req: Request, res: Response) => {
        const data = req.body;
        const validator = make(data, resetPasswordValidation);

        if (!validator.validate()) {
            res.status(422).json(
                msgTemplate(
                    "Semua input harus diisi",
                    validator.errors().all(),
                ),
            );
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
            omit: {
                email_verified_at: true,
                password: true,
            },
        });

        if (!user) {
            // biarkan saja walaupun email salah agar tdk menjadi celah
            // utk pengecekan email valid atau tidak
            res.json(msgTemplate("Email reset password berhasil dikirim."));
            return;
        }

        const resetPwToken = nanoid(64);

        await prisma.resetPasswordToken.create({
            data: {
                user_id: user.id,
                token: resetPwToken,
            },
        });

        const emailTemplate = {
            header: "Atur Ulang Kata Sandi Anda",
            body: `
                Hai ${user.name},<br/><br/>
                Kami menerima permintaan untuk mengatur ulang kata sandi akun Mental Health App Anda.<br/>
                Klik tombol di bawah ini untuk membuat kata sandi baru.<br/><br/>
                Tautan ini hanya berlaku selama <strong>1 jam</strong>. Jika Anda tidak meminta perubahan ini, Anda bisa mengabaikan email ini dengan aman.
            `,
            buttonText: "Atur Ulang Kata Sandi",
            buttonHref: `/forgot-password?token=${resetPwToken}`,
        };

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL_FROM,
            to: data.email,
            subject: "Atur Ulang Kata Sandi Anda - Mental Health App",
            html: getEmail(emailTemplate),
        });

        res.json(msgTemplate("Email reset password berhasil dikirim."));
    },
};

export default authUseCase;
