import express from 'express';
import { createProduct, getAllProducts, deleteProduct, getProduct, editProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/create', verifyToken, upload, createProduct);
router.get('/get', verifyToken, getAllProducts);
router.delete('/delete/:id', verifyToken, deleteProduct);
router.get('/getProduct/:productId', getProduct);
router.put('/edit/:productId',verifyToken, upload, editProduct);

export default router;