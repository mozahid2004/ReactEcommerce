import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/products/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Search Results for: <span className="text-pink-600">"{query}"</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map(product => (
            <div key={product._id} className="border rounded-lg shadow hover:shadow-lg transition duration-300 p-4 bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
