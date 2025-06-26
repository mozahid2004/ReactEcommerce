// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to authenticate users and authorize roles.
 * 
 * ✅ Basic Usage:
 *    - auth() → Only checks if user is logged in
 *    - auth('admin') → Only allows admin users
 *    - auth(['admin', 'moderator']) → Allows either admin or moderator
 * 
 * @param {string|string[]} roles - Allowed roles (optional)
 */
const auth = (roles = []) => {
  // Ensure roles is always an array for consistency
  if (typeof roles === 'string') roles = [roles];

  // Middleware function
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Must start with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // ✅ Decode token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Fetch user from DB using decoded ID
      const user = await User.findById(decoded.id)
        .populate('cart.productId')
        .populate('wishlist.productId')
        .select('-password'); // Exclude password from user object

      if (!user) return res.status(401).json({ msg: 'User not found' });

      // ✅ Role-based access control
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ msg: 'Access denied: insufficient role' });
      }

      // ✅ Store user info in request object for access in controllers
      req.user = user;             // Full user object
      req.userId = decoded.id;     // Just user ID if needed separately

      next(); // Proceed to the next middleware/route
    } catch (err) {
      console.error('❌ Auth middleware error:', err.message);
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };
};

export default auth;
