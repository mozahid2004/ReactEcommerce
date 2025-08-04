import mongoose from 'mongoose';

// ✅ Clear existing cached model to avoid schema conflicts
delete mongoose.connection.models['Order'];

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },

  // ✅ Order status field
  status: {
    type: String,
    enum: ['Placed', 'Cancelled', 'Shipped', 'Delivered'],
    default: 'Placed'
  }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
