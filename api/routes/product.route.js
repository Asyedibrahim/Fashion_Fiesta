import express from 'express';
import { createProduct, getProducts, deleteProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/create', verifyToken, upload, createProduct);
router.get('/get', verifyToken, getProducts);
router.delete('/delete/:id', verifyToken, deleteProduct);

export default router;