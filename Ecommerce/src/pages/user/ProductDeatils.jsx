// src/pages/user/ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { addToCart } from '../../api/auth';
import axios from 'axios';
import ProductCard from './ProductCard';

// ⭐ Star Rating Component
const StarRating = ({ rating }) => (
  <div className="flex items-center space-x-1 text-yellow-400">
    {Array.from({ length: 5 }, (_, i) =>
      i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
    )}
  </div>
);

function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // 👆 Scroll to top on new product load
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        const all = await axios.get(`http://localhost:5000/api/products`);
        const relatedProducts = all.data.filter(
          (p) => p.category === res.data.category && p._id !== res.data._id
        );
        setRelated(relatedProducts.slice(0, 3));
      } catch (err) {
        console.error("❌ Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await addToCart({ productId: product._id, quantity: 1 }, token);
      alert('✅ Added to cart!');
    } catch (error) {
      console.error('❌ Cart Error:', error);
      alert("❌ Could not add to cart");
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!user) return alert("🔐 Please login to buy");
      const token = localStorage.getItem('token');
      await addToCart({ productId: product._id, quantity: 1 }, token);
      window.location.href = "/user/cart";
    } catch (err) {
      console.error("❌ Buy Now Error:", err);
      alert("❌ Error processing your request");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-bold text-xl">
        ❌ Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 🧾 Product Details */}
      <h1 className="text-center text-4xl font-bold text-pink-600 mb-10">
        Product Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-xl">
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-full max-w-full"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <StarRating rating={product.rating} />
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-6 text-2xl text-pink-600 font-bold">₹{product.price}</p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 🔄 Related Products */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
          🛍️ You may also like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {related.map((p) => (
            <ProductCard product={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
