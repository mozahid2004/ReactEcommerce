import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalPrice: Number,
  paymentMethod: {
    type: String,
    enum: ['COD', 'PhonePe', 'Paytm'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Order', orderSchema);
