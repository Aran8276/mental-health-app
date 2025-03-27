import postUseCase from "@/controller/posts/posts.controller";
import { router } from "@/config/routerClient";

const { createPost, readPosts, readPostById, updatePost, deletePost } =
    postUseCase;

router.post("/", createPost);
router.get("/", readPosts);
router.get("/:id", readPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
