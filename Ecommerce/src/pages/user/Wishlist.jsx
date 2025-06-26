import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data.wishlist || []);
      } catch (err) {
        console.error("❌ Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">No items in wishlist.</p>
      ) : (
        wishlist.map((item, i) => {
          const product = item.productId;
          if (!product || typeof product === 'string') return null;

          return (
            <div
              key={item._id || i}
              className="p-4 border mb-3 rounded-lg shadow bg-white flex items-center gap-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Wishlist;
