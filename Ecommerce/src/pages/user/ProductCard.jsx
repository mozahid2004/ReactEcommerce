import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const renderStars = () => {
    const stars = [];
    const rating = Math.round(product.rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-[260px] bg-white shadow-md hover:shadow-xl transition duration-300 p-4 overflow-hidden h-full hover:scale-105 transform">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover mb-3"
        />

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {renderStars()}
          <span className="ml-2 text-sm text-gray-600">({product.rating || 0})</span>
        </div>

        {/* Price */}
        <p className="text-pink-600 font-semibold text-lg mt-2">₹{product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
