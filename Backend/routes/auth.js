// 📁 backend/routes/authRoutes.js

import express from 'express';
import { signup, login } from '../controllers/AuthController.js';

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user (admin or regular)
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
router.post('/login', login);

export default router;
