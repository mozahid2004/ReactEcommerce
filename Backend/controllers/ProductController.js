// controllers/productController.js

import Product from '../models/Product.js';

/**
 * @desc   Get all products
 * @route  GET /api/products
 * @access Public
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ msg: 'Failed to fetch products' });
  }
};

/**
 * @desc   Search products by keyword in name or description
 * @route  GET /api/products/search?q=
 * @access Public
 */
const searchProducts = async (req, res) => {
  const q = req.query.q || '';

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });

    res.json(products);
  } catch (err) {
    console.error("❌ Product search error:", err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc   Get a product by its ID
 * @route  GET /api/products/:id
 * @access Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '❌ Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error("❌ Error getting product by ID:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc   Add a new product
 * @route  POST /api/products
 * @access Admin (protect this in routes)
 */
const addProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      rating,
      category,
      image,
      topSelling,
    } = req.body;

    // ✅ Validate required fields
    if (!id || !name || !price || !category || !image) {
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }

    const newProduct = new Product({
      id,
      name,
      description,
      price,
      rating,
      category,
      image,
      topSelling,
    });

    await newProduct.save();

    res.status(201).json({ msg: '✅ Product added successfully', product: newProduct });
  } catch (err) {
    console.error("❌ Add product error:", err.message);
    res.status(500).json({ msg: '❌ Failed to add product' });
  }
};

/**
 * @desc   Update a product by ID
 * @route  PUT /api/products/:id
 * @access Admin
 */
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns updated document
    });

    if (!updated) {
      return res.status(404).json({ message: '❌ Product not found to update' });
    }

    res.json({ message: '✅ Product updated', product: updated });
  } catch (err) {
    console.error("❌ Update product error:", err.message);
    res.status(500).json({ message: 'Update failed' });
  }
};

/**
 * @desc   Delete a product by ID
 * @route  DELETE /api/products/:id
 * @access Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: '❌ Product not found' });
    }

    res.json({ message: '✅ Product deleted successfully' });
  } catch (err) {
    console.error("❌ Delete product error:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 🧾 Export all controller functions
export {
  getAllProducts,
  searchProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
