import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function AllProductsOnShop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Extract categories safely
  const categories = [...new Set((products || []).map(p => p.category))];

  // ✅ Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  // ✅ Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategorySelect = category => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1); // Reset page on filter change
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 🔎 Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-800"
            } shadow hover:bg-pink-100 transition`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map(product => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full text-center border ${
              currentPage === i + 1
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-800"
            } hover:bg-pink-100 transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllProductsOnShop;
