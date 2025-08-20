import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: 'fas fa-home' },
    { name: 'Sản phẩm', path: '/products', icon: 'fas fa-tags' },
    { name: 'Danh mục', path: '/categories', icon: 'fas fa-th-large' },
    { name: 'Blog', path: '/blog', icon: 'fas fa-blog' },
    { name: 'Dự án', path: '/projects', icon: 'fas fa-briefcase' },
    { name: 'Liên hệ', path: '/contact', icon: 'fas fa-phone' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className={`py-1.5 sm:py-2 transition-colors ${
        darkMode 
          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
          : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
      }`}>
        <div className="container">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="flex items-center">
                <i className="fas fa-phone mr-1 sm:mr-2"></i>
                <span className="hidden sm:inline">Hotline: </span>
                0123.456.789
              </span>
              <span className="hidden md:flex items-center">
                <i className="fas fa-envelope mr-1 sm:mr-2"></i>
                info@hashtagshop.com
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleDarkMode}
                className="hover:bg-white/20 p-1 rounded transition-all"
                title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
              </button>
              <Link to="/login" className="hover:underline transition-all">
                <i className="fas fa-sign-in-alt mr-1"></i>
                <span className="hidden sm:inline">Đăng nhập</span>
              </Link>
              <Link to="/register" className="hover:underline transition-all">
                <i className="fas fa-user-plus mr-1"></i>
                <span className="hidden sm:inline">Đăng ký</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? darkMode 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-700' 
            : 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-pink-100'
          : darkMode
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-md shadow-lg'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg sm:text-xl font-bold ${
                  darkMode ? 'text-pink-400' : 'text-gradient-pink'
                }`}>
                  HaFu Shop
                </h1>
                <p className={`text-xs -mt-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Hashtag chất lượng cao
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                    location.pathname === link.path
                      ? darkMode
                        ? 'text-pink-400 bg-pink-500/20'
                        : 'text-pink-600 bg-pink-50'
                      : darkMode
                        ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <i className={`${link.icon} text-xs`}></i>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4 lg:mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm hashtag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2 pr-10 rounded-xl border transition-all text-sm ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-pink-400'
                      : 'bg-white/80 border-pink-200 text-gray-800 placeholder-gray-400 focus:border-pink-400'
                  } focus:outline-none focus:ring-2 focus:ring-pink-100`}
                />
                <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                  darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-500 hover:bg-pink-50'
                }`}>
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Toggle - Mobile */}
              <button
                onClick={toggleSearch}
                className={`md:hidden p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <i className="fas fa-search text-lg"></i>
              </button>

              {/* Wishlist */}
              <button className={`relative p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}>
                <i className="fas fa-heart text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  2
                </span>
              </button>

              {/* Cart */}
              <Link 
                to="/cart" 
                className={`relative p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <i className="fas fa-shopping-cart text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              </Link>

              {/* User Profile */}
              <button className={`hidden sm:flex p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}>
                <i className="fas fa-user text-lg"></i>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-3 animate-slide-down">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm hashtag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2 pr-10 rounded-xl border transition-all text-sm ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-pink-200 text-gray-800 placeholder-gray-400'
                  } focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100`}
                />
                <button 
                  onClick={toggleSearch}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                    darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-500 hover:bg-pink-50'
                  }`}
                >
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleMenu}
            ></div>
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 transform transition-transform duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-2xl`}>
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">H</span>
                    </div>
                    <div>
                      <h2 className={`text-lg font-bold ${darkMode ? 'text-pink-400' : 'text-gradient-pink'}`}>
                        HaFu Shop
                      </h2>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Hashtag chất lượng cao
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={toggleMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        location.pathname === link.path
                          ? darkMode
                            ? 'text-pink-400 bg-pink-500/20'
                            : 'text-pink-600 bg-pink-50'
                          : darkMode
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <i className={`${link.icon} text-lg w-5`}></i>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </nav>

                <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/profile"
                      onClick={toggleMenu}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-user text-xl"></i>
                      <span className="text-xs">Tài khoản</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={toggleMenu}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-heart text-xl"></i>
                      <span className="text-xs">Yêu thích</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={toggleMenu}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-shopping-bag text-xl"></i>
                      <span className="text-xs">Đơn hàng</span>
                    </Link>
                    <Link
                      to="/support"
                      onClick={toggleMenu}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <i className="fas fa-headset text-xl"></i>
                      <span className="text-xs">Hỗ trợ</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;