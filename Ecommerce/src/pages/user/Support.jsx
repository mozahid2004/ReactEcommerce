import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeadset } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-16 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-full mb-4 animate-bounce">
          <FaHeadset size={32} />
        </div>
        <h1 className="text-5xl font-bold text-indigo-700 mb-3">Support Center</h1>
        <p className="text-lg text-gray-700">
          Need help? We're here to assist you with any questions or issues.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-4 mb-4">
            <FaEnvelope className="text-indigo-600 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Email Support</h2>
          </div>
          <p className="text-gray-600 mb-2">Reach us anytime via email:</p>
          <a href="mailto:support@yourdomain.com" className="text-indigo-600 underline font-medium">
            support@yourdomain.com
          </a>
        </div>

        {/* Phone Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300">
          <div className="flex items-center gap-4 mb-4">
            <FaPhoneAlt className="text-indigo-600 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Call Us</h2>
          </div>
          <p className="text-gray-600 mb-2">Available 9 AM – 6 PM (Mon–Sat)</p>
          <span className="text-indigo-600 font-medium">+91-9876543210</span>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300 sm:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <FaMapMarkerAlt className="text-indigo-600 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Visit Us</h2>
          </div>
          <p className="text-gray-600">
            123 Main Street, Near City Mall, Mumbai, Maharashtra, India - 400001
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
