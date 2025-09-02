import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const darkMode = document.body.classList.contains('dark');

  const navItems = [
    { icon: 'fas fa-home', label: 'Dashboard', to: '/admin' },
    { icon: 'fas fa-box', label: 'Sản phẩm', to: '/admin/products' },
    { icon: 'fas fa-th-list', label: 'Danh mục', to: '/admin/categories' },
    { icon: 'fas fa-shopping-cart', label: 'Đơn hàng', to: '/admin/orders' },
    { icon: 'fas fa-users', label: 'Người dùng', to: '/admin/users' },
    { icon: 'fas fa-newspaper', label: 'Bài viết', to: '/admin/blog' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen sticky top-0 ${darkMode ? 'bg-gray-950 border-r border-gray-800' : 'bg-white border-r border-gray-200'} p-4`}> 
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <div className={`${darkMode ? 'text-pink-400' : 'text-pink-600'} font-bold`}>HaFu Admin</div>
              <div className="text-xs opacity-70">Control Panel</div>
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                <i className={`${item.icon} w-4`}></i>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 min-h-screen">
          {/* Topbar */}
          <header className={`flex items-center justify-between px-6 py-3 ${darkMode ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'}`}>
            <h1 className="font-bold">Bảng điều khiển</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm opacity-80">{user?.full_name || 'Admin'}</span>
              <button onClick={() => dispatch(logout())} className={`px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <i className="fas fa-sign-out-alt mr-2"></i>
                Đăng xuất
              </button>
            </div>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
