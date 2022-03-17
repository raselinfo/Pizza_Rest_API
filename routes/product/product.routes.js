import express from "express";
import { addProductController } from "../../controller/product/addProduct.controller";
const router=express()
import {authMiddleware} from "../../middleware/auth/auth.middleware"
import { isAdminMiddleware } from "../../middleware/auth/isAdminMiddleware";

// Todo: Add Product
router.post("/product", [authMiddleware,isAdminMiddleware], addProductController)

export default router