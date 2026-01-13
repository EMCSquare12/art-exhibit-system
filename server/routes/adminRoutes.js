import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getDashboardStats } from '../controllers/adminController.js';

router.use(protect);
router.get('/dashboard', getDashboardStats);

export default router;