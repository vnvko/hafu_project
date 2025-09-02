import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PromotionSlider = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotions = [
    {
      id: 1,
      title: "COMBO HASHTAG ĐẶC BIỆT",
      subtitle: "MUA 10 HASHTAG TẶNG 5 HASHTAG",
      description: "Combo siêu tiết kiệm cho các shop online",
      discount: "Giảm 40%",
      originalPrice: "299.000đ",
      salePrice: "179.000đ",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      gradient: "from-red-500 to-pink-500",
      badge: "HOT",
      link: "/combo-special"
    },
    {
      id: 2,
      title: "HASHTAG TRENDING 2024",
      subtitle: "BỘ SƯU TẬP HOT NHẤT NĂM",
      description: "Hashtag được cập nhật theo xu hướng mới nhất",
      discount: "Giảm 30%",
      originalPrice: "199.000đ",
      salePrice: "139.000đ",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-purple-500",
      badge: "NEW",
      link: "/trending-2024"
    },
    {
      id: 3,
      title: "HASHTAG DOANH NGHIỆP",
      subtitle: "CHUYÊN NGHIỆP - UY TÍN",
      description: "Dành riêng cho doanh nghiệp và thương hiệu lớn",
      discount: "Giảm 25%",
      originalPrice: "499.000đ",
      salePrice: "374.000đ",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      gradient: "from-emerald-500 to-teal-500",
      badge: "VIP",
      link: "/enterprise"
    },
    {
      id: 4,
      title: "HASHTAG CREATOR",
      subtitle: "TĂNG REACH & ENGAGEMENT",
      description: "Bộ hashtag tối ưu cho content creator",
      discount: "Giảm 35%",
      originalPrice: "159.000đ",
      salePrice: "103.000đ",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-500",
      badge: "SALE",
      link: "/creator-package"
    },
    {
      id: 5,
      title: "HASHTAG THỜI TRANG",
      subtitle: "STYLE & FASHION TRENDS",
      description: "Hashtag chuyên dụng cho ngành thời trang",
      discount: "Giảm 20%",
      originalPrice: "229.000đ",
      salePrice: "183.000đ",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      gradient: "from-pink-500 to-rose-500",
      badge: "BEST",
      link: "/fashion-hashtag"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'HOT': return 'bg-red-500';
      case 'NEW': return 'bg-green-500';
      case 'VIP': return 'bg-purple-500';
      case 'SALE': return 'bg-orange-500';
      case 'BEST': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className={`py-6 sm:py-8 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gradient-pink'
          }`}>
            <i className="fas fa-fire mr-2"></i>
            Khuyến Mãi Hot
          </h2>
          <p className={`text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ưu đãi đặc biệt - Chỉ có tại HaFu House
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promotions.map((promo, index) => (
                <div
                  key={promo.id}
                  className="w-full flex-shrink-0"
                >
                  <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-r ${promo.gradient} rounded-2xl overflow-hidden`}>
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{ backgroundImage: `url(${promo.image})` }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          {/* Text Content */}
                          <div className="text-white space-y-3 sm:space-y-4">
                            <div className="flex items-center space-x-3">
                              <span className={`${getBadgeColor(promo.badge)} text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse`}>
                                {promo.badge}
                              </span>
                              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                                {promo.discount}
                              </span>
                            </div>
                            
                            <div>
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                                {promo.title}
                              </h3>
                              <h4 className="text-sm sm:text-base md:text-lg font-medium text-white/90">
                                {promo.subtitle}
                              </h4>
                            </div>
                            
                            <p className="text-xs sm:text-sm md:text-base text-white/80">
                              {promo.description}
                            </p>

                            <div className="flex items-center space-x-4">
                              <div className="text-2xl sm:text-3xl font-bold">
                                {promo.salePrice}
                              </div>
                              <div className="text-sm sm:text-base text-white/70 line-through">
                                {promo.originalPrice}
                              </div>
                            </div>

                            <Link
                              to={promo.link}
                              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                            >
                              <i className="fas fa-shopping-cart mr-2"></i>
                              Mua Ngay
                            </Link>
                          </div>

                          {/* Image */}
                          <div className="hidden md:block">
                            <div className="relative">
                              <img 
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-40 object-cover rounded-xl shadow-2xl"
                              />
                              <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                                <i className="fas fa-percent text-2xl text-white"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-6 sm:w-8 h-2 sm:h-3 bg-pink-500 rounded-full'
                    : darkMode
                      ? 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 rounded-full hover:bg-gray-500'
                      : 'w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className={`mt-2 h-1 rounded-full overflow-hidden ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / promotions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Link
            to="/combo"
            className={`p-3 sm:p-4 rounded-xl text-center transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md border border-gray-100'
            }`}
          >
            <i className="fas fa-gift text-xl sm:text-2xl text-pink-500 mb-2"></i>
            <div className="text-xs sm:text-sm font-medium">Combo Hot</div>
          </Link>
          
          <Link
            to="/trending"
            className={`p-3 sm:p-4 rounded-xl text-center transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md border border-gray-100'
            }`}
          >
            <i className="fas fa-fire text-xl sm:text-2xl text-orange-500 mb-2"></i>
            <div className="text-xs sm:text-sm font-medium">Trending</div>
          </Link>
          
          <Link
            to="/flash-sale"
            className={`p-3 sm:p-4 rounded-xl text-center transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md border border-gray-100'
            }`}
          >
            <i className="fas fa-bolt text-xl sm:text-2xl text-yellow-500 mb-2"></i>
            <div className="text-xs sm:text-sm font-medium">Flash Sale</div>
          </Link>
          
          <Link
            to="/new-arrival"
            className={`p-3 sm:p-4 rounded-xl text-center transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md border border-gray-100'
            }`}
          >
            <i className="fas fa-sparkles text-xl sm:text-2xl text-purple-500 mb-2"></i>
            <div className="text-xs sm:text-sm font-medium">Mới Nhất</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionSlider;