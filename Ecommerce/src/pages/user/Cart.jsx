import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.cart || []);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Remove from cart handler
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // 🧹 Remove from UI
      setCart(prev => prev.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error('❌ Remove failed:', err);
      alert('❌ Could not remove item');
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {loading ? (
        <p className="text-gray-600">Loading your cart...</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-600">No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, i) => {
            const product = item?.productId;

            if (!product || typeof product === 'string') return null;

            return (
              <div
                key={item._id || i}
                className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 gap-4"
              >
                {/* 🖼️ Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
                />

                {/* 📋 Product Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description?.slice(0, 80)}...</p>
                  <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>

                {/* ❌ Remove Button */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cart;
