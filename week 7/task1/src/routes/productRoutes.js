import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createProduct);
router.get('/', getAllProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;