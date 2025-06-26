import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: '',
    category: '',
    image: '',
    topSelling: false,
  });

  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data = res.data;
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          rating: data.rating,
          category: data.category,
          image: data.image,
          topSelling: data.topSelling,
        });
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to fetch product:', err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      alert('✅ Product updated successfully!');
      navigate('/admin/products'); // Redirect to product list
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('❌ Failed to update product');
    }
  };

  if (loading) {
    return <p className="text-center py-10 text-gray-600">Loading product...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="topSelling"
            checked={formData.topSelling}
            onChange={handleChange}
          />
          <span>Top Selling</span>
        </label>

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
