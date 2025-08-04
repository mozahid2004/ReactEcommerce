import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import auth from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();

// 🔐 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay Order
router.post('/create-order', auth(), async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount, // in paise
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order); // Send { id, amount, currency } to frontend
  } catch (err) {
    console.error('❌ Razorpay Order Error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

export default router;
