import axios from 'axios';

export const getUserAddress = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.address;
  } catch (error) {
    console.error('❌ Failed to fetch user address:', error);
    throw error;
  }
};
