import React, { useEffect, useState } from 'react';
// import { fetchAllUsers } from '../../api/adminUserApi';
import { fetchAllUsers } from '../../Services/adminUserApi';
import { useAuth } from '../../context/AuthContext';
// import UserRow from '../../components/admin/UserRow';
import UserRow from './UserRow';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllUsers(localStorage.getItem('token'))
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('❌ Fetch error:', err));
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Customers</h2>
      {users.map((u) => (
        <UserRow key={u._id} user={u} reloadUsers={() => window.location.reload()} />
      ))}
    </div>
  );
};

export default ManageUsers;
