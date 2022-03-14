import express from "express";
import { userController } from "../../controller/user/user.controller";
const router = express.Router()
router.get("/me", userController)
export default router