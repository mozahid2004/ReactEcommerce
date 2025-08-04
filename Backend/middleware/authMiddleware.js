// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to authenticate users and optionally check roles.
 *
 * Usage:
 *   - auth()                 → Requires login only
 *   - auth('admin')          → Requires user to be admin
 *   - auth(['admin', 'user']) → Allows both admin and user
 *
 * @param {string|string[]} roles - Optional role(s) to authorize
 */
const auth = (roles = []) => {
  if (typeof roles === 'string') roles = [roles]; // Normalize to array

  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id)
        .select('-password')
        .populate('cart.productId')
        .populate('wishlist.productId');

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }

      req.user = user;
      req.userId = user._id;

      next();
    } catch (error) {
      console.error('❌ JWT Error:', error.message);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

export default auth;
