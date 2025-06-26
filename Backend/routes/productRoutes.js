// 📁 backend/routes/productRoutes.js

import express from 'express';
import {
  getAllProducts,
  searchProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/ProductController.js';

const router = express.Router();

/**
 * @route   GET /api/products/search?q=...
 * @desc    Search products by name or description (case-insensitive)
 * @access  Public
 */
router.get('/search', searchProducts); // 🛑 MUST be placed before '/:id'

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by its MongoDB _id
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Add a new product (Admin only)
 * @access  Private (requires auth + role check)
 */
router.post('/', addProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product (Admin only)
 * @access  Private (requires auth + role check)
 */
router.put('/:id', updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID (Admin only)
 * @access  Private (requires auth + role check)
 */
router.delete('/:id', deleteProduct);

export default router;
