import axios from 'axios';

// 🔧 Base API URL
const API = 'http://localhost:5000/api/auth';

// 🔐 Signup API
export const signup = async (formData) => {
  const res = await axios.post(`${API}/signup`, formData);
  return res.data;
};

// 🔐 Login API
export const login = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  return res.data;
};

// 🛒 Add to Cart API
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

// 💖 Add to Wishlist API
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
