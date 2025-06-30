import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReviewOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity: initialQty, cartItems, type } = location.state || {};

  const [items, setItems] = useState([]);
  const [taxRate] = useState(0.05);
  const [deliveryFee] = useState(40);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // 🆕 Shipping address state
  const [address, setAddress] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });

  // 🆕 Input handler
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (type === 'single' && product) {
      setItems([{ product, quantity: initialQty || 1 }]);
    } else if (type === 'multiple' && Array.isArray(cartItems)) {
      const valid = cartItems.filter(
        (item) => item?.product && typeof item.product === 'object'
      );
      setItems(valid);
    }
  }, [product, initialQty, cartItems, type]);

  useEffect(() => {
    const sub = items.reduce(
      (acc, item) => acc + (item.quantity || 0) * (item.product?.price || 0),
      0
    );
    setSubtotal(sub);
    setTotal(sub + sub * taxRate + deliveryFee);
  }, [items]);

  const handleQtyChange = (index, value) => {
    const updated = [...items];
    updated[index].quantity = Math.max(1, parseInt(value) || 1);
    setItems(updated);
  };

  const handlePlaceOrder = () => {
    if (!items.length) return;
  
    const { name, mobile, address: addr, city, state: st, pincode } = address;
    if (!name || !mobile || !addr || !city || !st || !pincode) {
      alert('❌ Please fill all required address fields');
      return;
    }

    const payload =
      type === 'single'
        ? {
            product: items[0].product,
            quantity: items[0].quantity,
            subtotal,
            total,
            deliveryFee,
            tax: subtotal * taxRate,
            shippingAddress: address, // 🆕 added
          }
        : {
            cartItems: items,
            subtotal,
            total,
            deliveryFee,
            tax: subtotal * taxRate,
            shippingAddress: address, // 🆕 added
          };


    navigate('/order-summary', { state: payload });
  };
  

  if (!items.length) {
    return (
      <div className="text-center py-20 text-red-500">
        ❌ No products to review
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
        📝 Review Your Order
      </h2>

      {/* 🛒 Products */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex gap-6 items-center"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-28 h-28 object-contain rounded-xl bg-gray-100"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.product.description?.slice(0, 100)}
              </p>
              <p className="text-pink-600 font-bold mt-1">
                ₹{item.product.price}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQtyChange(index, e.target.value)
                  }
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🆕 Shipping Address */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          📦 Shipping Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={address.name} onChange={handleAddressChange} placeholder="Full Name" className="input" />
          <input name="mobile" value={address.mobile} onChange={handleAddressChange} placeholder="Mobile Number" className="input" />
          <input name="address" value={address.address} onChange={handleAddressChange} placeholder="Full Address" className="input" />
          <input name="landmark" value={address.landmark} onChange={handleAddressChange} placeholder="Landmark (optional)" className="input" />
          <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" className="input" />
          <input name="state" value={address.state} onChange={handleAddressChange} placeholder="State" className="input" />
          <input name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder="Pincode" className="input" />
        </div>
      </div>

      {/* 💵 Bill Summary */}
      <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md">
        <h4 className="text-xl font-semibold mb-4">💰 Bill Summary</h4>
        <ul className="space-y-2 text-gray-700">
          <li>Subtotal: ₹{subtotal.toFixed(2)}</li>
          <li>Tax (5%): ₹{(subtotal * taxRate).toFixed(2)}</li>
          <li>Delivery Fee: ₹{deliveryFee.toFixed(2)}</li>
          <li className="font-bold text-lg text-gray-800">
            Total: ₹{total.toFixed(2)}
          </li>
        </ul>
      </div>

      {/* 🚚 Place Order */}
      <div className="text-center mt-10">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full shadow-md transition"
        >
          🚚 Place Order
        </button>
      </div>
    </div>
  );
}

export default ReviewOrder;
