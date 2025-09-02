import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/slices/categorySlice';
// import LoginModal from '../auth/LoginModal';
import { logout } from '../../../store/slices/authSlice';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  
  const dispatch = useDispatch();
  const { items: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch categories khi component mount
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    
    if (isMenuOpen) {
      
      setTimeout(() => {
        const overlay = document.querySelector('[data-mobile-overlay]');
        const menu = document.querySelector('[data-mobile-menu]');
        
        if (overlay) {
          
        }
        
        if (menu) {
          
        }
      }, 100);
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: 'fas fa-home' },
    { name: 'Sản phẩm', path: '/products', icon: 'fas fa-tags' },
    { name: 'Blog', path: '/blog', icon: 'fas fa-blog' },
    { name: 'Dự án', path: '/projects', icon: 'fas fa-briefcase' },
    { name: 'Liên hệ', path: '/contact', icon: 'fas fa-phone' },
  ];

  return (
    <>
      {/* <LoginModal open={showLogin} onClose={() => setShowLogin(false)} darkMode={darkMode} /> */}
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

      {/* Main Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
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
            {/* Logo - LEFT SIDE */}
            <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform order-1">
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

            {/* Desktop Navigation - CENTER */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 order-2">
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
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                  darkMode
                    ? 'text-gray-300 hover:text-pink-400 hover:bg-gray-800'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}>
                  <i className="fas fa-th-large text-xs"></i>
                  <span>Danh mục</span>
                  <i className="fas fa-chevron-down text-xs transition-transform group-hover:rotate-180"></i>
                </button>
                
                {/* Categories Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className={`rounded-xl shadow-xl border ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } p-2`}>
                    {categoriesLoading ? (
                      <div className="p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500 mx-auto"></div>
                        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Đang tải...
                        </p>
                      </div>
                    ) : categories.length > 0 ? (
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/categories/${category.slug}`}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              darkMode
                                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <span>{category.name}</span>
                            <i className="fas fa-chevron-right text-xs opacity-50"></i>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Không có danh mục
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4 lg:mx-6 order-3">
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
            <div className="flex items-center space-x-1 sm:space-x-2 order-4">
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
                onClick={() => {
                  toggleDarkMode();
                }}
                className={`p-2.5 rounded-lg transition-all ${
                  darkMode 
                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
                title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
              </button>

              {/* Auth / Admin */}
              {!token ? (
                <Link
                  to="/login"
                  className={`hidden md:inline-flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
                    darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Đăng nhập</span>
                </Link>
              ) : (
                <div className="relative group">
                  <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'}`}>
                    <i className="fas fa-user-circle"></i>
                    <span className="hidden sm:inline">{user?.full_name || 'Tài khoản'}</span>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div className={`absolute right-0 mt-1 w-48 rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Link to="/admin" className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <span>Bảng quản trị</span>
                      <i className="fas fa-external-link-alt text-xs opacity-60"></i>
                    </Link>
                    <button onClick={() => dispatch(logout())} className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <span>Đăng xuất</span>
                      <i className="fas fa-sign-out-alt text-xs opacity-60"></i>
                    </button>
                  </div>
                </div>
              )}

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

              {/* Mobile Menu Toggle - FAR RIGHT */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden p-2.5 rounded-lg transition-all ${
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
      </header>

      {/* FIXED Mobile Menu - HIGHEST Z-INDEX WITH FORCED STYLES */}
      {isMenuOpen && (
        <>
          {/* Overlay - FIXED with forced styles */}
          <div 
            className="lg:hidden"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              display: 'block'
            }}
            data-mobile-overlay="true"
            onClick={toggleMenu}
          ></div>
          
          {/* Menu - FIXED with forced styles */}
          <div 
            className={`lg:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '320px',
              maxWidth: '85vw',
              zIndex: 9999,
              backgroundColor: darkMode ? '#111827' : '#ffffff',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-in-out',
              overflowY: 'auto',
              display: 'block'
            }}
            data-mobile-menu="true"
          >
            <div className="h-full flex flex-col">
              {/* Mobile Menu Header */}
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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

                  {!token ? (
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      <span className="font-medium">Đăng nhập</span>
                      <i className="fas fa-sign-in-alt text-xs opacity-50"></i>
                    </Link>
                  ) : (
                    <>
                      <Link to="/admin" onClick={toggleMenu} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>
                        <span className="font-medium">Bảng quản trị</span>
                        <i className="fas fa-external-link-alt text-xs opacity-50"></i>
                      </Link>
                      <button onClick={() => { dispatch(logout()); toggleMenu(); }} className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}>
                        <span className="font-medium">Đăng xuất</span>
                        <i className="fas fa-sign-out-alt text-xs opacity-50"></i>
                      </button>
                    </>
                  )}

                  {/* Categories Section in Mobile Menu */}
                  <div className="mt-6">
                    <h3 className={`text-sm font-semibold mb-3 px-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <i className="fas fa-th-large mr-2"></i>
                      Danh mục sản phẩm
                    </h3>
                    <div className="space-y-1">
                      {categoriesLoading ? (
                        <div className="px-4 py-2 text-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500 mx-auto"></div>
                        </div>
                      ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                          <Link
                            key={category.id}
                            to={`/categories/${category.slug}`}
                            onClick={toggleMenu}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                              darkMode
                                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                            style={{ animationDelay: `${(index + navLinks.length) * 50}ms` }}
                          >
                            <span className="font-medium">{category.name}</span>
                            <i className="fas fa-chevron-right text-xs opacity-50"></i>
                          </Link>
                        ))
                      ) : (
                        <div className={`px-4 py-2 text-center text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Không có danh mục
                        </div>
                      )}
                    </div>
                  </div>
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
    </>
  );
};

export default Header;