import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error('❌ Wishlist fetch error:', err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      alert('Product removed from wishlist');
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWishlist();
    } catch (err) {
      console.error('❌ Remove failed:', err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-lg">You haven't added anything to your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item, i) => {
            const product = item.productId;
            if (!product || typeof product === 'string') return null;

            return (
              <div
                key={item._id || i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex gap-6"
              >
                {/* Product Image */}
                <Link to={`/product/${product._id}`} className="w-32 h-32 shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                        {product.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-bold text-green-700">₹{product.price}</div>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={`h-4 w-4 ${idx < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.rating || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
