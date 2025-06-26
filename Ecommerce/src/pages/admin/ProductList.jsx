import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("❌ Could not delete product.",err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 All Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between bg-white border shadow-sm p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description?.slice(0, 60)}...</p>
                  <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
