import User from '../models/User.js';
import Product from '../models/Product.js';

/**
 * @desc   Add item to user's cart
 * @route  POST /api/user/cart
 * @access Private (user only)
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) return res.status(400).json({ msg: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const exists = user.cart.find(item => item.productId.toString() === productId);

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
};

const clearAllCartAfterPurchase = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Cart cleared successfully', cart: user.cart });
  } catch (error) {
    console.error('🛑 Failed to clear cart:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};


/**
 * @desc   Get user's cart with populated product info
 * @route  GET /api/user/cart
 * @access Private
 */
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ cart: user.cart });
  } catch (err) {
    console.error("❌ Get cart error:", err.message);
    res.status(500).json({ msg: 'Get cart failed' });
  }
};

/**
 * @desc   Remove product from cart
 * @route  DELETE /api/user/cart/:productId
 * @access Private
 */
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();
    res.json({ msg: '✅ Item removed from cart', cart: user.cart });
  } catch (err) {
    console.error("❌ Remove from cart error:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc   Add product to wishlist
 * @route  POST /api/user/wishlist
 * @access Private
 */
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const alreadyExists = user.wishlist.some(item => item.productId.toString() === productId);

    if (!alreadyExists) {
      user.wishlist.push({ productId });
      await user.save();
    }

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ Add to wishlist error:", err.message);
    res.status(500).json({ msg: 'Add to wishlist failed' });
  }
};

/**
 * @desc   Get user's wishlist with populated product data
 * @route  GET /api/user/wishlist
 * @access Private
 */
const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist.productId');
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ Get wishlist error:", err.message);
    res.status(500).json({ msg: 'Get wishlist failed' });
  }
};

/**
 * @desc   Remove product from wishlist
 * @route  DELETE /api/user/wishlist/:productId
 * @access Private
 */
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.json({ msg: "✅ Item removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    console.error("❌ Remove from wishlist error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};



/**
 * @desc   Get user profile including address
 * @route  GET /api/user/profile
 * @access Private
 */
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.address = req.body.address;
    await user.save();

    res.json({ msg: 'Address updated successfully', address: user.address });
  } catch (err) {
    console.error('❌ Update address error:', err.message);
    res.status(500).json({ msg: 'Failed to update address' });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      address: user.address || null,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('❌ Get profile error:', error.message);
    res.status(500).json({ msg: 'Failed to fetch profile' });
  }
};

// ✅ Export all functions
export {
  addToCart,
  getCart,
  removeFromCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getUserProfile,
  clearAllCartAfterPurchase,
  updateAddress  // ✅ Corrected name
};
