import express from 'express';
import { placeOrder, getOrderHistory } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, placeOrder);
router.get('/', authMiddleware, getOrderHistory);

export default router;