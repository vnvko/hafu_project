import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = ({ darkMode }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data - sẽ thay thế bằng API call
  const product = {
    id: 1,
    name: "Hashtag Marketing Pro 2024 - Bộ Sưu Tập Trending Siêu Hot",
    price: 299000,
    originalPrice: 399000,
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=600&fit=crop"
    ],
    rating: 4.9,
    totalReviews: 234,
    totalSold: 1250,
    category: "Marketing",
    tags: ["#trending", "#viral", "#marketing", "#business", "#growth", "#engagement"],
    description: "Bộ sưu tập hashtag marketing chuyên nghiệp được nghiên cứu kỹ lưỡng, giúp tăng tương tác và reach hiệu quả trên các nền tảng social media.",
    features: [
      "✅ 500+ hashtag chất lượng cao",
      "✅ Cập nhật theo xu hướng 2024",
      "✅ Phù hợp mọi ngành nghề",
      "✅ File Excel dễ sử dụng",
      "✅ Hướng dẫn chi tiết",
      "✅ Hỗ trợ 24/7"
    ],
    specifications: {
      "Số lượng hashtag": "500+",
      "Định dạng": "Excel, PDF",
      "Ngôn ngữ": "Tiếng Việt, English", 
      "Cập nhật": "Hàng tháng",
      "Hỗ trợ": "24/7",
      "Bảo hành": "12 tháng"
    },
    isHot: true,
    isNew: false,
    inStock: true
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const relatedProducts = [
    {
      id: 2,
      name: "Hashtag Thời Trang Trendy",
      price: 199000,
      originalPrice: 249000,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
      rating: 4.7,
      sales: 890
    },
    {
      id: 3,
      name: "Hashtag F&B Premium",
      price: 249000,
      originalPrice: 329000,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
      rating: 4.8,
      sales: 2100
    },
    {
      id: 4,
      name: "Hashtag Du Lịch Explorer",
      price: 179000,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop",
      rating: 4.6,
      sales: 675
    }
  ];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      // Show success message or update cart state
    }, 1000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-300"></i>);
      }
    }
    return stars;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Breadcrumb */}
      <div className={`py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="container">
          <nav className="flex items-center space-x-2 text-xs">
            <Link to="/" className={`hover:text-pink-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <i className="fas fa-home mr-1"></i>
              Trang chủ
            </Link>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <Link to="/products" className={`hover:text-pink-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Sản phẩm
            </Link>
            <i className="fas fa-chevron-right text-gray-400"></i>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {product.category}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          {/* Product Images */}
          <div className="space-y-2">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
              {/* Badges */}
              <div className="absolute top-1 left-1 flex flex-col space-y-1">
                {product.isHot && (
                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold animate-pulse">
                    HOT
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded ${
                    selectedImage === index 
                      ? 'ring-1 ring-pink-500' 
                      : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-12 sm:h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                  darkMode ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-600'
                }`}>
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                    darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'
                  }`}>
                    <i className="fas fa-check mr-1"></i>
                    Còn hàng
                  </span>
                ) : (
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                    darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                  }`}>
                    <i className="fas fa-times mr-1"></i>
                    Hết hàng
                  </span>
                )}
              </div>

              <h1 className={`text-base sm:text-lg lg:text-xl font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className={`ml-1 font-medium text-xs ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.rating}
                  </span>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ({product.totalReviews} đánh giá)
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Đã bán {product.totalSold}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <div className="text-lg sm:text-xl font-bold text-pink-600">
                {product.price.toLocaleString('vi-VN')}đ
              </div>
              {product.originalPrice && (
                <div className={`text-sm line-through ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </div>
              )}
              {discount > 0 && (
                <div className="text-xs font-medium text-red-600 bg-red-50 px-1 py-0.5 rounded">
                  Tiết kiệm {(product.originalPrice - product.price).toLocaleString('vi-VN')}đ
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className={`text-xs leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-star mr-1 text-yellow-500"></i>
                Tính năng nổi bật
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                {product.features.map((feature, index) => (
                  <div key={index} className={`text-xs ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-hashtag mr-1 text-pink-500"></i>
                Hashtag mẫu
              </h3>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <span key={index} className={`px-1.5 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className={`font-medium text-xs ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Số lượng:
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className={`w-12 h-6 text-center border rounded text-xs ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:border-pink-500`}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-2 px-4 rounded-lg font-bold text-sm transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-1"></i>
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart mr-1"></i>
                      Thêm vào giỏ hàng
                    </>
                  )}
                </button>
                <button className={`px-3 py-2 rounded-lg font-bold transition-all hover:scale-105 text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                } shadow-md`}>
                  <i className="fas fa-heart mr-1"></i>
                  Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className={`border rounded-2xl ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="p-6">
              <h2 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                Thông số kỹ thuật
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={`flex justify-between items-center py-3 border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {key}
                    </span>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <i className="fas fa-sparkles mr-2 text-purple-500"></i>
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                <div className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                    : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-md hover:shadow-lg'
                } rounded-2xl overflow-hidden`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(relatedProduct.rating)}
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ({relatedProduct.sales})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-pink-600">
                          {relatedProduct.price.toLocaleString('vi-VN')}đ
                        </div>
                        {relatedProduct.originalPrice && (
                          <div className={`text-sm line-through ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {relatedProduct.originalPrice.toLocaleString('vi-VN')}đ
                          </div>
                        )}
                      </div>
                      <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;