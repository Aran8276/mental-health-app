import { server } from "./src/config/expressClient";
import threadRouter from "@/routes/thread.routes";
import threadCommentRouter from "@/routes/thread-comment.routes";
import threadCommentReplyRouter from "@/routes/thread-comment-reply.routes";
import authRouter from "@/routes/auth.routes";
import cors from "cors";
import * as env from "dotenv";
import { transporter } from "@/config/nodemailerClient";

env.config();

server.get("/email-test", async (req, res) => {
    const info = await transporter.sendMail({
        from: "aran8276@gmail.com", // sender address
        to: "aran8276@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    res.json({ msg: "Message sent: %s", payload: info.messageId });
});
server.use(cors());
server.use("/thread", threadRouter);
server.use("/thread-comment", threadCommentRouter);
server.use("/thread-comment-reply", threadCommentReplyRouter);
server.use("/auth", authRouter);

server.get("/", async (req, res) => {
    res.status(200).json({
        msg: "API sehat",
        toyota: "🚗 👍",
    });
});

server.use((req, res) => {
    res.status(404).status(404).json({
        msg: "Route tidak ditemukan",
        route: req.url,
    });
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server siap di port ${process.env.SERVER_PORT}!`);
});
