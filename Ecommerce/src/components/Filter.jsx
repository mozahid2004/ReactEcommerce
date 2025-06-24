// src/components/Filter.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../pages/user/ProductCard';

const Filter = ({ searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/search?q=${encodeURIComponent(searchTerm)}`);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim()) {
      fetchFilteredProducts();
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl mb-4">
        Showing results for <span className="text-pink-600">"{searchTerm}"</span>
      </h2>

      {loading ? (
        <p className="text-gray-500">Searching...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Filter;
