import express from "express";
import { protect, restrictTo } from "../middleware";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/productController";

const router = express.Router();

router.get("/", getProducts);
router.use(protect, restrictTo("seller"));
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
