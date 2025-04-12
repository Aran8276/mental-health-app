var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { make } from "simple-body-validator";
import { loginValidation, registerValidation, resetPasswordValidation, validateResetPasswordVerification, verificationValidation, refreshTokenValidation, } from "./auth.validation.js";
import { msgTemplate } from "../../config/msgTemplate.js";
import { prisma } from "../../config/prismaClient.js";
import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { transporter } from "../../config/nodemailerClient.js";
import { Prisma } from "@prisma/client";
import { getEmail } from "../../config/emailTemplate.js";
import { generateAccessToken, generateRefreshToken, storeRefreshToken, verifyRefreshToken, validateStoredRefreshToken, removeRefreshToken, } from "../../services/tokenService.js";
import * as jwt from "jsonwebtoken";
const authUseCase = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const validator = make(data, loginValidation);
        if (!validator.validate()) {
            res.status(422).json(msgTemplate("Input tidak valid.", validator.errors().all()));
            return;
        }
        try {
            const user = yield prisma.user.findUnique({
                where: { username: data.username },
                include: { verification_tokens: true },
            });
            if (!user) {
                res.status(401).json(msgTemplate("Username atau password salah"));
                return;
            }
            if (!user.email_verified_at) {
                const verificationToken = user.verification_tokens.length > 0
                    ? user.verification_tokens[0].token
                    : nanoid(64);
                if (user.verification_tokens.length === 0) {
                    yield prisma.verificationToken.create({
                        data: { user_id: user.id, token: verificationToken },
                    });
                }
                const emailTemplate = {
                    header: " Langkah Terakhir: Verifikasi Email Anda!",
                    body: `Hai ${user.name},... (rest of your template)`,
                    buttonHref: `/email-verify?token=${verificationToken}`,
                    buttonText: "Verifikasi",
                };
                yield transporter.sendMail({
                    from: process.env.NODEMAILER_EMAIL_FROM,
                    to: user.email,
                    subject: "Verifikasi Email - Mental Health App",
                    html: getEmail(emailTemplate),
                });
                res.status(401).json(msgTemplate("Email anda belum diverifikasi. Verifikasi email sudah dikirim ulang 👍"));
                return;
            }
            const isPasswordValid = yield bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                res.status(401).json(msgTemplate("Username atau password salah"));
                return;
            }
            const tokenPayload = { id: user.id };
            const accessToken = generateAccessToken(tokenPayload);
            const refreshToken = generateRefreshToken(tokenPayload);
            const stored = yield storeRefreshToken(user.id, refreshToken);
            if (!stored) {
                console.error(`Gagal menyimpan token untuk id user ${user.id}`);
                res.status(500).json(msgTemplate("Terjadi kesalahan internal saat login."));
                return;
            }
            res.json(msgTemplate("Login berhasil", {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                },
            }));
        }
        catch (error) {
            console.error("Login Error:", error);
            res.status(500).json(msgTemplate("Terjadi kesalahan pada server saat login."));
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const validator = make(data, registerValidation);
        if (!validator.validate()) {
            res.status(422).json(msgTemplate("Input tidak valid.", validator.errors().all()));
            return;
        }
        try {
            const hashedPassword = yield bcrypt.hash(data.password, 10);
            const user = yield prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    created_at: true,
                    email_verified_at: true,
                },
            });
            const verifyToken = nanoid(64);
            yield prisma.verificationToken.create({
                data: {
                    user_id: user.id,
                    token: verifyToken,
                },
            });
            const emailTemplate = {
                header: " Langkah Terakhir: Verifikasi Email Anda!",
                body: `Hai ${user.name},... (rest of your template)`,
                buttonHref: `/email-verify?token=${verifyToken}`,
                buttonText: "Verifikasi",
            };
            yield transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL_FROM,
                to: data.email,
                subject: "Verifikasi Email - Mental Health App",
                html: getEmail(emailTemplate),
            });
            res.status(201).json(msgTemplate("Registrasi berhasil. Silakan verifikasi email Anda.", user));
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                let field = "Email atau username";
                if (error.meta &&
                    Array.isArray(error.meta.target) &&
                    error.meta.target.length > 0) {
                    field = error.meta.target.join(", ");
                }
                res.status(409).json(msgTemplate(`${field} sudah terdaftar.`));
            }
            else {
                console.error("Registration Error:", error);
                res.status(500).json(msgTemplate("Terjadi kesalahan pada server saat registrasi."));
            }
        }
    }),
    refresh: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.body;
        const validator = make(req.body, refreshTokenValidation);
        if (!validator.validate()) {
            res.status(400).json(msgTemplate("Refresh token diperlukan.", validator.errors().all()));
            return;
        }
        if (!refreshToken) {
            res.status(400).json(msgTemplate("Refresh token diperlukan."));
            return;
        }
        try {
            const payload = verifyRefreshToken(refreshToken);
            if (!payload) {
                res.status(403).json(msgTemplate("Refresh token tidak valid atau kedaluwarsa."));
                return;
            }
            const isValidInDb = yield validateStoredRefreshToken(payload.id, refreshToken);
            if (!isValidInDb) {
                console.warn(`Validasi gagal untuk hash database user: ${payload.id}. Melakukan logout.`);
                yield removeRefreshToken(payload.id);
                res.status(403).json(msgTemplate("Sesi tidak valid atau Anda sudah logout. Silakan login kembali."));
                return;
            }
            const newAccessToken = generateAccessToken({ id: payload.id });
            res.json(msgTemplate("Token akses berhasil diperbarui", {
                accessToken: newAccessToken,
            }));
        }
        catch (error) {
            console.error("Refresh Token Error:", error);
            if (error instanceof jwt.TokenExpiredError) {
                res.status(403).json(msgTemplate("Refresh token kedaluwarsa."));
            }
            else if (error instanceof jwt.JsonWebTokenError) {
                res.status(403).json(msgTemplate("Refresh token tidak valid."));
            }
            else {
                res.status(500).json(msgTemplate("Terjadi kesalahan pada server saat memperbarui token."));
            }
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(400).json(msgTemplate("Tidak dapat logout. Pengguna tidak terautentikasi."));
            return;
        }
        try {
            const removed = yield removeRefreshToken(userId);
            if (!removed) {
                console.error(`Gagal menghapus token refresh dari database untuk id user: ${userId}`);
            }
            res.status(200).json(msgTemplate("Logout berhasil."));
        }
        catch (error) {
            console.error("Logout Error:", error);
            res.status(500).json(msgTemplate("Terjadi kesalahan pada server saat logout."));
        }
    }),
    check: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json(msgTemplate("Pengguna tidak terautentikasi."));
            return;
        }
        try {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    email_verified_at: true,
                    created_at: true,
                },
            });
            if (!user) {
                res.status(404).json(msgTemplate("Pengguna tidak ditemukan."));
                return;
            }
            res.json(msgTemplate("Data pengguna berhasil diambil.", user));
        }
        catch (error) {
            console.error("Check User Error:", error);
            res.status(500).json(msgTemplate("Gagal mengambil data pengguna."));
        }
    }),
    verify: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const validator = make(data, verificationValidation);
        if (!validator.validate()) {
            res.status(422).json(msgTemplate("Input tidak valid.", validator.errors().all()));
            return;
        }
        try {
            const verificationRecord = yield prisma.verificationToken.findUnique({
                where: { token: data.token },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
            if (!verificationRecord || !verificationRecord.user) {
                res.status(400).json(msgTemplate("Token verifikasi tidak valid atau sudah kedaluwarsa."));
                return;
            }
            const user = verificationRecord.user;
            const [updatedUser] = yield prisma.$transaction([
                prisma.user.update({
                    where: { id: user.id },
                    data: { email_verified_at: new Date() },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        email_verified_at: true,
                    },
                }),
                prisma.verificationToken.delete({
                    where: { token: data.token },
                }),
            ]);
            res.json(msgTemplate("Email berhasil diverifikasi", updatedUser));
        }
        catch (error) {
            console.error("Email Verification Error:", error);
            res.status(500).json(msgTemplate("Terjadi kesalahan saat verifikasi email."));
        }
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const validator = make(data, resetPasswordValidation);
        if (!validator.validate()) {
            res.status(422).json(msgTemplate("Input tidak valid", validator.errors().all()));
            return;
        }
        try {
            const user = yield prisma.user.findUnique({
                where: { email: data.email },
                select: { id: true, name: true },
            });
            if (!user) {
                console.log(`Password reset requested for non-existent email: ${data.email}`);
                res.json(msgTemplate("Jika email terdaftar, instruksi reset password akan dikirim."));
                return;
            }
            yield prisma.resetPasswordToken.deleteMany({
                where: { user_id: user.id },
            });
            const resetPwToken = nanoid(64);
            yield prisma.resetPasswordToken.create({
                data: {
                    user_id: user.id,
                    token: resetPwToken,
                },
            });
            const emailTemplate = {
                header: "Atur Ulang Kata Sandi Anda",
                body: `Hai ${user.name},... (rest of your template)`,
                buttonText: "Atur Ulang Kata Sandi",
                buttonHref: `/forgot-password?token=${resetPwToken}`,
            };
            yield transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL_FROM,
                to: data.email,
                subject: "Atur Ulang Kata Sandi Anda - Mental Health App",
                html: getEmail(emailTemplate),
            });
            res.json(msgTemplate("Jika email terdaftar, instruksi reset password akan dikirim."));
        }
        catch (error) {
            console.error("Reset Password Error:", error);
            res.json(msgTemplate("Jika email terdaftar, instruksi reset password akan dikirim."));
        }
    }),
    verifyResetPasswordToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body;
        const validator = make(data, validateResetPasswordVerification);
        if (!validator.validate()) {
            res.status(422).json(msgTemplate("Input tidak valid", validator.errors().all()));
            return;
        }
        try {
            const resetRecord = yield prisma.resetPasswordToken.findUnique({
                where: { token: data.token },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            });
            if (!resetRecord || !resetRecord.user) {
                res.status(400).json(msgTemplate("Token reset password tidak valid atau sudah kedaluwarsa."));
                return;
            }
            const user = resetRecord.user;
            yield prisma.resetPasswordToken.delete({
                where: { token: data.token },
            });
            const tokenPayload = { id: user.id };
            const accessToken = generateAccessToken(tokenPayload);
            const refreshToken = generateRefreshToken(tokenPayload);
            const stored = yield storeRefreshToken(user.id, refreshToken);
            if (!stored) {
                console.error(`Failed to store refresh token for user ${user.id} after password reset`);
                res.status(500).json(msgTemplate("Token reset valid, tapi gagal memulai sesi baru. Silakan coba login manual."));
                return;
            }
            res.json(msgTemplate("Token reset password valid. Login berhasil.", {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user,
            }));
        }
        catch (error) {
            console.error("Verify Reset Password Token Error:", error);
            res.status(500).json(msgTemplate("Terjadi kesalahan saat memverifikasi token reset password."));
        }
    }),
};
export default authUseCase;
