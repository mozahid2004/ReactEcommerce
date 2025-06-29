import axios from 'axios';

export const addToCart = async (cartItem, token) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/user/cart',
      cartItem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Add to Cart API error:", error.response?.data || error.message);
    throw error;
  }
};
