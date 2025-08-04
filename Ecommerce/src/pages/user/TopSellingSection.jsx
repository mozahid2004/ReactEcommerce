import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const TopSellingSection = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const products = res.data;
        const filtered = products.filter(p => p.topSelling === true);
        setTopSellingProducts(filtered);
      } catch (err) {
        console.error("❌ Error fetching top selling products:", err);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center drop-shadow-sm">
        🔥 Top Selling Products
      </h2>

      {topSellingProducts.length === 0 ? (
        <p className="text-center text-gray-500">No top-selling products found.</p>
      ) : (
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-y-5 
          gap-x-3 
          sm:gap-x-4 
          md:gap-x-5
        ">
          {topSellingProducts.map(product => (
            <div key={product._id || product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSellingSection;
