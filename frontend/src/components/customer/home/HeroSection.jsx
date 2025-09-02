import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Hashtag Trending 2024",
      subtitle: "Tăng Tương Tác Ngay Lập Tức",
      description: "Khám phá bộ sưu tập hashtag hot nhất hiện tại, được cập nhật liên tục theo xu hướng mới nhất",
      buttonText: "Khám Phá Ngay",
      buttonLink: "/products",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      bgGradient: "from-pink-500 via-rose-500 to-purple-600",
      icon: "fas fa-fire"
    },
    {
      id: 2,
      title: "Hashtag Chuyên Nghiệp",
      subtitle: "Cho Doanh Nghiệp & Thương Hiệu",
      description: "Bộ hashtag được thiết kế chuyên nghiệp, phù hợp cho mọi ngành nghề và lĩnh vực kinh doanh",
      buttonText: "Xem Danh Mục",
      buttonLink: "/categories",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      bgGradient: "from-blue-500 via-purple-500 to-pink-500",
      icon: "fas fa-crown"
    },
    {
      id: 3,
      title: "Hashtag Cho Creator",
      subtitle: "Tối Ưu Cho Content Creator",
      description: "Hashtag được nghiên cứu kỹ lưỡng, giúp content creator tăng reach và engagement hiệu quả",
      buttonText: "Dành Cho Creator",
      buttonLink: "/creator-packages",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      bgGradient: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: "fas fa-video"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Slide Container */}
      <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] max-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} relative`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
              
              {/* Content */}
              <div className="container h-full flex items-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                  {/* Text Content */}
                  <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm sm:text-base">
                        <i className={`${slide.icon} text-lg sm:text-xl`}></i>
                        <span className="font-medium opacity-90">HashtagShop</span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/90">
                        {slide.subtitle}
                      </h2>
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center lg:justify-start pt-4">
                      <Link 
                        to={slide.buttonLink}
                        className="btn bg-white text-gray-800 hover:bg-gray-100 btn-lg px-8 py-4 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        <i className="fas fa-rocket mr-2"></i>
                        {slide.buttonText}
                      </Link>
                      
                      <Link 
                        to="/projects"
                        className="btn border-2 border-white text-white hover:bg-white hover:text-gray-800 btn-lg px-8 py-4 font-bold backdrop-blur-sm"
                      >
                        <i className="fas fa-play mr-2"></i>
                        Xem Demo
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8">
                      <div className="text-center lg:text-left">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">5000+</div>
                        <div className="text-sm sm:text-base text-white/80">Khách hàng</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">1500+</div>
                        <div className="text-sm sm:text-base text-white/80">Hashtag</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">98%</div>
                        <div className="text-sm sm:text-base text-white/80">Hài lòng</div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="hidden lg:block relative">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6 scale-105"></div>
                      <div className="absolute inset-0 bg-white/10 rounded-3xl transform -rotate-3 scale-110"></div>
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className="relative w-full h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center floating">
                        <i className={`${slide.icon} text-2xl text-white`}></i>
                      </div>
                      
                      <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-800 font-medium text-sm">
                            Trending Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all z-20 hidden sm:flex items-center justify-center"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all z-20 hidden sm:flex items-center justify-center"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-3 bg-white rounded-full'
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/30 text-white transition-all ${
            isAutoPlay ? 'bg-white/20' : 'bg-white/10'
          }`}
        >
          <i className={`fas ${isAutoPlay ? 'fa-pause' : 'fa-play'} text-sm`}></i>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2 pb-4">
          <span className="text-sm font-medium">Cuộn xuống</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;