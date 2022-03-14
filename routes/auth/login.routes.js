import express from "express"
import { loginController } from "../../controller/auth/login.controller"
const router = express.Router()
router.post("/login", loginController)
export default router