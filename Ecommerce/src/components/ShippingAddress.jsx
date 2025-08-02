// // 📁 src/components/ShippingAddress.jsx
import React from 'react';

function ShippingAddress({ form, onChange }) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📮 Shipping Address</h2>

      <div className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">👤 Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">📞 Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
            placeholder="e.g. 9876543210"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">🏠 Address</label>
          <textarea
            name="addr"
            rows={3}
            value={form.addr}
            onChange={onChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
            placeholder="Street, Locality, etc."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">🏙️ City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
              placeholder="City"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">🗺️ State</label>
            <input
              type="text"
              name="st"
              value={form.st}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
              placeholder="State"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">📮 Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={onChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-pink-500 shadow-sm"
            placeholder="e.g. 110001"
          />
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
