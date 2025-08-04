import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product.rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-red-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${product._id}`} className="block w-full max-w-[260px]">
      <div
        className="bg-white shadow-md hover:shadow-xl transform hover:scale-[1.03] transition duration-300 flex flex-col overflow-hidden h-full"
        style={{ minWidth: "160px", width: "100%" }}
      >
        {/* 🖼️ Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover"
        />

        {/* 📦 Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* 🏷️ Name */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {product.name}
          </h3>

          {/* 📝 Description */}
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* ⭐ Rating */}
          <div className="flex items-center text-sm mb-2">
            {renderStars()}
            <span className="ml-2 text-gray-500">({product.rating || 0})</span>
          </div>

          {/* 💰 Price */}
          <p className="text-red-600 font-bold text-lg mt-auto">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
