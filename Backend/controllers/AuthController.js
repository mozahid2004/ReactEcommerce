// controllers/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Register a new user (admin/user)
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create and save new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    // ✅ Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Send user + token as response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Login an existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    // ✅ Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Return user + token
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Export functions as named exports
export { signup, login };
