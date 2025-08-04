import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  getUserProfile, // 👈 Import controller function
  addToCart,
  getCart,
  clearAllCartAfterPurchase,
  removeFromCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  updateAddress
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', auth(), getUserProfile); // ✅ ADD THIS LINE

// your existing routes...
router.post('/cart', auth(), addToCart);
router.get('/cart', auth(), getCart);
router.delete('/cart/:productId', auth(), removeFromCart);
router.delete('/cart',auth(),clearAllCartAfterPurchase)
router.post('/wishlist', auth(), addToWishlist);
router.get('/wishlist', auth(), getWishlist);
router.delete('/wishlist/:productId', auth(), removeFromWishlist);
router.put('/address', auth(), updateAddress);



export default router;
