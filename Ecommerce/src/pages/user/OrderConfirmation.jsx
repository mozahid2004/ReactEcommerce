// 📁 src/pages/OrderConfirmation.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return <div className="p-4 text-red-600">❌ No order data available.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-8 border">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">🎉 Order Placed Successfully!</h2>

      <div className="space-y-4 text-lg">
        <p><strong>🆔 Order ID:</strong> {order._id}</p>
        <p><strong>📦 Status:</strong> {order.status || 'Placed'}</p>
        <p><strong>💳 Payment Mode:</strong> {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
        <p><strong>🔁 Transaction ID:</strong> {order.paymentResult?.id || 'N/A'}</p>
        <p><strong>💰 Total Bill:</strong> ₹{order.totalPrice}</p>
      </div>

      {/* 🎯 Continue Shopping Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          🛍️ Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
