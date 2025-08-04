import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewOrder = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { product, quantity, cartItems, type } = state || {};

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const items =
    type === "single"
      ? [{ ...product, quantity: quantity || 1 }]
      : (cartItems || []).map((item) => ({
          ...item.product, // spread actual product object
          quantity: item.quantity || 1,
        }));

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const tax = +(subtotal * 0.18).toFixed(2);
  const deliveryFee = 50;
  const total = +(subtotal + tax + deliveryFee).toFixed(2);

  const handleContinue = () => {
    if (!address.name || !address.phone || !address.street) {
      alert("❌ Please fill in at least Name, Phone, and Street Address.");
      return;
    }

    navigate("/order-summary", {
      state: {
        items,
        subtotal,
        tax,
        deliveryFee,
        total,
        address,
        type,
      },
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Review Order</h2>

      <ul>
        {items.map((item, index) => (
          <li key={item._id || item.id || index} className="mb-2">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <div>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax (18%): ₹{tax}</p>
        <p>Delivery Fee: ₹{deliveryFee}</p>
        <p className="font-bold">Total: ₹{total}</p>
      </div>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pin"
          placeholder="Pincode"
          value={address.pin}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Continue to Summary
      </button>
    </div>
  );
};

export default ReviewOrder;
