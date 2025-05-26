import express from 'express';
import { addToCart, viewCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, viewCart);
router.delete('/:id', authMiddleware, removeFromCart);

export default router;