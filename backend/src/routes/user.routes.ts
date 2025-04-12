import userUseCase from "@/controller/user/user.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const {
    updatePersonalInfo,
    updateAddressInfo,
    readUserById,
    readCurrentUser,
    readUser,
} = userUseCase;

router.get("/", authenticateToken, readCurrentUser);
router.post("/personal-info", authenticateToken, updatePersonalInfo);
router.post("/address-info", authenticateToken, updateAddressInfo);

router.get("/all-users", readUser);
router.get("/:id", readUserById);

export default router;
