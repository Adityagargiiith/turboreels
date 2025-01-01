import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  updateSubscription,
  getSubscriptionStatus 
} from '../controllers/subscription.controller.js';

const router = express.Router();

router.post('/update-subscription/:userId', verifyToken, updateSubscription);
router.get('/subscription-status/:userId', verifyToken, getSubscriptionStatus);

export default router;