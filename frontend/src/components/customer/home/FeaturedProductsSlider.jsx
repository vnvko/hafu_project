import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FeaturedProductsSlider = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Hashtag Marketing Pro 2024",
      price: 299000,
      originalPrice: 399000,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
      rating: 4.9,
      totalSold: 1250,
      category: "Marketing",
      tags: ["trending", "viral"],
      isHot: true,
      isNew: false
    },
    {
      id: 2,
      name: "Hashtag Thời Trang Trendy",
      price: 199000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
      rating: 4.7,
      totalSold: 890,
      category: "Fashion",
      tags: ["fashion", "style"],
      isHot: false,
      isNew: true
    },
    {
      id: 3,
      name: "Hashtag F&B Premium",
      price: 249000,
      originalPrice: 329000,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
      rating: 4.8,
      totalSold: 2100,
      category: "Food",
      tags: ["food", "restaurant"],
      isHot: true,
      isNew: false
    },
    {
      id: 4,
      name: "Hashtag Du Lịch Explorer",
      price: 179000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop",
      rating: 4.6,
      totalSold: 675,
      category: "Travel",
      tags: ["travel", "adventure"],
      isHot: false,
      isNew: true
    },
    {
      id: 5,
      name: "Hashtag Beauty & Skincare",
      price: 319000,
      originalPrice: 429000,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
      rating: 4.9,
      totalSold: 1456,
      category: "Beauty",
      tags: ["beauty", "skincare"],
      isHot: true,
      isNew: false
    },
    {
      id: 6,
      name: "Hashtag Tech Innovation",
      price: 229000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      rating: 4.7,
      totalSold: 834,
      category: "Technology",
      tags: ["tech", "gadgets"],
      isHot: false,
      isNew: false
    },
    {
      id: 7,
      name: "Hashtag Fitness & Health",
      price: 189000,
      originalPrice: 259000,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      rating: 4.5,
      totalSold: 567,
      category: "Fitness",
      tags: ["fitness", "health"],
      isHot: false,
      isNew: true
    },
    {
      id: 8,
      name: "Hashtag Education Hub",
      price: 159000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      rating: 4.6,
      totalSold: 423,
      category: "Education",
      tags: ["education", "learning"],
      isHot: false,
      isNew: false
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = featuredProducts.length - getVisibleCount();
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, featuredProducts.length]);

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 768) return 3;
    if (window.innerWidth < 1024) return 4;
    return 5;
  };

  const nextSlide = () => {
    const maxIndex = featuredProducts.length - getVisibleCount();
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxIndex = featuredProducts.length - getVisibleCount();
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400 text-xs"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400 text-xs"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-300 text-xs"></i>);
      }
    }
    return stars;
  };

  const discountPercentage = (product) => {
    if (!product.originalPrice) return null;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <section className={`py-6 sm:py-8 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              darkMode ? 'text-white' : 'text-gradient-pink'
            }`}>
              <i className="fas fa-star mr-2"></i>
              Sản Phẩm Nổi Bật
            </h2>
            <p className={`text-sm sm:text-base mt-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hashtag được yêu thích nhất
            </p>
          </div>
          <Link 
            to="/products"
            className={`text-sm font-medium transition-colors ${
              darkMode 
                ? 'text-pink-400 hover:text-pink-300' 
                : 'text-pink-600 hover:text-pink-700'
            }`}
          >
            Xem tất cả
            <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / getVisibleCount())}%)`,
                width: `${(featuredProducts.length / getVisibleCount()) * 100}%`
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="px-2"
                  style={{ width: `${100 / featuredProducts.length}%` }}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-white hover:bg-gray-50'
                    } rounded-xl shadow-md hover:shadow-xl border ${
                      darkMode ? 'border-gray-600' : 'border-gray-100'
                    }`}>
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 sm:h-36 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                          {product.isNew && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              NEW
                            </span>
                          )}
                          {product.isHot && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                              HOT
                            </span>
                          )}
                          {discountPercentage(product) && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              -{discountPercentage(product)}%
                            </span>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex flex-col space-y-1">
                            <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full text-gray-700 hover:text-pink-600 transition-all shadow-md">
                              <i className="fas fa-heart text-xs"></i>
                            </button>
                            <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full text-gray-700 hover:text-blue-600 transition-all shadow-md">
                              <i className="fas fa-eye text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        {/* Category */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode 
                              ? 'bg-gray-600 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {product.category}
                          </span>
                          <div className="flex space-x-0.5">
                            {renderStars(product.rating)}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-sm font-medium mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {product.name}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className={`text-xs px-2 py-0.5 rounded-full ${
                              darkMode 
                                ? 'bg-pink-500/20 text-pink-300' 
                                : 'bg-pink-100 text-pink-600'
                            }`}>
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Rating & Sales */}
                        <div className={`flex items-center justify-between text-xs mb-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <span>({product.rating})</span>
                          <span>Đã bán {product.totalSold}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-pink-600">
                              {product.price.toLocaleString('vi-VN')}đ
                            </div>
                            {product.originalPrice && (
                              <div className={`text-xs line-through ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {product.originalPrice.toLocaleString('vi-VN')}đ
                              </div>
                            )}
                          </div>
                          <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105">
                            <i className="fas fa-cart-plus mr-1"></i>
                            Thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full shadow-lg transition-all hover:scale-110 z-10 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full shadow-lg transition-all hover:scale-110 z-10 ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
            }`}
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(featuredProducts.length / getVisibleCount()) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                Math.floor(currentIndex / getVisibleCount()) === index
                  ? 'w-6 h-2 bg-pink-500 rounded-full'
                  : darkMode
                    ? 'w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-scroll Indicator */}
        <div className="flex justify-center mt-3">
          <div className={`text-xs flex items-center space-x-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <i className={`fas fa-play text-xs ${isHovered ? 'opacity-50' : 'opacity-100'}`}></i>
            <span>Tự động chuyển</span>
            {isHovered && <span>(Đã tạm dừng)</span>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSlider;