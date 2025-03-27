import { server } from "./src/config/expressClient";
import postsRouter from "@/routes/posts.routes";

server.use("/post", postsRouter);

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
