// src/pages/user/OrderSummary.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    items = [],
    subtotal = 0,
    tax = 0,
    deliveryFee = 0,
    total = 0,
    address = {},
    type = "single"
  } = state || {};

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        product: type === "single" ? items[0] : null,
        quantity: type === "single" ? items[0]?.quantity || 1 : null,
        cartItems: type === "multiple" ? items : null,
        type,
        address,
        total, // ✅ this was missing — now added!
        
      },
    });
  };

  console.log(total);
  

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-2">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Qty: {item.quantity || 1}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax: ₹{tax}</p>
        <p>Delivery Fee: ₹{deliveryFee}</p>
        <p className="font-bold">Total: ₹{total}</p>
      </div>
      {/* updated code */}
      <div className="mt-4">
        <h3 className="font-semibold">Shipping Address:</h3>
        <p>{address.name}</p>
        <p>{address.street}, {address.city}</p>
        <p>{address.state} - {address.pin}</p>
        <p>Phone: {address.phone}</p>
      </div>
{/* till hare */}
      <button
        onClick={handlePayment}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Continue to Pay
      </button>
    </div>
  );
};

export default OrderSummary;
