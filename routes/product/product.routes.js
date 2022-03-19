import express from "express";
import { addProductController } from "../../controller/product/addProduct.controller";
import { updateProductController } from "../../controller/product/updateProduct.controller";
const router = express()
import { authMiddleware } from "../../middleware/auth/auth.middleware"
import { isAdminMiddleware } from "../../middleware/auth/isAdminMiddleware";

// Todo: Add Product
router.post("/product", [authMiddleware, isAdminMiddleware], addProductController)
// Todo: Update Product
router.patch("/product/:id", [authMiddleware, isAdminMiddleware], updateProductController)

export default router