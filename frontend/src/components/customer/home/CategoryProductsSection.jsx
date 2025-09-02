import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { fetchProductsByCategory } from '../../../store/slices/productSlice';

const CategoryProductsSection = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { items: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  const { productsByCategory } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch categories nếu chưa có
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    // Fetch products cho từng category
    categories.forEach(category => {
      if (!productsByCategory[category.slug]?.data.length) {
        dispatch(fetchProductsByCategory(category.slug));
      }
    });
  }, [dispatch, categories, productsByCategory]);

  if (categoriesLoading) {
    return (
      <section className="py-8">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Đang tải danh mục sản phẩm...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-th-large mr-2 text-pink-500"></i>
            Danh mục sản phẩm
          </h2>
          <p className={`text-sm sm:text-base ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Khám phá bộ sưu tập hashtag chất lượng cao theo từng lĩnh vực
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 4).map((category, index) => {
            const categoryProducts = productsByCategory[category.slug]?.data || [];
            const isLoading = productsByCategory[category.slug]?.loading;
            
            // Sử dụng dữ liệu thực từ database
            const config = {
              title: category.name,
              description: category.description || `Hashtag ${category.name.toLowerCase()}`,
              icon: category.icon || "fas fa-tags",
              color: "from-pink-400 to-rose-500",
              bgColor: "bg-gradient-to-r from-pink-50 to-rose-50",
              darkBgColor: "bg-gradient-to-r from-pink-900/20 to-rose-900/20"
            };
            
            return (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-pink-500/50' 
                    : 'bg-white border-gray-200 hover:border-pink-300 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <Link to={`/categories/${category.slug}`} className="block p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                      <i className={`${config.icon} text-white text-lg`}></i>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {categoryProducts.length} sản phẩm
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {config.description}
                    </p>
                  </div>

                  {/* Products Preview */}
                  <div className="mt-4">
                    {isLoading ? (
                      <div className="flex space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={`w-8 h-8 rounded-lg animate-pulse ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}></div>
                        ))}
                      </div>
                    ) : categoryProducts.length > 0 ? (
                      <div className="flex space-x-2">
                        {categoryProducts.slice(0, 3).map((product, idx) => (
                          <div key={product.id} className="relative">
                            <img
                              src={product.thumbnail_url || `https://images.unsplash.com/photo-${1500000000000 + idx}?w=100&h=100&fit=crop`}
                              alt={product.name}
                              className="w-8 h-8 rounded-lg object-cover border-2 border-white shadow-sm"
                            />
                            {idx === 2 && categoryProducts.length > 3 && (
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">+{categoryProducts.length - 3}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Chưa có sản phẩm
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-4">
                    <div className={`inline-flex items-center space-x-1 text-sm font-medium transition-colors ${
                      darkMode 
                        ? 'text-pink-400 group-hover:text-pink-300' 
                        : 'text-pink-600 group-hover:text-pink-700'
                    }`}>
                      <span>Xem tất cả</span>
                      <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        {categories.length > 4 && (
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg'
              }`}
            >
              <i className="fas fa-th-large"></i>
              <span>Xem tất cả danh mục</span>
              <i className="fas fa-chevron-right text-xs"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProductsSection;