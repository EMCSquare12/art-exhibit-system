import express from 'express';
import { createOrder, getMyOrders,validateTicket } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/validate/:bookingId', validateTicket);

export default router;