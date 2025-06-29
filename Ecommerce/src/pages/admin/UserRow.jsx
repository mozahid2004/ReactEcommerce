import React, { useState } from 'react';
// import {
//   updateUserTags,
//   toggleNewsletter,
//   updateNotes,
// } from '../../Services/adminUserApi';
import {
  updateUserTags,
  toggleNewsletter,
  updateNotes,
} from '../../Services/adminUserApi'
// import {
//   updateUserTags,
//   toggleNewsletter,
//   updateNotes,
// } from '../../Services/adminUserApi';
const UserRow = ({ user, reloadUsers }) => {
  const token = localStorage.getItem('token');
  const [tags, setTags] = useState(user.tags?.join(', ') || '');
  const [notes, setNotes] = useState(user.notes || '');

  const handleSave = async () => {
    await updateUserTags(user._id, tags.split(',').map(t => t.trim()), token);
    await updateNotes(user._id, notes, token);
    alert('Updated!');
  };

  const handleToggleNewsletter = async () => {
    await toggleNewsletter(user._id, token);
    alert('Newsletter status toggled');
    reloadUsers();
  };

  return (
    <div className="border p-3 mb-3 rounded bg-white shadow">
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div>
        <label>Tags:</label>
        <input
          className="border p-1 ml-2 w-1/2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <label>Notes:</label>
        <textarea
          className="border p-1 ml-2 w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <button className="bg-blue-500 text-white px-3 py-1 mr-2 rounded" onClick={handleSave}>Save</button>
        <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleToggleNewsletter}>
          {user.subscribedToNewsletter ? 'Unsubscribe' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default UserRow;
