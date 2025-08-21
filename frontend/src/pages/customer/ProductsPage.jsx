import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/customer/products/ProductCard';

const ProductsPage = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [searchQuery, setSearchQuery] = useState('');

  const productsPerPage = 20; // 4 rows x 5 products = 20 per page

  // Mock data - sẽ thay thế bằng API call
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Hashtag Marketing Pro 2024",
        price: 299000,
        originalPrice: 399000,
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
        category: "Marketing",
        rating: 4.9,
        totalSold: 1250,
        tags: ["#marketing", "#business", "#growth"],
        isHot: true,
        isNew: false,
        isBestSeller: true
      },
      {
        id: 2,
        name: "Hashtag Thời Trang Trendy",
        price: 199000,
        originalPrice: 249000,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
        category: "Fashion",
        rating: 4.7,
        totalSold: 890,
        tags: ["#fashion", "#style", "#outfit"],
        isHot: false,
        isNew: true,
        isBestSeller: false
      },
      {
        id: 3,
        name: "Hashtag F&B Premium",
        price: 249000,
        originalPrice: 329000,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
        category: "Food",
        rating: 4.8,
        totalSold: 2100,
        tags: ["#food", "#restaurant", "#delicious"],
        isHot: true,
        isNew: false,
        isBestSeller: true
      },
      {
        id: 4,
        name: "Hashtag Du Lịch Explorer",
        price: 179000,
        originalPrice: 229000,
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop",
        category: "Travel",
        rating: 4.6,
        totalSold: 675,
        tags: ["#travel", "#explore", "#adventure"],
        isHot: false,
        isNew: false,
        isBestSeller: false
      },
      {
        id: 5,
        name: "Hashtag Beauty & Skincare",
        price: 319000,
        originalPrice: 429000,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
        category: "Beauty",
        rating: 4.9,
        totalSold: 1456,
        tags: ["#beauty", "#skincare", "#cosmetics"],
        isHot: true,
        isNew: true,
        isBestSeller: true
      },
      {
        id: 6,
        name: "Hashtag Tech & Startup",
        price: 269000,
        originalPrice: 339000,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
        category: "Technology",
        rating: 4.5,
        totalSold: 543,
        tags: ["#tech", "#startup", "#innovation"],
        isHot: false,
        isNew: false,
        isBestSeller: false
      },
      {
        id: 7,
        name: "Hashtag Fitness & Health",
        price: 189000,
        originalPrice: 239000,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
        category: "Fitness",
        rating: 4.4,
        totalSold: 789,
        tags: ["#fitness", "#health", "#workout"],
        isHot: false,
        isNew: true,
        isBestSeller: false
      },
      {
        id: 8,
        name: "Hashtag Education & Learning",
        price: 159000,
        originalPrice: 199000,
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=300&fit=crop",
        category: "Education",
        rating: 4.3,
        totalSold: 432,
        tags: ["#education", "#learning", "#skills"],
        isHot: false,
        isNew: false,
        isBestSeller: false
      },
      {
        id: 9,
        name: "Hashtag Real Estate Pro",
        price: 229000,
        originalPrice: 289000,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop",
        category: "Real Estate",
        rating: 4.6,
        totalSold: 321,
        tags: ["#realestate", "#property", "#investment"],
        isHot: false,
        isNew: false,
        isBestSeller: false
      },
      {
        id: 10,
        name: "Hashtag Entertainment & Events",
        price: 149000,
        originalPrice: 189000,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
        category: "Entertainment",
        rating: 4.2,
        totalSold: 654,
        tags: ["#entertainment", "#events", "#fun"],
        isHot: false,
        isNew: false,
        isBestSeller: false
      },
      // Thêm 10 sản phẩm nữa để có 20 sản phẩm
      ...Array.from({ length: 10 }, (_, i) => ({
        id: 11 + i,
        name: `Hashtag Package ${11 + i}`,
        price: 150000 + (i * 20000),
        originalPrice: 200000 + (i * 30000),
        image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=300&h=300&fit=crop`,
        category: ["Marketing", "Fashion", "Food", "Travel", "Beauty"][i % 5],
        rating: 4.0 + (Math.random() * 0.9),
        totalSold: 100 + (i * 50),
        tags: ["#hashtag", "#trending", "#viral"],
        isHot: i % 3 === 0,
        isNew: i % 4 === 0,
        isBestSeller: i % 5 === 0
      }))
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.totalSold - a.totalSold);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filterCategory, priceRange, searchQuery, sortBy]);

  const categories = [
    { value: 'all', label: 'Tất cả', count: products.length },
    { value: 'marketing', label: 'Marketing', count: products.filter(p => p.category === 'Marketing').length },
    { value: 'fashion', label: 'Thời trang', count: products.filter(p => p.category === 'Fashion').length },
    { value: 'food', label: 'Ẩm thực', count: products.filter(p => p.category === 'Food').length },
    { value: 'travel', label: 'Du lịch', count: products.filter(p => p.category === 'Travel').length },
    { value: 'beauty', label: 'Làm đẹp', count: products.filter(p => p.category === 'Beauty').length },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className={`rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
          <div className="p-2 space-y-2">
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 dark:from-pink-700 dark:via-pink-600 dark:to-pink-700 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-transparent' : 'bg-transparent'
    }`}>
      {/* Breadcrumb */}
      <div className={`py-2 border-b transition-colors ${
        darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm`}>
        <div className="container">
          <nav className="flex items-center space-x-2 text-xs">
            <Link to="/" className={`hover:text-pink-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <i className="fas fa-home mr-1"></i>
              Trang chủ
            </Link>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Sản phẩm
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <i className="fas fa-tags mr-2 text-pink-500"></i>
              Tất cả sản phẩm
            </h1>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Tìm thấy {filteredProducts.length} sản phẩm
            </p>
          </div>
          
          {/* Sort */}
          <div className="flex items-center space-x-3">
            <label className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Sắp xếp:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:border-pink-500`}
            >
              <option value="popular">Phổ biến nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl border p-4 sticky top-24 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-filter mr-2 text-pink-500"></i>
                Bộ lọc
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Tìm kiếm
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm hashtag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-3 py-2 pr-8 rounded-lg border text-sm ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:border-pink-500`}
                  />
                  <i className="fas fa-search absolute right-3 top-3 text-gray-400 text-xs"></i>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Danh mục
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setFilterCategory(category.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterCategory === category.value
                          ? darkMode
                            ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                            : 'bg-pink-50 text-pink-600 border border-pink-200'
                          : darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Khoảng giá
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Từ"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:border-pink-500`}
                    />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>-</span>
                    <input
                      type="number"
                      placeholder="Đến"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500000])}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:border-pink-500`}
                    />
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bộ lọc nhanh
                </label>
                <div className="space-y-2">
                  <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    <i className="fas fa-fire mr-2 text-red-500"></i>
                    Sản phẩm hot
                  </button>
                  <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    <i className="fas fa-star mr-2 text-yellow-500"></i>
                    Bán chạy nhất
                  </button>
                  <button className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                    <i className="fas fa-percentage mr-2 text-green-500"></i>
                    Đang giảm giá
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {/* Products Grid - Optimized for mobile with 5 columns on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      layout="grid"
                    />
                  ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <i className="fas fa-search text-3xl text-gray-400"></i>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Không tìm thấy sản phẩm
                    </h3>
                    <p className={`text-gray-500 mb-4`}>
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <button
                      onClick={() => {
                        setFilterCategory('all');
                        setPriceRange([0, 500000]);
                        setSearchQuery('');
                      }}
                      className="btn-primary px-6 py-3"
                    >
                      <i className="fas fa-redo mr-2"></i>
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === 1
                            ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                        if (pageNum > totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-pink-500 text-white'
                                : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;