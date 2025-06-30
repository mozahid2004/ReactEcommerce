// src/pages/user/PaymentPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, quantity } = state || {};
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return alert("Please select a payment method");

    try {
      const token = localStorage.getItem('token');
      const totalPrice = product.price * quantity;
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        {
          productId: product._id,
          quantity,
          totalPrice,
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate('/order-confirmation', { state: { order: res.data.order } });
    } catch (err) {
      console.error('❌ Payment Error:', err);
      alert('Order failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
      <div className="space-y-2">
        {['Cash On Delivery', 'PhonePe', 'Paytm'].map((method) => (
          <div key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="ml-2">{method}</label>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handlePlaceOrder}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default PaymentPage;
