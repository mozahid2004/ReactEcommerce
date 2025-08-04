// 📁 src/pages/VerifyEmail.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  // ✅ Get current URL location object (to extract token query param)
  const location = useLocation();
  
  // ✅ Hook for programmatic navigation after verification
  const navigate = useNavigate();

  // ✅ Track the status of verification to show user feedback
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    // ✅ Extract the "token" query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    // ✅ Handle missing or invalid token
    if (!token) {
      setStatus('Invalid or missing token');
      return;
    }

    // ✅ Function to send token to backend and verify
    const verifyToken = async () => {
      try {
        // 🔁 Send token to backend API for verification
        const response = await axios.post('http://localhost:5000/api/auth/verify-email', { token });

        // ✅ Update UI with success message
        setStatus(response.data.message || 'Email verified successfully!');

        // 🔁 Redirect to login after 2 seconds
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        // ❌ Show backend error message or fallback
        setStatus(error?.response?.data?.message || 'Verification failed');
      }
    };

    // ✅ Call the function when component mounts
    verifyToken();
  }, [location.search, navigate]);

  // ✅ Render the status message to user
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-xl font-semibold">{status}</h2>
    </div>
  );
};

export default VerifyEmail;
