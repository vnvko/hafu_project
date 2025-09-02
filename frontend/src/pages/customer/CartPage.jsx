import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = ({ darkMode }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Hashtag Marketing Pro 2024",
      price: 299000,
      originalPrice: 399000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop",
      category: "Marketing",
      inStock: true
    },
    {
      id: 2,
      name: "Hashtag Thời Trang Trendy",
      price: 199000,
      originalPrice: null,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
      category: "Fashion",
      inStock: true
    },
    {
      id: 3,
      name: "Hashtag F&B Premium",
      price: 249000,
      originalPrice: 329000,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
      category: "Food",
      inStock: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      'SAVE10': { discount: 10, type: 'percentage' },
      'SAVE50K': { discount: 50000, type: 'fixed' },
      'FREESHIP': { discount: 0, type: 'freeship' }
    };

    if (validCoupons[couponCode]) {
      setAppliedCoupon({ code: couponCode, ...validCoupons[couponCode] });
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else if (appliedCoupon.type === 'fixed') {
      discount = appliedCoupon.discount;
    }
  }

  const finalShipping = appliedCoupon?.type === 'freeship' ? 0 : shipping;
  const total = subtotal - discount + finalShipping;

  const recommendedProducts = [
    {
      id: 4,
      name: "Hashtag Du Lịch Explorer",
      price: 179000,
      originalPrice: 229000,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop",
      rating: 4.6
    },
    {
      id: 5,
      name: "Hashtag Beauty & Skincare",
      price: 319000,
      originalPrice: 429000,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
      rating: 4.9
    }
  ];

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container py-12">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
              <i className="fas fa-shopping-cart text-6xl text-gray-400"></i>
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Giỏ hàng trống
            </h1>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hãy thêm một số sản phẩm vào giỏ hàng của bạn
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Giỏ hàng
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className={`text-lg sm:text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-shopping-cart mr-2 text-pink-500"></i>
                Giỏ hàng ({cartItems.length} sản phẩm)
              </h1>
              <button
                onClick={() => setCartItems([])}
                className={`text-xs font-medium transition-colors ${
                  darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                }`}
              >
                <i className="fas fa-trash mr-1"></i>
                Xóa tất cả
              </button>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className={`rounded-xl border p-3 transition-all ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}>
                  <div className="flex space-x-3">
                    {/* Product Image */}
                    <Link to={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">Hết hàng</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-1 mb-1">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                              darkMode ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-600'
                            }`}>
                              {item.category}
                            </span>
                            {!item.inStock && (
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
                              }`}>
                                Hết hàng
                              </span>
                            )}
                          </div>
                          <Link to={`/products/${item.id}`}>
                            <h3 className={`text-sm font-semibold hover:text-pink-600 transition-colors line-clamp-1 ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={`p-1 rounded transition-colors ${
                            darkMode 
                              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title="Xóa sản phẩm"
                        >
                          <i className="fas fa-trash text-xs"></i>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-bold text-pink-600">
                            {item.price.toLocaleString('vi-VN')}đ
                          </div>
                          {item.originalPrice && (
                            <div className={`text-xs line-through ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {item.originalPrice.toLocaleString('vi-VN')}đ
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            SL:
                          </span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={!item.inStock}
                              className={`w-6 h-6 rounded flex items-center justify-center transition-colors text-xs ${
                                darkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-500' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400'
                              } disabled:cursor-not-allowed`}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              disabled={!item.inStock}
                              className={`w-12 h-6 text-center border rounded text-xs ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-500' 
                                  : 'bg-white border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-400'
                              } focus:outline-none focus:border-pink-500 disabled:cursor-not-allowed`}
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={!item.inStock}
                              className={`w-6 h-6 rounded flex items-center justify-center transition-colors text-xs ${
                                darkMode 
                                  ? 'bg-gray-700 hover:bg-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-500' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400'
                              } disabled:cursor-not-allowed`}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-sm font-bold text-pink-600">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {item.price.toLocaleString('vi-VN')}đ × {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <div className={`rounded-2xl border p-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-ticket-alt mr-2 text-green-500"></i>
                Mã giảm giá
              </h3>
              
              {appliedCoupon ? (
                <div className={`p-3 rounded-lg border ${
                  darkMode ? 'bg-green-500/20 border-green-500/30' : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                        Mã: {appliedCoupon.code}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                        {appliedCoupon.type === 'percentage' && `Giảm ${appliedCoupon.discount}%`}
                        {appliedCoupon.type === 'fixed' && `Giảm ${appliedCoupon.discount.toLocaleString('vi-VN')}đ`}
                        {appliedCoupon.type === 'freeship' && 'Miễn phí vận chuyển'}
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className={`text-sm font-medium ${
                        darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                      }`}
                    >
                      Bỏ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Nhập mã giảm giá"
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:border-pink-500`}
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    Áp dụng
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className={`rounded-2xl border p-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-receipt mr-2 text-blue-500"></i>
                Tóm tắt đơn hàng
              </h3>

              <div className="space-y-3">
                <div className={`flex justify-between ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{discount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}

                <div className={`flex justify-between ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <span>Phí vận chuyển</span>
                  <span>
                    {finalShipping === 0 ? (
                      <span className="text-green-600">Miễn phí</span>
                    ) : (
                      `${finalShipping.toLocaleString('vi-VN')}đ`
                    )}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 500000 && (
                  <div className={`text-sm p-3 rounded-lg ${
                    darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <i className="fas fa-info-circle mr-1"></i>
                    Mua thêm {(500000 - subtotal).toLocaleString('vi-VN')}đ để được miễn phí ship
                  </div>
                )}

                <div className={`border-t pt-3 ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <div className={`flex justify-between text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span>Tổng cộng</span>
                    <span className="text-pink-600">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 px-6 rounded-xl font-bold text-lg text-center transition-all hover:scale-105 shadow-lg block"
                >
                  <i className="fas fa-credit-card mr-2"></i>
                  Thanh toán ngay
                </Link>
                <Link
                  to="/products"
                  className={`w-full border-2 py-4 px-6 rounded-xl font-bold text-lg text-center transition-all hover:scale-105 block ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-pink-300 text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Recommended Products */}
            <div className={`rounded-2xl border p-6 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                Có thể bạn quan tâm
              </h3>
              <div className="space-y-3">
                {recommendedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className={`flex space-x-3 p-3 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium line-clamp-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-bold text-pink-600">
                          {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {product.originalPrice && (
                          <span className={`text-xs line-through ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {product.originalPrice.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;