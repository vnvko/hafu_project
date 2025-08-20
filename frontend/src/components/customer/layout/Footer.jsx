import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Dự án', path: '/projects' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  const supportLinks = [
    { name: 'Câu hỏi thường gặp', path: '/faq' },
    { name: 'Hướng dẫn sử dụng', path: '/guide' },
    { name: 'Chính sách giao hàng', path: '/shipping' },
    { name: 'Chính sách đổi trả', path: '/return' },
    { name: 'Chính sách bảo mật', path: '/privacy' },
  ];

  const categories = [
    { name: 'Hashtag Thời Trang', path: '/category/fashion' },
    { name: 'Hashtag Ẩm Thực', path: '/category/food' },
    { name: 'Hashtag Du Lịch', path: '/category/travel' },
    { name: 'Hashtag Làm Đẹp', path: '/category/beauty' },
    { name: 'Hashtag Công Nghệ', path: '/category/tech' },
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#', color: 'hover:text-blue-500', name: 'Facebook' },
    { icon: 'fab fa-instagram', url: '#', color: 'hover:text-pink-500', name: 'Instagram' },
    { icon: 'fab fa-tiktok', url: '#', color: 'hover:text-gray-800', name: 'TikTok' },
    { icon: 'fab fa-youtube', url: '#', color: 'hover:text-red-500', name: 'YouTube' },
  ];

  return (
    <footer className={`mt-auto border-t transition-colors ${
      darkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white/90 backdrop-blur-md border-pink-100'
    }`}>
      {/* Main Footer Content */}
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h3 className={`text-lg font-bold ${
                  darkMode ? 'text-pink-400' : 'text-gradient-pink'
                }`}>
                  HaFu House
                </h3>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Hashtag chất lượng cao
                </p>
              </div>
            </Link>
            
            <p className={`text-sm leading-relaxed mb-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Chuyên cung cấp hashtag chất lượng cao, giúp tăng tương tác và phát triển thương hiệu của bạn trên các nền tảng social media.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className={`flex items-center text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-phone text-pink-500 mr-3 w-4"></i>
                <span>0123.456.789</span>
              </div>
              <div className={`flex items-center text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-envelope text-pink-500 mr-3 w-4"></i>
                <span>info@hafuhouse.com</span>
              </div>
              <div className={`flex items-start text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-map-marker-alt text-pink-500 mr-3 w-4 mt-0.5"></i>
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } ${social.color}`}
                  title={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <i className="fas fa-link mr-2 text-pink-500"></i>
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`text-sm transition-all hover:pl-2 duration-200 ${
                      darkMode 
                        ? 'text-gray-300 hover:text-pink-400' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    <i className="fas fa-chevron-right mr-2 text-xs"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <i className="fas fa-tags mr-2 text-pink-500"></i>
              Danh mục
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link 
                    to={category.path} 
                    className={`text-sm transition-all hover:pl-2 duration-200 ${
                      darkMode 
                        ? 'text-gray-300 hover:text-pink-400' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    <i className="fas fa-hashtag mr-2 text-xs"></i>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <i className="fas fa-headset mr-2 text-pink-500"></i>
              Hỗ trợ
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`text-sm transition-all hover:pl-2 duration-200 ${
                      darkMode 
                        ? 'text-gray-300 hover:text-pink-400' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    <i className="fas fa-chevron-right mr-2 text-xs"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Support Badges */}
            <div className="mt-6 space-y-3">
              <div className={`flex items-center space-x-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-clock text-green-500"></i>
                <span>Hỗ trợ 24/7</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-shipping-fast text-blue-500"></i>
                <span>Giao hàng nhanh</span>
              </div>
              <div className={`flex items-center space-x-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <i className="fas fa-shield-alt text-purple-500"></i>
                <span>Bảo mật 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Certifications */}
      <div className={`border-t py-6 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-pink-100 bg-pink-25'
      }`}>
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Thanh toán:
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">MC</span>
                </div>
                <div className="w-10 h-6 bg-pink-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">Momo</span>
                </div>
                <div className="w-10 h-6 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">COD</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Chứng nhận:
              </span>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded text-xs font-medium ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
                }`}>
                  <i className="fas fa-certificate mr-1 text-yellow-500"></i>
                  DMCA
                </div>
                <div className={`px-3 py-1 rounded text-xs font-medium ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'
                }`}>
                  <i className="fas fa-shield-alt mr-1 text-green-500"></i>
                  SSL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`border-t py-4 ${
        darkMode 
          ? 'border-gray-700 bg-gray-900' 
          : 'border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50'
      }`}>
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className={`text-sm text-center sm:text-left ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {currentYear} <span className="font-semibold text-pink-600">HaFu House</span>. 
              Tất cả quyền được bảo lưu.
            </p>
            <div className={`flex items-center space-x-4 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Link to="/terms" className="hover:text-pink-600 transition-colors">
                Điều khoản
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-pink-600 transition-colors">
                Bảo mật
              </Link>
              <span>•</span>
              <Link to="/sitemap" className="hover:text-pink-600 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;