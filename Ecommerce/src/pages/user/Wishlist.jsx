import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.wishlist);
    };
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlist.map(item => (
          <div key={item._id} className="p-4 border mb-2">
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
