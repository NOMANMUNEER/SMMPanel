import express from 'express';
import { 
  getUsers, 
  getAllOrders, 
  getAllPayments, 
  updatePaymentStatus,
  updateUserStatus,
  addService,
  updateOrderStatus
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);

router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/payments', getAllPayments);
router.put('/payments/:id/status', updatePaymentStatus);

router.post('/services', addService);

export default router;
