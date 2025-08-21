import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CustomerLayout from './components/customer/layout/CustomerLayout';
import HomePage from './pages/customer/HomePage';

// Import new pages with lazy loading
const ProductDetailPage = React.lazy(() => import('./pages/customer/ProductDetailPage'));
const CartPage = React.lazy(() => import('./pages/customer/CartPage'));

// Temporary placeholder components
const ProductsPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Trang Sản Phẩm</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

const CategoriesPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Danh Mục</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Blog</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Dự Án</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Liên Hệ</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

const CheckoutPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Thanh Toán</h1>
      <p className="text-gray-600 text-sm">Đang phát triển...</p>
    </div>
  </div>
);

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomerLayout>
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Đang tải...</p>
            </div>
          </div>
        }>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:slug" element={<ProductsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* 404 Page */}
            <Route path="*" element={
              <div className="section-padding-sm text-center">
                <div className="container">
                  <div className="max-w-md mx-auto">
                    <div className="text-4xl mb-3">🔍</div>
                    <h1 className="text-xl font-bold text-gradient-pink mb-3">Không Tìm Thấy Trang</h1>
                    <p className="text-gray-600 mb-4 text-sm">Trang bạn đang tìm kiếm không tồn tại.</p>
                    <a href="/" className="btn-primary">
                      <i className="fas fa-home mr-2"></i>
                      Về Trang Chủ
                    </a>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </React.Suspense>
      </CustomerLayout>
    </Router>
  );
}

export default App;