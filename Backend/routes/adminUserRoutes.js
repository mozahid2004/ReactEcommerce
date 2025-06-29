import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/adminUserController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Get all users
router.get('/', auth('admin'), getAllUsers);

// ✅ Get single user by ID
router.get('/:id', auth('admin'), getUserById);

// ✅ Update tags, notes, or newsletter
router.put('/:id', auth('admin'), updateUser);

// ✅ Delete user
router.delete('/:id', auth('admin'), deleteUser);

export default router;
