import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerLayout from './components/customer/layout/CustomerLayout';
import HomePage from './pages/customer/HomePage';

// Temporary placeholder components
const ProductsPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Trang Sản Phẩm</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const ProductDetailPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Chi Tiết Sản Phẩm</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const CategoriesPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Danh Mục</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const BlogPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Blog</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Dự Án</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Liên Hệ</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const CartPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Giỏ Hàng</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const LoginPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Đăng Nhập</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

const RegisterPage = () => (
  <div className="section-padding">
    <div className="container">
      <h1 className="text-3xl font-bold text-gradient-pink mb-4">Đăng Ký</h1>
      <p className="text-gray-600">Đang phát triển...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <CustomerLayout>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="section-padding text-center">
              <div className="container">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h1 className="text-3xl font-bold text-gradient-pink mb-4">Không Tìm Thấy Trang</h1>
                  <p className="text-gray-600 mb-6">Trang bạn đang tìm kiếm không tồn tại.</p>
                  <a href="/" className="btn-primary">
                    <i className="fas fa-home mr-2"></i>
                    Về Trang Chủ
                  </a>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </CustomerLayout>
    </Router>
  );
}

export default App;