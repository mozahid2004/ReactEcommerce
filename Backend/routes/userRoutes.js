import express from 'express';
import auth from '../middleware/authMiddleware.js'; // ✅ REQUIRED
import {
  addToCart,
  getCart,
  removeFromCart,
  addToWishlist,
  getWishlist,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/cart', auth(), addToCart);
router.get('/cart', auth(), getCart);
router.delete('/cart/:productId', auth(), removeFromCart);

router.post('/wishlist', auth(), addToWishlist);
router.get('/wishlist', auth(), getWishlist);

export default router;
