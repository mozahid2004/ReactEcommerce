import React, { useState } from 'react';
import authService from '../Services/authService';  // ✅ Correct default import
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

  const [redirect, setRedirect] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authService.signup(form); // ✅ Correct function call

      if (res?.user && res?.token) {
        login(res);
        setRedirect(true);
      } else {
        alert(res.msg || "Signup failed.");
      }
    } catch (err) {
      console.error("❌ Signup error:", err);
      alert("Signup failed. See console.");
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Signup</h2>

      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
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
  );
}

export default Signup;
