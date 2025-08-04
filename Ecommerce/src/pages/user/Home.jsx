import React from "react";
import { motion } from "framer-motion";
import TopSellingSection from "./TopSellingSection";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* 🎯 Main Gradient Background and Layout */}
      <div className="bg-gradient-to-b from-red-100 to-white min-h-screen px-4 py-16 select-none">

        {/* 🏠 Hero Section with Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pointer-events-none"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 drop-shadow">
            Welcome to <span className="text-gray-900">SR Collection 🎁</span>
          </h1>
          <p className="text-gray-700 mt-4 text-lg md:text-xl">
            Unique gifts for every mood, moment & memory.
          </p>
          <div className="mt-6 pointer-events-auto">
            <Link
              to="/shop"
              className="px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition duration-300 inline-block"
            >
              Shop Now
            </Link>
          </div>

        </motion.div>

        {/* 🗂️ Featured Categories Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Birthday Gifts", emoji: "🎂", color: "bg-red-100" },
            { title: "Home Decor", emoji: "🏠", color: "bg-rose-100" },
            { title: "Personalized", emoji: "🖋️", color: "bg-red-200" },
            { title: "Surprise Boxes", emoji: "📦", color: "bg-pink-200" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 text-center shadow-lg cursor-pointer ${item.color}`}
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* 💥 Promotional Banner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-red-500 to-red-700 text-white text-center py-10 px-6 rounded-2xl shadow-xl pointer-events-none"
        >
          <h2 className="text-3xl font-bold mb-2">🎉 Limited Time Offer!</h2>
          <p className="text-lg">
            Get 20% off on your first order. Use code: <strong>WELCOME20</strong>
          </p>
        </motion.div>

        {/* 🔝 Top Selling Products Section */}
        <div className="pointer-events-auto">
          <TopSellingSection />
        </div>
      </div>
    </>
  );
}

export default Home;
