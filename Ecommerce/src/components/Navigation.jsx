import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* 🎁 Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          🎁 GiftStore
        </Link>

        {/* 🔍 Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder=" Search products..."
            className="w-full px-5 py-2 pl-10 rounded-full text-white-800 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2 text-gray-400 text-lg pointer-events-none">🔍</span>
        </form>

        {/* 🔗 Navigation Links */}
        <div className="space-x-6 text-sm font-medium hidden md:flex items-center relative">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/shop" className="hover:text-yellow-300">Shop</Link>

          {/* ✅ User Logged In */}
          {user && user.role === 'user' && (
            <>
              <Link to="/user/dashboard" className="hover:text-yellow-300">User Dashboard</Link>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                >
                  {user.name} ⌄
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ✅ Admin Logged In */}
          {user && user.role === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="hover:text-yellow-300">Admin Dashboard</Link>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full"
                >
                  {user.name} ⌄
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-10">
                    <Link
                      to="/admin/add-product"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      ➕ Add Product
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      🛠️ Manage Products
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      📦 View Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ❌ Not Logged In */}
          {!user && (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-yellow-500 px-4 py-2 rounded text-yellow-500 hover:bg-yellow-500 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
