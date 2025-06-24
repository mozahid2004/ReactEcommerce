import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">
        👑 Admin Panel - {user.name}
      </h1>
      <p className="text-center text-gray-600 mb-8">
        You have <b>Admin</b> privileges.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AdminCard title="➕ Add Product" to="/admin/add-product" />
        <AdminCard title="✏️ Edit Product" to="/admin/edit-product" />
        <AdminCard title="📦 Product List" to="/admin/products" />
        <AdminCard title="🧑‍💼 Manage Users" to="/admin/users" />
        <AdminCard title="📨 Customer Orders" to="/admin/orders" />
        <AdminCard title="⚙️ Manage Orders" to="/admin/manage-orders" />
      </div>
    </div>
  );
}

function AdminCard({ title, to }) {
  return (
    <Link
      to={to}
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border hover:border-pink-500"
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </Link>
  );
}

export default AdminDashboard;
