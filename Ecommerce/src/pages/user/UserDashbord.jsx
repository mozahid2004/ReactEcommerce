import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-pink-600">Welcome, {user.name} 🎉</h1>
        <p className="mt-2 text-gray-600">You're logged in as a <b>{user.role}</b></p>
      </div>

      {/* User Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Your Info</h2>
        <ul className="text-gray-700 space-y-2">
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Role:</strong> {user.role}</li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/cart" className="p-6 bg-pink-100 hover:bg-pink-200 rounded-2xl shadow-md text-center transition">
          <span className="text-2xl">🛒</span>
          <h3 className="mt-2 font-semibold text-lg">Your Cart</h3>
        </Link>

        <Link to="/wishlist" className="p-6 bg-blue-100 hover:bg-blue-200 rounded-2xl shadow-md text-center transition">
          <span className="text-2xl">💖</span>
          <h3 className="mt-2 font-semibold text-lg">Your Wishlist</h3>
        </Link>

        <Link to="/orders" className="p-6 bg-green-100 hover:bg-green-200 rounded-2xl shadow-md text-center transition">
          <span className="text-2xl">📦</span>
          <h3 className="mt-2 font-semibold text-lg">Your Orders</h3>
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
