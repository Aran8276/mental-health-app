import { RequestWithUser } from "@/middleware/authMiddleware.type";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { make } from "simple-body-validator";
import {
    loginValidation,
    registerValidation,
    verificationValidation,
} from "./auth.validation";
import { msgTemplate } from "@/config/msgTemplate";
import { prisma } from "@/config/prismaClient";
import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { transporter } from "@/config/nodemailerClient";
import * as env from "dotenv";
import { Prisma } from "@prisma/client";

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

        const user = await prisma.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (!user) {
            res.status(401).json(msgTemplate("Username atau password salah"));
            return;
        }

        if (!user.email_verified_at) {
            res.status(401).json(msgTemplate("Email anda belum diverifikasi."));
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

                const htmlBody = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto;">
                    <tr>
                        <td align="center" style="padding: 40px 20px;">
                            <table style="width: 100%; background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <tr>
                                    <td align="center" style="padding: 30px;">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 64px; height: 64px; stroke: #2196f3; stroke-width: 2;">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2zm1-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                        </svg>
                                        <h1 style="color: #1a237e; font-size: 24px; margin: 20px 0;">Verifikasi Email Anda</h1>
                                        <p style="color: #546e7a; font-size: 16px; line-height: 1.5;">Terima kasih telah mendaftar dengan Mental Health App! Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda dan menyelesaikan pendaftaran Anda.</p>
                                        <a href="${process.env.FRONTEND_BASE_URL}/email-verify?token=${verifyToken}" style="display: inline-block; margin: 25px 0; padding: 12px 30px; background-color: #2196f3; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">Verifikasi Email</a>
                                        <p style="color: #546e7a; font-size: 14px;">Jika Anda tidak membuat akun dengan Mental Health App, harap abaikan email ini.</p>
                                    </td>
                                </tr>
                            </table>
                            <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">
                                &copy; 2025 Mental Health App. Seluruh hak cipta dilindungi.<br>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>     
            `;

                await transporter.sendMail({
                    from: "aran8276@gmail.com",
                    to: data.email,
                    subject: "Verifikasi Email - Mental Health App",
                    html: htmlBody,
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
            msg: "middleware success",
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
            await prisma.verificationToken.findFirst({
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
};

export default authUseCase;
