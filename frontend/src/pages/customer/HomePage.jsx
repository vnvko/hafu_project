import React from 'react';
import BrandBanner from '../../components/customer/home/BrandBanner';
import PromotionSlider from '../../components/customer/home/PromotionSlider';
import FeaturedProductsSlider from '../../components/customer/home/FeaturedProductsSlider';
import CategoryProductsSection from '../../components/customer/home/CategoryProductsSection';

const HomePage = ({ darkMode }) => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Hashtag Trending Nhất Tháng 8/2024",
      excerpt: "Khám phá những hashtag đang viral và cách sử dụng hiệu quả để tăng tương tác...",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      date: "20/08/2024",
      readTime: "5 phút đọc",
      author: "HaFu Team",
      category: "Trending"
    },
    {
      id: 2,
      title: "Cách Tăng Engagement Với Hashtag Hiệu Quả",
      excerpt: "Bí quyết sử dụng hashtag để tăng tương tác và thu hút khách hàng tiềm năng...",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      date: "18/08/2024",
      readTime: "7 phút đọc",
      author: "Marketing Expert",
      category: "Tips"
    },
    {
      id: 3,
      title: "Xu Hướng Social Media Marketing 2024",
      excerpt: "Những xu hướng mới trong marketing social media và vai trò của hashtag...",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
      date: "15/08/2024",
      readTime: "6 phút đọc",
      author: "Social Media Guru",
      category: "Strategy"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Banner thương hiệu shop */}
      <BrandBanner darkMode={darkMode} />

      {/* 2. Slider combo/khuyến mãi chuyển động */}
      <PromotionSlider darkMode={darkMode} />

      {/* 3. Sản phẩm nổi bật (slider tự động) */}
      <FeaturedProductsSlider darkMode={darkMode} />

      {/* 4. Hashtag theo danh mục (3-4 danh mục chính) */}
      <CategoryProductsSection darkMode={darkMode} />

      {/* 5. Blog tin tức */}
      <section className={`py-8 sm:py-12 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gradient-pink'
            }`}>
              <i className="fas fa-blog mr-3"></i>
              Blog & Tin Tức
            </h2>
            <p className={`text-base sm:text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Cập nhật xu hướng hashtag và tips marketing mới nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-md hover:shadow-lg'
              } rounded-2xl overflow-hidden`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      darkMode 
                        ? 'bg-gray-800/80 text-white' 
                        : 'bg-white/90 text-gray-800'
                    }`}>
                      <i className="fas fa-clock mr-1"></i>
                      {post.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className={`flex items-center justify-between text-xs mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>
                      <i className="fas fa-calendar mr-1"></i>
                      {post.date}
                    </span>
                    <span>
                      <i className="fas fa-user mr-1"></i>
                      {post.author}
                    </span>
                  </div>
                  
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  
                  <button className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm group-hover:underline transition-all">
                    Đọc thêm
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <a 
              href="/blog" 
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                  : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
              }`}
            >
              <i className="fas fa-newspaper mr-3"></i>
              Xem Thêm Bài Viết
              <i className="fas fa-arrow-right ml-3"></i>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Đăng ký nhận tin tức */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                <i className="fas fa-envelope mr-3"></i>
                Đăng Ký Nhận Tin Tức
              </h2>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                Nhận thông tin về hashtag trending, tips marketing và ưu đãi đặc biệt từ HaFu House
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                />
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg">
                  <i className="fas fa-paper-plane mr-2"></i>
                  Đăng Ký Ngay
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
                <span className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  Hashtag trending hàng tuần
                </span>
                <span className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  Tips marketing hiệu quả
                </span>
                <span className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  Ưu đãi đặc biệt
                </span>
                <span className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i>
                  Miễn phí 100%
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">5000+</div>
                <div className="text-white/80 text-sm sm:text-base">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80 text-sm sm:text-base">Bài viết/tháng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-white/80 text-sm sm:text-base">Hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 text-sm sm:text-base">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      </section>
    </div>
  );
};

export default HomePage;