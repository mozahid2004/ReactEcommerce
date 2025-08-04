import axios from 'axios';

const createRazorpayOrder = async (totalPrice, token) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/payment/create-order',
      {
        amount: totalPrice * 100, // ✅ Convert INR to paise (e.g., 499 → 49900)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // ✅ contains { id, amount, currency }
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error);
    throw error;
  }
};
