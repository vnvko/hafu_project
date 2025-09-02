// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setAuthToken, setApiBaseUrl } from './services/api';

import CustomerLayout from './components/customer/layout/CustomerLayout';
import HomePage from './pages/customer/HomePage';
import BlogPage from './pages/customer/BlogPage';
import ContactPage from './pages/customer/ContactPage';
import ProjectsPage from './pages/customer/ProjectsPage';
import PrivateRoute from './components/common/PrivateRoute';

import AdminLayout from './components/admin/layout/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminCategoriesPage from './pages/admin/CategoriesPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import AdminUsersPage from './pages/admin/UsersPage';
import AdminBlogPage from './pages/admin/BlogPage';
import LoginPage from './pages/customer/LoginPage';

// Lazy loading
const ProductDetailPage = React.lazy(() => import('./pages/customer/ProductDetailPage'));
const CartPage = React.lazy(() => import('./pages/customer/CartPage'));
const ProductsPage = React.lazy(() => import('./pages/customer/ProductsPage'));

const CategoriesPage = () => (
  <div className="section-padding-sm">
    <div className="container">
      <h1 className="text-lg sm:text-xl font-bold text-gradient-pink mb-3">Danh Mục</h1>
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

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // 🔐 Lấy token từ Redux; nếu F5 thì fallback localStorage
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    // 🌐 Thiết lập baseURL cho toàn bộ API
    setApiBaseUrl(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

    // 🪪 Bơm token vào api.js để mọi request /api/admin có Authorization
    const tk = token || localStorage.getItem('token');
    setAuthToken(tk || null);
  }, [token]);

  return (
    <Router>
      <ScrollToTop />
      <CustomerLayout>
        <React.Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm">Đang tải...</p>
              </div>
            </div>
          }
        >
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<ProductsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute requireAdmin>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="blog" element={<AdminBlogPage />} />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
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
              }
            />
          </Routes>
        </React.Suspense>
      </CustomerLayout>
    </Router>
  );
}

export default App;
