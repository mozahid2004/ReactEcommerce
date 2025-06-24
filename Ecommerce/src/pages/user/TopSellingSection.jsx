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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔥 Top Selling Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {topSellingProducts.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TopSellingSection;
