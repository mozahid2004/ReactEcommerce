import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } catch (error) {
        console.error('❌ Error fetching cart:', error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const validCartItems = cart.filter(
    (item) =>
      item?.productId &&
      typeof item.productId === 'object' &&
      Number(item.quantity) > 0
  );

  const totalItems = validCartItems.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );
  const totalPrice = validCartItems.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + Number(item.quantity) * price;
  }, 0);

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/user/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart((prev) =>
        prev.filter((item) => item?.productId?._id !== productId)
      );
    } catch (err) {
      console.error('❌ Remove failed:', err);
      alert('❌ Could not remove item');
    }
  };

  const handleBuyNow = (product, quantity) => {
    navigate('/review-order', {
      state: {
        product,
        quantity,
        type: 'single',
      },
    });
  };

  const handleBuyAll = () => {
    const buyItems = validCartItems.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    if (!buyItems.length) {
      alert('❌ No valid items to buy');
      return;
    }

    navigate('/review-order', {
      state: {
        cartItems: buyItems,
        type: 'multiple',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-50 via-pink-100 to-purple-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10 tracking-wide shadow-sm drop-shadow-md">
          🛒 Your Funky Cart
        </h2>

        {loading ? (
          <p className="text-center text-lg text-gray-700 animate-pulse">Loading your cart...</p>
        ) : validCartItems.length === 0 ? (
          <p className="text-center text-xl text-gray-600">🚫 No items in cart</p>
        ) : (
          <>
            <div className="grid gap-6">
              {validCartItems.map((item, i) => {
                const product = item.productId;

                return (
                  <div
                    key={item._id || i}
                    className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 transition hover:scale-[1.01]"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full sm:w-36 h-36 object-contain rounded-xl border-4 border-purple-300 bg-white shadow-md transition-all duration-300 hover:scale-105"
                    />

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-purple-700">{product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {product.description?.slice(0, 80)}...
                      </p>
                      <div className="mt-2 flex justify-between sm:justify-start sm:gap-6">
                        <span className="text-pink-600 font-semibold text-lg">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition transform hover:scale-105 shadow-md"
                      >
                        ❌ Remove
                      </button>
                      <button
                        onClick={() => handleBuyNow(product, item.quantity)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition transform hover:scale-105 shadow-md"
                      >
                        ⚡ Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bill Summary */}
            <div className="mt-12 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">💸 Bill Summary</h3>
              <p className="text-lg text-gray-700">🧾 Total Items: {totalItems}</p>
              <p className="text-2xl font-extrabold text-purple-700 mt-2">
                💰 Total: ₹{totalPrice}
              </p>

              <button
                onClick={handleBuyAll}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full text-xl transition transform hover:scale-105 shadow-xl"
              >
                🛍️ Buy All Items
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
