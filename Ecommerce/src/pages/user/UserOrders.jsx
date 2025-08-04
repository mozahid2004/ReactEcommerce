import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ConfirmPopup from '../../components/ConfirmPopup.jsx';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const { token } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('❌ Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => (order.status || 'Placed') === selectedStatus
      );
      setFilteredOrders(filtered);
    }
  }, [selectedStatus, orders]);

  const handleCancel = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirm(true);
  };

  const handleCancelConfirmed = async () => {
    if (!selectedOrderId) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/order/${selectedOrderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('✅ Order cancelled');
      setShowConfirm(false);
      setSelectedOrderId(null);
      await fetchOrders();
    } catch (error) {
      console.error('❌ Cancellation failed:', error.response?.data || error.message);
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmPopup
          message="Are you sure you want to cancel this order?"
          confirmText="Yes, Cancel"
          cancelText="No"
          onConfirm={handleCancelConfirmed}
          onCancel={() => {
            setShowConfirm(false);
            setSelectedOrderId(null);
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 p-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          ✨ Your Orders
        </h2>

        {/* Filter Tabs */}
        <div className="w-full flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-xl overflow-hidden shadow-sm border">
            {[
              { label: 'All', emoji: '📋' },
              { label: 'Placed', emoji: '📦' },
              { label: 'Delivered', emoji: '✅' },
              { label: 'Cancelled', emoji: '❌' },
            ].map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setSelectedStatus(label)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-200 focus:outline-none ${
                  selectedStatus === label
                    ? 'bg-white text-purple-600 border-b-4 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No {selectedStatus !== 'All' ? selectedStatus : ''} orders found.
          </p>
        ) : (
          <div className="space-y-8 max-w-5xl mx-auto">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`rounded-3xl p-6 transition hover:scale-[1.01] border-l-4 shadow-xl ${
                  order.status === 'Cancelled'
                    ? 'bg-gradient-to-br from-red-100 via-rose-50 to-white border-red-400'
                    : order.status === 'Delivered'
                    ? 'bg-gradient-to-br from-green-100 via-emerald-50 to-white border-green-400'
                    : 'bg-gradient-to-br from-yellow-100 via-amber-50 to-white border-yellow-400'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold text-gray-800">Order ID:</span> {order._id}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold text-gray-800">Ordered on:</span>{' '}
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold text-gray-800">Payment:</span>{' '}
                      {order.paymentMethod}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold text-gray-800">Total:</span> ₹
                      {order.totalPrice}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm ${
                        order.status === 'Cancelled'
                          ? 'bg-red-200 text-red-700'
                          : order.status === 'Delivered'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {order.status === 'Cancelled'
                        ? '❌ Cancelled'
                        : order.status === 'Delivered'
                        ? '✅ Delivered'
                        : '📦 Placed'}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-white/70 backdrop-blur-sm rounded-xl shadow-inner border border-purple-200 p-2"
                    >
                      <img
                        src={item.product?.image}
                        alt={item.product?.name || 'Product'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-sm text-gray-800">
                          {item.product?.name || 'Product Name'}
                        </p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cancel Button */}
                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <div className="mt-5 text-right">
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition-transform transform hover:scale-105"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrders;
