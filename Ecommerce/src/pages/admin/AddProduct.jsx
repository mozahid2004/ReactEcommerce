// 📁 src/admin/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    rating: '',
    category: '',
    image: '',
    topSelling: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      alert('✅ Product added successfully!');
      setForm({
        id: '',
        name: '',
        description: '',
        price: '',
        rating: '',
        category: '',
        image: '',
        topSelling: false,
      });
    } catch (err) {
      console.error('❌ Error adding product:', err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="id"
          placeholder="Product ID"
          value={form.id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          value={form.rating}
          onChange={handleChange}
          min="0"
          max="5"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="topSelling"
            checked={form.topSelling}
            onChange={handleChange}
          />
          Mark as Top Selling
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
