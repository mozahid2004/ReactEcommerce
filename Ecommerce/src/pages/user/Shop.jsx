import React from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../../components/Filter.jsx';
import AllProductsOnShop from './AllProductsOnShop';

/**
 * Shop page handles rendering either:
 * - filtered product view if searchTerm is present in URL
 * - all products listing if no search term
 */
const Shop = () => {
  // Get query string from URL (e.g. ?search=cake)
  const { search } = useLocation();

  // Parse search parameters
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('search');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {searchTerm ? `🔍 Results for "${searchTerm}"` : '🛍️ Explore Our Products'}
      </h2>

      {/* Conditional rendering based on presence of ?search= */}
      {searchTerm ? (
        <Filter searchTerm={searchTerm} />
      ) : (
        <AllProductsOnShop />
      )}
    </div>
  );
};

export default Shop;
