import express from 'express';
import { createOrder, getUserOrders,validateTicket } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/validate/:bookingId', validateTicket);

export default router;