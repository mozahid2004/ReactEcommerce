import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Product from '../models/Product.js';  // ✅ Needed for validation

const router = express.Router();

// ✅ POST - Add to Cart (expects { productId, quantity })
router.post('/cart', auth(), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ msg: "Product ID is required" });
    }

    // ✅ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // ✅ Get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ Check if product already in cart
    const exists = user.cart.find(item =>
      item.productId.toString() === productId
    );

    if (exists) {
      exists.quantity += quantity || 1;
    } else {
      user.cart.push({ productId, quantity: quantity || 1 });
    }

    await user.save();

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    console.error("❌ Cart POST error:", err.message);
    res.status(500).json({ msg: "Failed to add to cart" });
  }
});

// ✅ GET - Fetch Cart
router.get('/cart', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    res.json({ cart: user.cart });
  } catch (err) {
    console.error("❌ Cart GET error:", err.message);
    res.status(500).json({ msg: 'Get cart failed' });
  }
});

// routes/user.js or userCart.js

// DELETE /api/user/cart/:productId
router.delete('/cart/:productId', auth('user'), async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.userId);

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.json({ msg: '✅ Item removed from cart', cart: user.cart });
  } catch (err) {
    console.error('❌ Remove from cart error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});



// ✅ POST - Add to Wishlist
router.post('/wishlist', auth(), async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const alreadyExists = user.wishlist.some(
      (item) => item.productId.toString() === productId
    );

    if (!alreadyExists) {
      user.wishlist.push({ productId });
      await user.save();
    }

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ msg: 'Add to wishlist failed' });
  }
});

// ✅ GET - Fetch Wishlist
router.get('/wishlist', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist.productId');
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ msg: 'Get wishlist failed' });
  }
});

export default router;
