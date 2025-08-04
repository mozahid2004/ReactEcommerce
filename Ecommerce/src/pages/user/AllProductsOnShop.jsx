import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function AllProductsOnShop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

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

  const categories = [...new Set((products || []).map(p => p.category))];

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategorySelect = category => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* 🔎 Filter Section */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "bg-red-500 text-white"
                : "bg-white text-gray-800"
            } shadow hover:bg-red-100 transition`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 justify-center">
        {currentProducts.map(product => (
          <div key={product._id || product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* 📄 Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full text-center border ${
              currentPage === i + 1
                ? "bg-red-500 text-white"
                : "bg-white text-gray-800"
            } hover:bg-red-100 transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllProductsOnShop;
