import React, { use } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-700 text-lg">
        Loading your dashboard...
      </div>
    );
  }

  const isGmail = user.email?.endsWith('@gmail.com');

  const handleLogout = () => {
    alert("btn clicked")
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-10 px-4 font-[Inter,sans-serif]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Profile Info */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col items-center text-center">
          {/* Profile Image */}
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-lg mb-4 object-cover border-4 border-white"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-tr from-pink-400 to-purple-500 text-white flex items-center justify-center text-3xl rounded-full shadow-lg mb-4">
              {user.name[0]}
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>

          <p className="text-sm text-gray-600 mb-1">{user.email}</p>
          {isGmail && (
            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full mb-2">
              Gmail User
            </span>
          )}

          {user.mobile && (
            <p className="text-sm text-gray-600 mb-2">📞 {user.mobile}</p>
          )}

          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mt-2">
            {user.role?.toUpperCase()}
          </span>
        </div>

        {/* Quick Action Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: '🛒',
              title: 'Your Cart',
              desc: 'View and manage cart items',
              link: '/cart',
              color: 'border-pink-400',
            },
            {
              icon: '💖',
              title: 'Wishlist',
              desc: 'See your favorite products',
              link: '/wishlist',
              color: 'border-blue-400',
            },
            {
              icon: '📦',
              title: 'Your Orders',
              desc: 'Track your purchases',
              link: '/orders',
              color: 'border-green-400',
            },
            {
              icon: '⚙️',
              title: 'Account Settings',
              desc: 'Update your profile',
              link: '/account',
              color: 'border-yellow-400',
            },
            {
              icon: '📞',
              title: 'Help & Support',
              desc: 'Need help? Contact us',
              link: '/support',
              color: 'border-indigo-400',
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-200 p-6 rounded-2xl flex flex-col justify-between text-center border-l-4 ${item.color}`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </Link>
          ))}

          {/* Logout card */}
          {/* Logout card styled and functional */}
          <div
            onClick={handleLogout}
            className="cursor-pointer bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 p-6 rounded-2xl flex flex-col justify-between text-center shadow-lg transition-all duration-200 hover:scale-105 border-l-4 border-red-700"
          >
            <div className="text-4xl mb-2">🚪</div>
            <h3 className="text-lg font-semibold">Logout</h3>
            <p className="text-sm opacity-80 mt-1">Sign out of your account</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
