// Controller: AuthController

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ✅ Register a new user
const signup = async (req, res) => {
  try {
    const { name, email, password, role, mobile } = req.body; // ✅ include mobile here

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      mobile // ✅ correctly pass it when creating user
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      }
    });

  } catch (error) {
    console.error("❌ Signup Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Login existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile  : user.mobile
      },
    });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export { signup, login };
