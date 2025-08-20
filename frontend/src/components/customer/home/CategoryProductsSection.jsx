import React from 'react';
import { Link } from 'react-router-dom';

const CategoryProductsSection = ({ darkMode }) => {
  const categories = [
    {
      id: 1,
      name: "Thời Trang & Phong Cách",
      icon: "👗",
      color: "from-pink-400 to-rose-500",
      description: "Hashtag trending cho ngành thời trang",
      products: [
        {
          id: 101,
          name: "Hashtag Thời Trang Nữ 2024",
          price: 199000,
          originalPrice: 249000,
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
          tags: ["#fashion", "#style", "#outfit"],
          sales: 890
        },
        {
          id: 102,
          name: "Hashtag Street Style",
          price: 179000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=200&h=200&fit=crop",
          tags: ["#streetstyle", "#urban", "#trendy"],
          sales: 654
        },
        {
          id: 103,
          name: "Hashtag Phụ Kiện Fashion",
          price: 159000,
          originalPrice: 199000,
          image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop",
          tags: ["#accessories", "#bags", "#jewelry"],
          sales: 432
        },
        {
          id: 104,
          name: "Hashtag Thời Trang Nam",
          price: 189000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
          tags: ["#mensfashion", "#gentleman", "#dapper"],
          sales: 567
        }
      ]
    },
    {
      id: 2,
      name: "Ẩm Thực & Nhà Hàng",
      icon: "🍽️",
      color: "from-orange-400 to-red-500",
      description: "Hashtag chuyên dụng cho F&B",
      products: [
        {
          id: 201,
          name: "Hashtag Nhà Hàng Pro",
          price: 249000,
          originalPrice: 329000,
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
          tags: ["#restaurant", "#food", "#delicious"],
          sales: 1234
        },
        {
          id: 202,
          name: "Hashtag Cafe & Trà Sữa",
          price: 199000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop",
          tags: ["#cafe", "#coffee", "#drinks"],
          sales: 876
        },
        {
          id: 203,
          name: "Hashtag Đồ Ăn Vặt",
          price: 159000,
          originalPrice: 199000,
          image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=200&h=200&fit=crop",
          tags: ["#snacks", "#streetfood", "#tasty"],
          sales: 654
        },
        {
          id: 204,
          name: "Hashtag Bánh Kẹo & Dessert",
          price: 179000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop",
          tags: ["#dessert", "#cake", "#sweet"],
          sales: 789
        }
      ]
    },
    {
      id: 3,
      name: "Du Lịch & Khám Phá",
      icon: "✈️",
      color: "from-blue-400 to-cyan-500",
      description: "Hashtag cho ngành du lịch",
      products: [
        {
          id: 301,
          name: "Hashtag Du Lịch Trong Nước",
          price: 179000,
          originalPrice: 229000,
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop",
          tags: ["#travel", "#vietnam", "#explore"],
          sales: 987
        },
        {
          id: 302,
          name: "Hashtag Du Lịch Quốc Tế",
          price: 219000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
          tags: ["#international", "#adventure", "#vacation"],
          sales: 543
        },
        {
          id: 303,
          name: "Hashtag Check-in Địa Điểm",
          price: 149000,
          originalPrice: 189000,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
          tags: ["#checkin", "#location", "#beautiful"],
          sales: 765
        },
        {
          id: 304,
          name: "Hashtag Resort & Khách Sạn",
          price: 199000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=200&fit=crop",
          tags: ["#resort", "#hotel", "#luxury"],
          sales: 432
        }
      ]
    },
    {
      id: 4,
      name: "Làm Đẹp & Chăm Sóc",
      icon: "💄",
      color: "from-purple-400 to-pink-500",
      description: "Hashtag cho ngành beauty",
      products: [
        {
          id: 401,
          name: "Hashtag Skincare Routine",
          price: 219000,
          originalPrice: 279000,
          image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
          tags: ["#skincare", "#beauty", "#glowing"],
          sales: 1456
        },
        {
          id: 402,
          name: "Hashtag Makeup Tutorial",
          price: 189000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&h=200&fit=crop",
          tags: ["#makeup", "#tutorial", "#cosmetics"],
          sales: 892
        },
        {
          id: 403,
          name: "Hashtag Spa & Wellness",
          price: 159000,
          originalPrice: 199000,
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=200&fit=crop",
          tags: ["#spa", "#wellness", "#relaxation"],
          sales: 634
        },
        {
          id: 404,
          name: "Hashtag Hair & Nail",
          price: 169000,
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=200&h=200&fit=crop",
          tags: ["#hair", "#nail", "#salon"],
          sales: 567
        }
      ]
    }
  ];

  const ProductCard = ({ product, categoryColor }) => {
    const discount = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

    return (
      <Link to={`/products/${product.id}`} className="group">
        <div className={`rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
            : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-md'
        }`}>
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-24 sm:h-28 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {discount && (
              <div className="absolute top-1 left-1">
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  -{discount}%
                </span>
              </div>
            )}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-6 h-6 bg-white/90 rounded-full text-gray-700 hover:text-pink-600 transition-colors">
                <i className="fas fa-heart text-xs"></i>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 sm:p-3">
            <h4 className={`text-xs sm:text-sm font-medium mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {product.name}
            </h4>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className={`text-xs px-1.5 py-0.5 rounded-full ${
                  darkMode 
                    ? 'bg-pink-500/20 text-pink-300' 
                    : 'bg-pink-100 text-pink-600'
                }`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Sales */}
            <div className={`text-xs mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Đã bán {product.sales}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-pink-600">
                  {product.price.toLocaleString('vi-VN')}đ
                </div>
                {product.originalPrice && (
                  <div className={`text-xs line-through ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </div>
                )}
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-2 py-1 rounded-lg text-xs transition-all hover:scale-105">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className={`py-8 sm:py-12 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    }`}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gradient-pink'
          }`}>
            <i className="fas fa-th-large mr-3"></i>
            Hashtag Theo Danh Mục
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Chọn hashtag phù hợp với lĩnh vực kinh doanh của bạn
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8 sm:space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4 sm:space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm sm:text-base ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <Link 
                  to={`/category/${category.id}`}
                  className={`text-sm font-medium transition-colors ${
                    darkMode 
                      ? 'text-pink-400 hover:text-pink-300' 
                      : 'text-pink-600 hover:text-pink-700'
                  }`}
                >
                  Xem tất cả
                  <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {category.products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryColor={category.color}
                  />
                ))}
              </div>

              {/* Category Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to={`/category/${category.id}`}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                      : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-md'
                  }`}
                >
                  <i className="fas fa-eye mr-2"></i>
                  Xem Tất Cả {category.name}
                </Link>
                <Link
                  to={`/combo/${category.id}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-gift mr-2"></i>
                  Mua Combo Tiết Kiệm
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All Categories Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold text-lg rounded-2xl transition-all hover:scale-105 shadow-xl"
          >
            <i className="fas fa-th-large mr-3"></i>
            Khám Phá Tất Cả Danh Mục
            <i className="fas fa-arrow-right ml-3"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;