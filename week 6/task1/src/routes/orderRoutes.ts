import express from "express";
import { protect, restrictTo } from "../middleware";
import { cancelOrder, createOrder, getOrders, getSellerOrders, updateOrderStatus } from "../controller/orderController";

const router = express.Router();

router.use(protect);

router.post("/", restrictTo("buyer"), createOrder);
router.get("/", restrictTo("buyer"), getOrders);

router.get("/seller", restrictTo("seller"), getSellerOrders);
router.put("/status", restrictTo("seller"), updateOrderStatus);

router.delete("/:orderId", restrictTo("buyer", "seller"), cancelOrder);

export default router;
