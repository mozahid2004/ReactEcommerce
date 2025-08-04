// 📁 backend/routes/authRoutes.js

import express from 'express';
import {
  emailUserToken,
  loginUser,
  registerUser,
  sendOTP,
  verifyOTP,
} from '../controllers/AuthController.js';

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user (admin or regular)
 * @access  Public
 */
router.post('/signup', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/verify-email
 * @desc    Email verification link handler
 * @access  Public
 */
router.post('/verify-email', emailUserToken); // 🔁 switched from GET to POST


/**
 * @route   POST /api/auth/send-otp
 * @desc    Send OTP to registered user's email
 * @access  Public
 */
router.post('/send-otp', sendOTP);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify entered OTP
 * @access  Public
 */
router.post('/verify-otp', verifyOTP);

export default router;
