import express from 'express';
import { createCategory, getCategories, deleteCategory, editCategory } from '../controllers/category.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createCategory',verifyToken, createCategory);
router.get('/getCategories',verifyToken, getCategories );
router.delete('/deleteCategory/:id',verifyToken, deleteCategory );
router.post('/editCategory/:id',verifyToken, editCategory );

export default router;