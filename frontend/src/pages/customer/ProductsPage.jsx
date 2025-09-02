import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/customer/products/ProductCard';
import { fetchAllProducts } from '../../store/slices/productSlice';
import { fetchCategories } from '../../store/slices/categorySlice';

const ProductsPage = ({ darkMode }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [filterCategory, setFilterCategory] = useState(slug || 'all');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [searchQuery, setSearchQuery] = useState('');

  const productsPerPage = 20;

  // Fetch categories khi component mount
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // reset khi slug thay đổi
  useEffect(() => {
    setFilterCategory(slug || 'all');
    setCurrentPage(1);
  }, [slug]);

  useEffect(() => {
    const sortMap = {
      'price-asc': 'price_asc',
      'price-desc': 'price_desc',
      'rating': 'name_asc',
      'newest': 'created_desc',
      'popular': 'created_desc',
    };

    const params = {
      page: currentPage,
      limit: productsPerPage,
      search: searchQuery,
      sort: sortMap[sortBy] || 'created_desc',
    };

    // chỉ gửi minPrice/maxPrice khi người dùng thay đổi khỏi mặc định
    if (priceRange[0] !== 0) params.minPrice = priceRange[0];
    if (priceRange[1] !== 500000) params.maxPrice = priceRange[1];

    if (filterCategory !== 'all') {
      params.category = filterCategory; // backend đọc req.query.category là slug
    }

    dispatch(fetchAllProducts(params));
  }, [dispatch, currentPage, sortBy, filterCategory, priceRange, searchQuery]);

  const loading = allProducts.loading;
  const error = allProducts.error;
  const items = allProducts.data || [];
  const pagination = allProducts.pagination || { total: 0, totalPages: 0, currentPage: 1, perPage: productsPerPage };

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
              Sản phẩm {filterCategory !== 'all' ? `• ${filterCategory}` : ''}
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
              {filterCategory !== 'all' ? `Danh mục: ${filterCategory}` : 'Tất cả sản phẩm'}
            </h1>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {loading ? 'Đang tải...' : `Tìm thấy ${pagination.total || items.length} sản phẩm`}
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
                  {/* Tất cả danh mục */}
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      filterCategory === 'all'
                        ? darkMode
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                          : 'bg-pink-50 text-pink-600 border border-pink-200'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>Tất cả</span>
                  </button>
                  
                  {/* Danh mục từ database */}
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      onClick={() => setFilterCategory(category.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterCategory === category.slug
                          ? darkMode
                            ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                            : 'bg-pink-50 text-pink-600 border border-pink-200'
                          : darkMode
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category.name}</span>
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
            ) : error ? (
              <div className="text-center py-12">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Lỗi tải sản phẩm
                </h3>
                <p className={`text-gray-500 mb-4`}>
                  {error}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                  {items.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      layout="grid"
                    />
                  ))}
                </div>

                {items.length === 0 && (
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
                        setSortBy('popular');
                        setCurrentPage(1);
                      }}
                      className="btn-primary px-6 py-3"
                    >
                      <i className="fas fa-redo mr-2"></i>
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}

                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === 1
                            ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(
                        Math.max(0, Math.min(currentPage - 3, (pagination.totalPages || 1) - 5)),
                        Math.max(5, Math.min((pagination.totalPages || 1), currentPage + 2))
                      ).map((pageNum) => (
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
                      ))}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pagination.totalPages
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