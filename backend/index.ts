import { server } from "./src/config/expressClient";
import threadRouter from "@/routes/thread.routes";
import geminiAiRouter from "@/routes/gemini-ai.routes";
import userRouter from "@/routes/user.routes";
import threadCommentRouter from "@/routes/thread-comment.routes";
import aiConversationRouter from "@/routes/ai-conversation.routes";
import threadCommentReplyRouter from "@/routes/thread-comment-reply.routes";
import aiChatRouter from "@/routes/ai-chat.routes";
import authRouter from "@/routes/auth.routes";
import cors from "cors";
import * as env from "dotenv";

// config
env.config();

const corsOptions = {
    origin:
        process.env.APP_STATE === "production"
            ? process.env.FRONTEND_BASE_URL
            : "*",
};

server.use(cors(corsOptions));

// route definitions
server.use("/user", userRouter);
server.use("/gemini-ai", geminiAiRouter);
server.use("/thread", threadRouter);
server.use("/thread-comment", threadCommentRouter);
server.use("/thread-comment-reply", threadCommentReplyRouter);
server.use("/ai-conversation", aiConversationRouter);
server.use("/ai-chat", aiChatRouter);
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

// start
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server siap di port ${process.env.SERVER_PORT}!`);
});

export default server;
