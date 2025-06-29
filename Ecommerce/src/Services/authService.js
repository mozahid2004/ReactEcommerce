import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

const authService = {
  // 🔐 Signup
  signup: async (formData) => {
    const res = await axios.post(`${API}/signup`, formData);
    return res.data;
  },

  // 🔐 Login
  login: async (credentials) => {
    const res = await axios.post(`${API}/login`, credentials);
    return res.data;
  }
};

export default authService;
