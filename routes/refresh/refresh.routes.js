import express from "express";
import { refreshController } from "../../controller/refresh/refresh.controller";
const router = express.Router()

router.post("/refresh",refreshController)

export default router
