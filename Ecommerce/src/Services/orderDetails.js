// src/Services/orderDetails.js
import axios from 'axios';

export const getUserAddress = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Handle multiple structures from backend
    return res.data?.user?.address || res.data?.address || null;
  } catch (error) {
    console.error('❌ Failed to fetch user address:', error);
    return null;
  }
};
