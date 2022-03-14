import express from "express";
import { userController } from "../../controller/user/user.controller";
import { authMiddleware } from "../../middleware/auth/auth.middleware";
const router = express.Router()
router.get("/user", authMiddleware, userController)
export default router