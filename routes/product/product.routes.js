import express from "express";
import { addProductController } from "../../controller/product/addProduct.controller";
import { getAllProducts } from "../../controller/product/getAllProducts.controller";
import { getSingleProduct } from "../../controller/product/getSingleProduct.controller";
import { updateProductController } from "../../controller/product/updateProduct.controller";
const router = express()
import { authMiddleware } from "../../middleware/auth/auth.middleware"
import { isAdminMiddleware } from "../../middleware/auth/isAdminMiddleware";
import { isUserMiddleware } from "../../middleware/auth/isUser";

// Todo: Get ALL Products
router.get("/product", authMiddleware, isUserMiddleware, getAllProducts)
// Todo: Get ALL Products
router.get("/product/:id", authMiddleware, isUserMiddleware, getSingleProduct)
// Todo: Add Product
router.post("/product", [authMiddleware, isAdminMiddleware], addProductController)
// Todo: Update Product
router.patch("/product/:id", [authMiddleware, isAdminMiddleware], updateProductController)


export default router