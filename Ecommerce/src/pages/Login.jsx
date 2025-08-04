import React, { useState } from 'react';
import authService from '../Services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [identifier, setIdentifier] = useState(''); // email or mobile
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await authService.login({ identifier, password }); // ← data = { token, user }
      if (data.token && data.user) {
        login(data); // useAuth() will handle context
        alert('Login successful ✅');
        navigate('/dashboard');
      } else {
        setError(data?.message || 'Login failed.');
      }


    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 403) {
          setError(data.message || 'Please verify your email before logging in.');
        } else if (status === 401) {
          setError('Invalid credentials.');
        } else {
          setError(data.message || 'Something went wrong.');
        }
      } else {
        setError('Network error. Try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // adjust for prod
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-6">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-600 border border-red-300 p-2 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Mobile"
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

      <div className="text-center text-sm text-gray-500">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
