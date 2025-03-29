import { server } from "./src/config/expressClient";
import threadRouter from "@/routes/thread.routes";
import userRouter from "@/routes/user.routes";
import threadCommentRouter from "@/routes/thread-comment.routes";
import threadCommentReplyRouter from "@/routes/thread-comment-reply.routes";
import authRouter from "@/routes/auth.routes";
import cors from "cors";
import * as env from "dotenv";

env.config();

server.use(cors());
server.use("/user", userRouter);
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
