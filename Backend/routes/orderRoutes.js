import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Order from '../models/order.js'; // ✅ Corrected capital O

const router = express.Router();

// ✅ Create Order
router.post('/', auth('user'), async (req, res) => {
  try {
    const { productId, quantity, paymentMethod, totalPrice } = req.body;

    if (!productId || !paymentMethod) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    const newOrder = new Order({
      userId: req.user._id,
      productId,
      quantity: quantity || 1,
      totalPrice,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ msg: '✅ Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('❌ Order error:', err);
    res.status(500).json({ msg: '❌ Failed to place order' });
  }
});

export default router;
