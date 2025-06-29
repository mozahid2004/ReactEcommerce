import React, { useState } from 'react';
import authService from '../Services/authService';      // ✅ Default export
import { useAuth } from '../context/AuthContext';       // ✅ Auth context
import { useNavigate } from 'react-router-dom';         // ✅ Navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();       // ✅ Context function to save user/token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.login({ email, password }); // ✅ Auth API call

      if (res.token && res.user) {
        login(res);             // ✅ Save user + token in context
        alert("Login successful");
        navigate('/dashboard'); // ✅ Redirect
      } else {
        alert(res.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border border-gray-300 p-2 rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full border border-gray-300 p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
