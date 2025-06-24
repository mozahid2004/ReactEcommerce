// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];

  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id)
        .populate('cart.productId')
        .populate('wishlist.productId')
        .select('-password');

      if (!user) return res.status(401).json({ msg: 'User not found' });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ msg: 'Access denied: insufficient role' });
      }

      req.user = user;
      req.userId = decoded.id; // ✅ So we can use it directly in non-populated queries

      next();
    } catch (err) {
      console.error('❌ Auth middleware error:', err.message);
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };
};

export default auth;
