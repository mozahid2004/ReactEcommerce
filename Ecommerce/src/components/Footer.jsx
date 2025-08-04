import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400">SR Colllection</h2>
          <p className="mt-2 text-sm text-gray-300">
            Unique gifts & miscellaneous treasures curated with love. Your one-stop surprise shop.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Care</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
            <li><a href="/returns" className="hover:text-white">Return Policy</a></li>
            <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
            <li><a href="/track-order" className="hover:text-white">Track Order</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@giftnest.com</p>
          <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-300 mt-2">Follow us:</p>
          <div className="flex space-x-3 mt-1">
            <a href="#" className="hover:text-pink-400">Facebook</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} GiftNest. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
