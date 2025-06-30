import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch cart on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Remove from cart
  // ✅ Remove from cart
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) =>
        prev.filter((item) => item?.productId && item.productId._id !== productId)
      );
    } catch (err) {
      console.error('❌ Remove failed:', err);
      alert('❌ Could not remove item');
    }
  };


  // ✅ Buy Now (single product)
  const handleBuyNow = (product, quantity) => {
    navigate('/review-order', {
      state: {
        product,
        quantity,
        type: 'single',
      },
    });
  };

  // ✅ Buy All Items
  const handleBuyAll = () => {
    const validItems = cart
      .filter(item => item?.productId && typeof item.productId === 'object')
      .map(item => ({
        product: item.productId,
        quantity: item.quantity,
      }));

    if (!validItems.length) {
      alert("❌ No valid items to buy");
      return;
    }

    navigate('/review-order', {
      state: {
        cartItems: validItems,
        type: 'multiple',
      },
    });
  };

  // 💰 Bill Summary
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = item?.productId?.price || 0;
    return acc + (item.quantity || 0) * price;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {loading ? (
        <p className="text-gray-600">Loading your cart...</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-600">No items in cart.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, i) => {
              const product = item?.productId;
              if (!product || typeof product === 'string') return null;

              return (
                <div
                  key={item._id || i}
                  className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description?.slice(0, 80)}...</p>
                    <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleBuyNow(product, item.quantity)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gray-100 p-6 rounded-2xl shadow-md text-right">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">🧾 Bill Summary</h3>
            <p className="text-gray-700">Total Items: {totalItems}</p>
            <p className="text-gray-800 text-lg font-bold mt-2">Total Amount: ₹{totalPrice}</p>

            <button
              onClick={handleBuyAll}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-base shadow transition"
            >
              🛍️ Buy All Items
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
