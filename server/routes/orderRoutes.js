import express from 'express';
import { createOrder, getUserOrders, getServices, addFunds } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/services', getServices);
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.post('/funds', protect, addFunds);

export default router;
