import express from 'express';
import { createOrder, getMyOrders,validateTicket } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/validate/:bookingId', validateTicket);

export default router;