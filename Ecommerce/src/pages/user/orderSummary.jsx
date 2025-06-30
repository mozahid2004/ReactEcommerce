// src/pages/user/OrderSummary.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserAddress } from '../../Services/orderDetails';

function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    items = [],
    subtotal = 0,
    tax = 0,
    deliveryFee = 0,
    total = 0,
    type,
  } = location.state || {};

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getUserAddress();
        setAddress(data);
      } catch (error) {
        console.error("❌ Error loading address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleContinueToPayment = () => {
    navigate('/payment', {
      state: {
        items,
        subtotal,
        tax,
        deliveryFee,
        total,
        type,
        address,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">📦 Order Summary</h2>

      {/* 🛍️ Ordered Items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex gap-4"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{item.product.name}</h3>
              <p className="text-gray-600">Qty: {item.quantity}</p>
              <p className="text-pink-600 font-bold">₹{item.product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🏠 Shipping Address */}
      <div className="mt-10 bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🏠 Shipping Address</h3>
        {address ? (
          <p className="text-gray-700">
            {address.street}, {address.city}, {address.state} - {address.postalCode}
          </p>
        ) : (
          <p className="text-gray-500 italic">Loading your address...</p>
        )}
      </div>

      {/* 💰 Bill Summary */}
      <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md">
        <h4 className="text-xl font-semibold mb-4">💰 Bill Summary</h4>
        <ul className="space-y-2 text-gray-700">
          <li>Subtotal: ₹{subtotal.toFixed(2)}</li>
          <li>Tax: ₹{tax.toFixed(2)}</li>
          <li>Delivery Fee: ₹{deliveryFee.toFixed(2)}</li>
          <li className="font-bold text-lg text-gray-800">Total: ₹{total.toFixed(2)}</li>
        </ul>
      </div>

      {/* ✅ Continue Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleContinueToPayment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
        >
          💳 Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
