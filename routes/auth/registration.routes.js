import express from "express";
import { registrationController } from "../../controller/auth/registration.controller";
const router=express.Router()
// Registration Controller
router.post("/registration",registrationController)
export default router