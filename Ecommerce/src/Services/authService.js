// 📁 frontend/Services/authService.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

const login = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
    return data; // ✅ { user, token }
  } catch (error) {
    console.error('🔒 Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};

const signup = async (userData) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, userData);
    return data;
  } catch (error) {
    console.error('📩 Signup error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Signup failed' };
  }
};

export default {
  login,
  signup,
};
