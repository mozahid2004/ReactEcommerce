// 📁 src/pages/PaymentPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, quantity, cartItems, type, total, address } = state || {};
  const { user, token } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState('');
  const [finalCartItems, setFinalCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFinalCartItems(res.data.cart || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    if (type === 'multiple') {
      if (cartItems?.length > 0) {
        setFinalCartItems(cartItems);
      } else {
        fetchCart();
      }
    }
  }, [type, cartItems, token]);

  const clearCart = async () => {
    if (type === 'multiple') {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/cart`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('✅ Cart cleared');
      } catch (err) {
        console.warn('❌ Failed to clear cart:', err.response?.data || err.message);
      }
    }
  };

  const buildOrderPayload = (isOnline = false, paymentResult = {}) => {
    const base = {
      totalPrice: total,
      paymentMethod: isOnline ? 'Online' : 'COD',
      isPaid: isOnline,
      paymentResult,
      shippingAddress: address,
    };

    return type === 'single'
      ? { ...base, productId: product?._id, quantity }
      : {
          ...base,
          cartItems: finalCartItems.map((item) => ({
            productId:
              item.product?._id ||
              item.productId?._id ||
              item.productId ||
              item._id,
            quantity: item.quantity || 1,
          })),
        };
  };

  const handleCOD = async () => {
    try {
      const payload = buildOrderPayload(false);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/order`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      
      );

      // console.log(data);

      await clearCart();

      navigate('/order-confirmation', {
        state: { order: data.order, type },
      });
    } catch (error) {
      // 111111111111111111111111111111111111111111111111
      console.error('❌ COD Order Failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Order failed');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert('Razorpay SDK failed to load');

    try {
      const { data: razorpayOrder } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`,
        { amount: total * 100 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: 'rzp_test_E2BGGWBtD0SG0G', // Replace in production
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Shop Name',
        description: 'Order Payment',
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const payload = buildOrderPayload(true, {
              id: response.razorpay_payment_id,
              status: 'Success',
            });

            const res = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/order`,
              payload,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            await clearCart();

            navigate('/order-confirmation', {
              state: { order: res.data.order },
            });
          } catch (err) {
            console.error('❌ Payment succeeded, order failed:', err);
            alert('Payment succeeded but order failed. Contact support.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Razorpay Error:', err);
      alert('Payment initiation failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={selectedMethod === 'COD'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span>Cash on Delivery (COD)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={selectedMethod === 'Online'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span>Pay Online (Razorpay)</span>
        </label>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={
          selectedMethod === 'COD'
            ? handleCOD
            : selectedMethod === 'Online'
            ? handleOnlinePayment
            : () => alert('Please select a payment method')
        }
      >
        Continue to Pay
      </button>
    </div>
  );
};

export default PaymentPage;
