import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createSize, getSizes, deleteSize, editSize } from '../controllers/size.controller.js';

const router = express.Router();

router.post('/createSize', verifyToken, createSize);
router.get('/getSizes', verifyToken, getSizes);
router.delete('/deleteSize/:id', verifyToken, deleteSize);
router.post('/editSize/:id', verifyToken, editSize);

export default router;