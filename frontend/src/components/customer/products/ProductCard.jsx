import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, layout = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating = 4.5,
    totalSold = 0,
    discount,
    category,
    tags = [],
    isNew = false,
    isHot = false,
    isBestSeller = false
  } = product;

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Handle add to cart logic
    console.log('Added to cart:', product);
  };

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-300"></i>);
      }
    }
    return stars;
  };

  if (layout === 'list') {
    return (
      <Link to={`/products/${id}`} className="product-card flex p-3 sm:p-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && <div className="absolute inset-0 loading rounded-lg"></div>}
          
          {/* Badges */}
          <div className="absolute top-1 left-1 flex flex-col space-y-1">
            {isNew && <span className="badge-new text-xs px-1.5 py-0.5">NEW</span>}
            {isHot && <span className="badge-hot text-xs px-1.5 py-0.5">HOT</span>}
            {discountPercentage && (
              <span className="badge bg-red-500 text-white text-xs px-1.5 py-0.5">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 ml-3 space-y-1">
          <h3 className="product-title text-sm font-medium">{name}</h3>
          
          <div className="flex items-center space-x-1 text-xs">
            {renderRatingStars()}
            <span className="text-gray-500">({rating})</span>
          </div>

          <p className="text-xs text-gray-500">Đã bán {totalSold}</p>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="product-price text-sm font-bold">
                {price.toLocaleString('vi-VN')}đ
              </div>
              {originalPrice && (
                <div className="product-price-old text-xs">
                  {originalPrice.toLocaleString('vi-VN')}đ
                </div>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="btn-primary btn-xs px-2 py-1 text-xs"
            >
              <i className="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="product-card group">
      <Link to={`/products/${id}`} className="block">
        {/* Image Container */}
        <div className="relative mb-2 sm:mb-3">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="product-image"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && <div className="absolute inset-0 loading"></div>}
          </div>

          {/* Badges */}
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex flex-col space-y-1">
            {isNew && <span className="badge-new text-xs px-1.5 py-0.5">NEW</span>}
            {isHot && <span className="badge-hot text-xs px-1.5 py-0.5">HOT</span>}
            {isBestSeller && (
              <span className="badge bg-purple-500 text-white text-xs px-1.5 py-0.5">
                <i className="fas fa-crown mr-1"></i>BEST
              </span>
            )}
            {discountPercentage && (
              <span className="badge bg-red-500 text-white text-xs px-1.5 py-0.5 font-bold">
                -{discountPercentage}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col space-y-1">
              <button
                onClick={handleWishlistToggle}
                className={`w-8 h-8 rounded-full backdrop-blur-sm border transition-all hover:scale-110 ${
                  isWishlisted 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'bg-white/80 text-gray-600 border-white/50 hover:text-pink-500'
                }`}
              >
                <i className={`fas fa-heart text-xs`}></i>
              </button>
              <button className="w-8 h-8 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full text-gray-600 hover:text-blue-500 transition-all hover:scale-110">
                <i className="fas fa-eye text-xs"></i>
              </button>
            </div>
          </div>

          {/* Add to Cart Button - Mobile */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:hidden">
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 bg-pink-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <i className="fas fa-plus text-xs"></i>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="card-body-compact space-y-1 sm:space-y-2">
          {/* Category */}
          {category && (
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              <i className="fas fa-tag mr-1"></i>{category}
            </p>
          )}

          {/* Title */}
          <h3 className="product-title text-xs sm:text-sm leading-tight">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-xs">
            <div className="flex space-x-0.5">
              {renderRatingStars()}
            </div>
            <span className="text-gray-500">({rating})</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">Đã bán {totalSold}</span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="badge-primary text-xs px-1.5 py-0.5">
                  #{tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-gray-400">+{tags.length - 2}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="product-price text-sm sm:text-base font-bold">
                {price.toLocaleString('vi-VN')}đ
              </div>
              {originalPrice && (
                <div className="product-price-old text-xs">
                  {originalPrice.toLocaleString('vi-VN')}đ
                </div>
              )}
            </div>

            {/* Add to Cart Button - Desktop */}
            <button
              onClick={handleAddToCart}
              className="hidden sm:flex btn-primary btn-sm px-3 py-1.5 text-xs items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all"
            >
              <i className="fas fa-cart-plus"></i>
              <span>Thêm</span>
            </button>
          </div>

          {/* Mobile Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="sm:hidden btn-primary w-full py-2 text-xs font-medium mt-2"
          >
            <i className="fas fa-cart-plus mr-2"></i>
            Thêm vào giỏ hàng
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;