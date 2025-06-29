import axios from 'axios';

export const addToWishlist = async (productId, token) => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/user/wishlist',
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("❌ Wishlist Error:", err.response?.data || err.message);
    throw err;
  }
};
