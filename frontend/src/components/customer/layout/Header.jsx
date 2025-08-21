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
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

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
              <span className="hidden md:flex items-center">
                <i className="fas fa-shipping-fast mr-1"></i>
                Miễn phí vận chuyển
              </span>
              <span className="flex items-center">
                <i className="fas fa-headset mr-1"></i>
                24/7 Hỗ trợ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Restored original size */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? darkMode 
            ? 'bg-gray-900/98 backdrop-blur-lg shadow-xl border-b border-gray-700' 
            : 'bg-white/98 backdrop-blur-lg shadow-xl border-b border-pink-100'
          : darkMode
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-white/95 backdrop-blur-md shadow-lg'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Mobile Menu Toggle - LEFT SIDE */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-lg transition-all order-1 ${
                darkMode 
                  ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>

            {/* Logo - CENTER ON MOBILE */}
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform order-2 lg:order-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg sm:text-xl font-bold ${
                  darkMode ? 'text-pink-400' : 'text-gradient-pink'
                }`}>
                  HaFu House
                </h1>
                <p className={`text-xs -mt-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Hashtag chất lượng cao
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 order-3 lg:order-2">
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
            <div className="hidden md:flex flex-1 max-w-sm mx-4 lg:mx-6 order-4 lg:order-3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Tìm kiếm hashtag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2.5 pr-10 rounded-xl border transition-all text-sm ${
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

            {/* Action Buttons - RIGHT SIDE */}
            <div className="flex items-center space-x-1 sm:space-x-2 order-3 lg:order-4">
              {/* Search Toggle - Mobile */}
              <button
                onClick={toggleSearch}
                className={`md:hidden p-2.5 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <i className="fas fa-search text-lg"></i>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
              </button>

              {/* Cart */}
              <Link 
                to="/cart" 
                className={`relative p-2.5 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <i className="fas fa-shopping-cart text-lg"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-4 animate-slide-down">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm hashtag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border transition-all text-sm ${
                    darkMode
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-pink-200 text-gray-800 placeholder-gray-400'
                  } focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100`}
                  autoFocus
                />
                <button 
                  onClick={toggleSearch}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    darkMode ? 'text-pink-400 hover:bg-gray-700' : 'text-pink-500 hover:bg-pink-50'
                  }`}
                >
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay - Fixed z-index */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
              onClick={toggleMenu}
            ></div>
            <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[110] transform transition-transform duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-2xl overflow-hidden`}>
              <div className="h-full flex flex-col">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">H</span>
                      </div>
                      <div>
                        <h2 className={`text-lg font-bold ${darkMode ? 'text-pink-400' : 'text-gradient-pink'}`}>
                          HaFu House
                        </h2>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Hashtag chất lượng cao
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleMenu}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                </div>

                {/* Mobile Menu Navigation */}
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="space-y-2">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={toggleMenu}
                        className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all ${
                          location.pathname === link.path
                            ? darkMode
                              ? 'text-pink-400 bg-pink-500/20 border border-pink-500/30'
                              : 'text-pink-600 bg-pink-50 border border-pink-200'
                            : darkMode
                              ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <i className={`${link.icon} text-lg w-5 text-center`}></i>
                        <span className="font-medium">{link.name}</span>
                        <i className="fas fa-chevron-right text-xs ml-auto opacity-50"></i>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Mobile Menu Footer */}
                <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        toggleDarkMode();
                        toggleMenu();
                      }}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-colors ${
                        darkMode 
                          ? 'text-yellow-400 bg-gray-800 hover:bg-gray-700' 
                          : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                      }`}
                    >
                      <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
                      <span className="text-xs font-medium">
                        {darkMode ? 'Sáng' : 'Tối'}
                      </span>
                    </button>
                    <Link
                      to="/cart"
                      onClick={toggleMenu}
                      className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-colors relative ${
                        darkMode 
                          ? 'text-pink-400 bg-gray-800 hover:bg-gray-700' 
                          : 'text-pink-600 bg-pink-50 hover:bg-pink-100'
                      }`}
                    >
                      <i className="fas fa-shopping-cart text-xl"></i>
                      <span className="text-xs font-medium">Giỏ hàng</span>
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
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