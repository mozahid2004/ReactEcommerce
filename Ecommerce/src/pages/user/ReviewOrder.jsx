import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShippingAddress from '../../components/ShippingAddress';
import axios from 'axios';

function ReviewOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity: initialQty, cartItems, type } = location.state || {};

  const [items, setItems] = useState([]);
  const [taxRate] = useState(0.05);
  const [deliveryFee] = useState(40);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // ✅ Use this one consistent state
  const [shippingForm, setShippingForm] = useState({
    name: '',
    mobile: '',
    addr: '',
    city: '',
    st: '',
    pincode: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (type === 'single' && product) {
      setItems([{ product, quantity: initialQty || 1 }]);
    } else if (type === 'multiple' && Array.isArray(cartItems)) {
      const valid = cartItems.filter((item) => item?.product && typeof item.product === 'object');
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

  const handlePlaceOrder = async () => {
    const { name, mobile, addr, city, st, pincode } = shippingForm;

    if (!name || !mobile || !addr || !city || !st || !pincode) {
      alert('❌ Please fill all required address fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/user/address',
        {
          name,
          mobile,
          address: {
            street: addr,
            city,
            state: st,
            postalCode: pincode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Address saved successfully');

      const shippingAddress = {
        name,
        mobile,
        address: addr,
        city,
        state: st,
        pincode,
      };

      const payload =
        type === 'single'
          ? {
            product: items[0].product,
            quantity: items[0].quantity,
            subtotal,
            total,
            deliveryFee,
            tax: subtotal * taxRate,
            shippingAddress,
          }
          : {
            cartItems: items,
            subtotal,
            total,
            deliveryFee,
            tax: subtotal * taxRate,
            shippingAddress,
          };

      navigate('/order-summary', { state: payload });
    } catch (err) {
      console.error('❌ Error saving address:', err);
      alert('Something went wrong while saving address.');
    }
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
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🚚 Shipping Address */}
      <ShippingAddress form={shippingForm} onChange={handleShippingChange} />

      {/* 💵 Bill Summary */}
      <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-md">
        <h4 className="text-xl font-semibold mb-4">💰 Bill Summary</h4>

        {/* 🛍️ List of Products */}
        <ul className="mb-4 space-y-2 text-gray-700 text-sm">
          {items.map((item, index) => {
            const price = item.product.price;
            const qty = item.quantity;
            const totalPerItem = price * qty;

            return (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-gray-500">
                    ₹{price.toFixed(2)} × {qty} = ₹{totalPerItem.toFixed(2)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* 💰 Cost Totals */}
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </li>
          <li className="flex justify-between">
            <span>Tax (5%):</span>
            <span>₹{(subtotal * taxRate).toFixed(2)}</span>
          </li>
          <li className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </li>
          <li className="flex justify-between font-bold text-lg text-gray-800 border-t pt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </li>
        </ul>
      </div>


      {/* ✅ Place Order */}
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
