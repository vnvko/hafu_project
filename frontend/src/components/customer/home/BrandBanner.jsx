import React, { useState, useEffect } from 'react';

const BrandBanner = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: "HaFu House",
      subtitle: "Hashtag Chất Lượng Cao #1 Việt Nam",
      description: "Chuyên cung cấp hashtag trending, giúp tăng tương tác và phát triển thương hiệu của bạn",
      buttonText: "Khám Phá Ngay",
      buttonLink: "/products",
      backgroundImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop",
      gradient: "from-pink-600/80 via-purple-600/80 to-blue-600/80"
    },
    {
      id: 2,
      title: "Hashtag Trending 2024",
      subtitle: "Cập Nhật Liên Tục Theo Xu Hướng",
      description: "Bộ sưu tập hashtag được nghiên cứu kỹ lưỡng, phù hợp với mọi ngành nghề và lĩnh vực",
      buttonText: "Xem Trending",
      buttonLink: "/trending",
      backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      gradient: "from-purple-600/80 via-pink-600/80 to-red-600/80"
    },
    {
      id: 3,
      title: "Combo Hashtag Đặc Biệt",
      subtitle: "Tiết Kiệm Đến 40% Khi Mua Combo",
      description: "Gói combo hashtag với mức giá ưu đãi, bao gồm đầy đủ hashtag cho mọi nội dung",
      buttonText: "Mua Combo",
      buttonLink: "/combo",
      backgroundImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=600&fit=crop",
      gradient: "from-emerald-600/80 via-blue-600/80 to-purple-600/80"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container">
              <div className="max-w-2xl text-white">
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white/90">
                      {slide.subtitle}
                    </h2>
                  </div>
                  
                  <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                    <a
                      href={slide.buttonLink}
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                    >
                      <i className="fas fa-rocket mr-2"></i>
                      {slide.buttonText}
                    </a>
                    
                    <a
                      href="/about"
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                    >
                      <i className="fas fa-play mr-2"></i>
                      Tìm Hiểu Thêm
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-6 sm:space-x-8 pt-4 sm:pt-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">5000+</div>
                      <div className="text-xs sm:text-sm text-white/80">Khách hàng</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">1500+</div>
                      <div className="text-xs sm:text-sm text-white/80">Hashtag</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">98%</div>
                      <div className="text-xs sm:text-sm text-white/80">Hài lòng</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl animate-pulse" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all z-20 flex items-center justify-center"
      >
        <i className="fas fa-chevron-left text-sm sm:text-base"></i>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all z-20 flex items-center justify-center"
      >
        <i className="fas fa-chevron-right text-sm sm:text-base"></i>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-6 sm:w-8 h-2 sm:h-3 bg-white rounded-full'
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm border border-white/30 text-white transition-all text-xs sm:text-sm ${
            isAutoPlay ? 'bg-white/20' : 'bg-white/10'
          }`}
          title={isAutoPlay ? 'Tạm dừng' : 'Phát tự động'}
        >
          <i className={`fas ${isAutoPlay ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
      </div>
    </section>
  );
};

export default BrandBanner;