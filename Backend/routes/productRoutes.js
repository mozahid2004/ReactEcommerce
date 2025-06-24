import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// ✅ GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch products' });
  }
});

// ✅ 🔍 SEARCH route — placed BEFORE `/:id`
router.get('/search', async (req, res) => {
  const q = req.query.q || '';

  try {
    console.log("🔍 Search query received:", q);
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ]
    });

    res.json(products);
  } catch (err) {
    console.error('❌ Backend search route error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ POST add new product (admin only if needed)
router.post('/', async (req, res) => {
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

    // Basic validation
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
    console.error('❌ Add Product Error:', err.message);
    res.status(500).json({ msg: '❌ Failed to add product' });
  }
});

export default router;
