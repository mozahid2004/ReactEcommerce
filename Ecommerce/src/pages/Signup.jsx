import React, { useState } from 'react';
import authService from '../Services/authService';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    mobile: ''
  });

  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await authService.signup(form);

      if (res?.user && res?.token) {
        login(res);
        setRedirect(true);
      } else {
        setMessage(res.msg || 'Signup successful. Please verify your email or mobile.');
      }
    } catch (err) {
      console.error('❌ Signup error:', err);
      setMessage('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Adjust for backend
  };

  if (redirect) return <Navigate to="/dashboard" />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-6">
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>

      {message && (
        <div className="bg-yellow-100 text-yellow-700 p-2 text-center rounded text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          placeholder="Mobile Number"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Signup
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">OR</div>

      <button
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Signup with Google
      </button>
    </div>
  );
}

export default Signup;
