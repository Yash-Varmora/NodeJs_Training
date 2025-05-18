import express from "express";
import { protect, restrictTo } from "../middleware";
import { addToCart, getCart, updateCart } from "../controller/cartController";

const router = express.Router();

router.use(protect, restrictTo("buyer"));
router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateCart);

export default router;
