// 📁 backend/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Stores all users (admin and regular) with eCommerce-related data,
 * personalization, marketing, and activity tracking.
 */
const userSchema = new mongoose.Schema(
  {
    /** 👤 Basic Info */
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

    mobile: {
      type: String,
      required: false,
      trim: true,
    },

    /** 🛡️ Role-based Access Control */
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    /** 🛒 Shopping Cart */
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

    /** ❤️ Wishlist */
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],

    /** 🏠 Shipping Address */
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
      phone: { type: String },
    },

    /** 📦 Order History (References to Order Collection) */
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],

    /** 📈 Analytics & Tracking */
    totalSpent: {
      type: Number,
      default: 0,
    },
    numberOfOrders: {
      type: Number,
      default: 0,
    },

    /** ✅ Auth & Security */
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,


    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },

    /** 🔐 Login History for Security Logs */
    loginHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        ipAddress: String,
        userAgent: String,
      },
    ],

    /** 🧠 Marketing & Personalization */
    subscribedToNewsletter: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    notes: {
      type: String,
      trim: true,
    },

    /** ⚠️ Admin Controls */
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ➕ Automatically adds createdAt and updatedAt fields
  }
);


// ✅ Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
