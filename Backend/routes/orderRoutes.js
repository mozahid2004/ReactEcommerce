import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Order from '../models/order.js';
import {
  cancelOrder,
  getUserOrders
} from '../controllers/orderController.js'


const router = express.Router();

/**
 * @route   POST /api/order
 * @desc    Place an order (for both single product or multiple from cart)
 * @access  Private (requires authentication)
 */
// ✅ Place Order Route — fixed version
router.post('/', auth(), async (req, res) => {
  try {
    const {
      productId,      // ID for single product order
      quantity,       // Quantity for single product
      cartItems,      // Array of cart items for cart-based order
      totalPrice,     // Total price of the order
      paymentMethod,  // COD / Razorpay / UPI etc.
      isPaid,         // Boolean flag (true for prepaid like Razorpay)
      address,        // Shipping address object
      paymentResult,  // Optional payment result (for prepaid)
    } = req.body;

    // ✅ Validate essential fields
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    // ✅ Prepare orderItems (either from cartItems or single product)
    const orderItems =
      cartItems && cartItems.length
        ? cartItems.map((item) => ({
            product: item.productId,
            quantity: item.quantity,
            image: item.image,
          }))
        : productId
        ? [
            {
              product: productId,
              quantity: quantity || 1,
              image: null, // ✅ Avoid using undefined "item"
            },
          ]
        : [];

    // ✅ Ensure orderItems is not empty
    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // ✅ Create and save the order
    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      paymentMethod,
      isPaid,
      address,
      paymentResult,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order placed', order: savedOrder });

  } catch (err) {
    console.log('❌ Order Creation Error:', err);
    res.status(500).json({ message: 'Server error while placing order' });
  }
});


router.put('/:id/cancel', auth(), cancelOrder);

router.get('/user', auth(), getUserOrders);


export default router;
