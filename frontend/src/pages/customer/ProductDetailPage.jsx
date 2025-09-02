import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, clearProductDetail } from '../../store/slices/productSlice';
import api from '../../services/api';

const ProductDetailPage = ({ darkMode }) => {
  const { id: param } = useParams();
  const slug = param; // route dùng slug; fallback: nếu id numeric vẫn xử lý slug như string

  const dispatch = useDispatch();
  const { data: product, loading, error } = useSelector((state) => state.products.productDetail);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchProductDetail(slug));
    return () => dispatch(clearProductDetail());
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?.id) {
      api.getProductImages(product.id)
        .then((imgs) => setImages(imgs || []))
        .catch(() => setImages([]));
    }
  }, [product?.id]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 800);
  };

  const normalizedPrice = product?.price_min || 0;
  const hasOriginal = false; // backend chưa trả originalPrice
  const discount = 0; // chưa có khuyến mãi => 0
  const productImages = images.length > 0
    ? images.map((img) => img.url)
    : [product?.thumbnail_url].filter(Boolean);

  const renderStars = (ratingValue) => {
    const r = ratingValue || 0;
    const stars = [];
    const fullStars = Math.floor(r);
    const hasHalfStar = r % 1 !== 0;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      else if (i === fullStars && hasHalfStar) stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
      else stars.push(<i key={i} className="far fa-star text-gray-300"></i>);
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
            {product?.name && (
              <>
                <i className="fas fa-chevron-right text-gray-400"></i>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {product.name}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container py-4">
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 mx-auto"></div>
            <p className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Không tải được sản phẩm</h3>
            <p className={`text-gray-500 mb-4`}>{error}</p>
            <Link to="/products" className="btn-primary px-6 py-3">
              Quay lại danh sách
            </Link>
          </div>
        ) : !product ? (
          <div className="py-20 text-center">
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Sản phẩm không tồn tại</h3>
            <Link to="/products" className="btn-primary px-6 py-3">Về trang sản phẩm</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
            {/* Product Images */}
            <div className="space-y-2">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                <img
                  src={productImages[selectedImage] || product.thumbnail_url}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
                {/* Badges */}
                <div className="absolute top-1 left-1 flex flex-col space-y-1">
                  {discount > 0 && (
                    <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 0 && (
                <div className="grid grid-cols-4 gap-1">
                  {productImages.map((image, index) => (
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
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {product.slug && (
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                      darkMode ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-600'
                    }`}>
                      #{product.slug}
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
                    {renderStars(product.rating_avg)}
                    <span className={`ml-1 font-medium text-xs ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.rating_avg || 0}
                    </span>
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Đã bán {product.sold_count || 0}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <div className="text-lg sm:text-xl font-bold text-pink-600">
                  {Number(normalizedPrice).toLocaleString('vi-VN')}đ
                </div>
                {hasOriginal && (
                  <div className={`text-sm line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {/* original price placeholder */}
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {typeof product.description === 'string' ? product.description.replace(/<[^>]*>?/gm, '') : ''}
                  </p>
                </div>
              )}

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
                    disabled={isAddingToCart}
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
        )}

        {/* Specs - hiển thị thông tin cơ bản từ product nếu cần */}
        {product && (
          <div className="mt-12">
            <div className={`border rounded-2xl ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                  Thông tin sản phẩm
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`flex justify-between items-center py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mã</span>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.slug}</span>
                  </div>
                  <div className={`flex justify-between items-center py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Giá thấp nhất</span>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Number(normalizedPrice).toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className={`flex justify-between items-center py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Đã bán</span>
                    <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.sold_count || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;