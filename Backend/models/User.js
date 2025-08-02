// 📁 backend/models/User.js

import mongoose from 'mongoose';

/**
 * User Schema
 * Represents all registered users (admin and regular).
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    mobile: {
      type: String,
      required: false,
      trim: true,
    },

    // ✅ Cart contains product references with quantities
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],

    // ✅ Wishlist contains only product references
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],

    // ✅ Address properly defined INSIDE the schema
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String }
    },

    // ✅ Marketing Features
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    subscribedToNewsletter: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
