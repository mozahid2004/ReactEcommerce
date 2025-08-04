// 📁 controllers/orderController.js

import Order from '../models/order.js';

// ✅ Place Order Controller
export const placeOrder = async (req, res) => {
  try {
    // ✅ Destructure data from request body
    const {
      productId,         // 🔹 For single product order
      quantity,          // 🔹 Quantity for single product
      cartItems,         // 🔹 For multi-product (cart) order
      totalPrice,        // 🔹 Total price of the order
      paymentMethod,     // 🔹 "COD" or "Razorpay"
      isPaid = false,    // 🔹 Default unpaid
      paymentResult = {},// 🔹 Razorpay/Payment gateway response
      shippingAddress = {}, // 🔹 Shipping info
    } = req.body;

    // ✅ Get authenticated user's ID
    const userId = req.userId || req.user?._id;

    // 🔐 Check user authentication
    if (!userId) {
      console.error('❌ Order Error: User not authenticated');
      return res.status(401).json({
        msg: '❌ User authentication required. Please log in again.',
      });
    }

    // ⚠️ Basic validation
    if (!paymentMethod || !totalPrice) {
      console.error('❌ Order Error: Missing payment method or total price');
      return res.status(400).json({
        msg: '❌ Payment method and total price are required.',
      });
    }

    // ================================
    // 🛒 CASE 1: SINGLE PRODUCT ORDER
    // ================================
    if (productId) {
      if (!quantity) {
        console.error('❌ Order Error: Quantity is missing for single product order');
        return res.status(400).json({
          msg: '❌ Quantity is required for single product orders.',
        });
      }

      // ✅ Fix this line
      const product = await Product.findOne({ id: productId });
      if (!product) {
        return res.status(404).json({ msg: '❌ Product not found' });
      }

      const order = await Order.create({
        user: userId,
        orderItems: [
          {
            product: product._id, // ✅ Correct _id usage
            quantity,
          },
        ],
        totalPrice,
        paymentMethod,
        shippingAddress,
        isPaid,
        paidAt: isPaid ? Date.now() : null,
        paymentResult,
      });

      console.log('✅ Order placed for single product:', order._id);
      return res.status(201).json({
        msg: '✅ Single product order placed successfully.',
        order,
      });
    }


    // ===============================
    // 🛒 CASE 2: MULTI PRODUCT (CART)
    // ===============================
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const formattedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await Product.findOne({ id: item.productId });
          return {
            product: product?._id,
            quantity: item.quantity || 1,
          };
        })
      );

      const order = await Order.create({
        user: userId,
        orderItems: formattedItems,
        totalPrice,
        paymentMethod,
        shippingAddress,
        isPaid,
        paidAt: isPaid ? Date.now() : null,
        paymentResult,
      });

      console.log('✅ Order placed from cart:', order._id);
      return res.status(201).json({
        msg: '✅ Cart order placed successfully.',
        order,
      });
    }


    // ❌ No valid product or cart items provided
    console.error('❌ Order Error: Neither single product nor valid cart items provided');
    return res.status(400).json({
      msg: '❌ Please provide either a valid productId or cartItems array.',
    });
  } catch (err) {
    console.error('❌ Internal Order Error:', err.message);
    res.status(500).json({
      msg: '❌ Failed to place order due to server error.',
      error: err.message,
    });
  }
};



export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Optional: Check if the user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order already cancelled' });
    }

    if (order.status === 'Shipped' || order.status === 'Delivered') {
      return res.status(400).json({ message: 'Cannot cancel after shipment' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId }).populate(
      'orderItems.product',
      'name price image'
    );

    console.log('✅ userId used to fetch orders:', userId);
    console.log('✅ Number of orders found:', orders.length);
    // Optional: log all user IDs
    orders.forEach((order, index) => {
      // console.log(`Order ${index + 1} userId:`, order.user);
    });

    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
