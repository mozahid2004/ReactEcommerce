// 📁 backend/controllers/adminUserController.js

import User from '../models/User.js';

/**
 * @desc Get all users (with optional filter by tag or newsletter)
 * @route GET /api/admin/users
 * @access Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    const { tag, subscribed } = req.query;

    const query = {};
    if (tag) query.tags = tag;
    if (subscribed) query.newsletter = subscribed === 'true';

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc Get single user by ID
 * @route GET /api/admin/users/:id
 * @access Admin
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('❌ Error fetching user:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc Update user marketing info
 * @route PUT /api/admin/users/:id
 * @access Admin
 */
export const updateUser = async (req, res) => {
  try {
    const { tags, newsletter, notes } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (tags) user.tags = tags;
    if (typeof newsletter === 'boolean') user.newsletter = newsletter;
    if (notes !== undefined) user.notes = notes;

    await user.save();
    res.json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error('❌ Error updating user:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @desc Delete user
 * @route DELETE /api/admin/users/:id
 * @access Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting user:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
