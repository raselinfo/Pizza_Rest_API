import express from "express"
import { logoutController } from "../../controller/auth/logout.controller"
import { authMiddleware } from "../../middleware/auth/auth.middleware"
const router = express.Router()
router.post("/logout",authMiddleware, logoutController)
export default router