// 📁 controllers/AuthController.js

// ✅ Core dependencies
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Database model
import User from '../models/User.js';

// ✅ Email utility for sending verification emails
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

import  generateJWT  from '../utils/generateJWT.js'
// ❗ If you use JWT tokens, ensure this utility exists
// import generateJWT from '../utils/generateJWT.js';

// ------------------------------------------------------------------
// ✅ Register User Controller
// ------------------------------------------------------------------
export const registerUser = async (req, res) => {
  const { name, email, password, role, mobile } = req.body;
  console.log('📥 Signup Request:', req.body);

  // ❌ Check if all required fields are present
  if (!name || !email || !password || !role || !mobile) {
    console.log('❌ Missing field in request body');
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // ❌ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ✅ Generate unique email verification token & hash password
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      mobile,
      emailVerificationToken,
      isVerified: false,
    });

    // ✅ Save user to DB
    await user.save();
    console.log('✅ User saved to DB:', user.email);

    // ✅ Send email verification link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
    await sendVerificationEmail(email, name, verificationLink);
    console.log('📧 Verification email sent to:', email);

    // ✅ Respond to frontend
    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
    });

  } catch (error) {
    console.error('❌ Registration Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// ------------------------------------------------------------------
// ✅ Verify Email Controller
// ------------------------------------------------------------------
export const emailUserToken = async (req, res) => {
  try {
    const { token } = req.body; // 🔁 FIX: token comes in the POST body, not query

    // ❌ Check if token is valid
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // ✅ Mark user as verified
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    // ✅ Send success response
    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Email Verification Error:', error);
    res.status(500).json({ message: 'Error verifying email' });
  }
};

// ------------------------------------------------------------------
// ✅ Login User Controller
// ------------------------------------------------------------------
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    console.log('📨 Login request received:', req.body);

    // ✅ Find user by email OR mobile
    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (!user) {
      console.log('❌ No user found with:', identifier);
      return res.status(401).json({ message: 'Invalid email/mobile or password' });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email/mobile or password' });
    }

    // ✅ Check if verified
    if (!user.isVerified) {
      console.log('⛔ Email not verified for:', identifier);
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // ✅ Generate JWT token
    const token = generateJWT(user._id);

    console.log('✅ Login successful for:', identifier);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('🔥 Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


// ------------------------------------------------------------------
// ✅ Send OTP Controller
// ------------------------------------------------------------------
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // ❌ Validate email & user existence
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    // ✅ Generate 6-digit OTP & expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // ✅ Store OTP in user document
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // ✅ Send OTP via email
    await sendVerificationEmail(
      email,
      user.name,
      `Your OTP is: ${otp}` // ✅ You can format this with a custom HTML template
    );

    res.status(200).json({ message: 'OTP sent to email successfully' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ message: 'Server error while sending OTP' });
  }
};

// ------------------------------------------------------------------
// ✅ Verify OTP Controller
// ------------------------------------------------------------------
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    // ❌ Check if OTP is present and not already used
    if (!user || !user.otp || !user.otpExpires)
      return res.status(400).json({ message: 'OTP not found or already verified' });

    // ❌ Check for expiration
    const isOTPExpired = user.otpExpires < Date.now();
    if (isOTPExpired) {
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    // ❌ Validate OTP
    if (user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP' });

    // ✅ If OTP matches, mark as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // ✅ Generate new token and return
    const token = generateJWT(user._id);

    res.status(200).json({ message: 'OTP verified successfully', token, user });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Server error while verifying OTP' });
  }
};
