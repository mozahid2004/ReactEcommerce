// 📁 backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // ✅ Unique product ID
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  topSelling: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
