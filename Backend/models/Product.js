// 📁 backend/models/Product.js

import mongoose from 'mongoose';

/**
 * Product Schema
 * Represents a product in the eCommerce platform.
 */
const productSchema = new mongoose.Schema(
  {
    // ✅ Custom unique product ID (optional — MongoDB already generates _id)
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    topSelling: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
  }
);

// ✅ Export Product model
export default mongoose.model('Product', productSchema);
