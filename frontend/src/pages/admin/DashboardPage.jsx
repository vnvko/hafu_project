import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Stat = ({ icon, label, value, darkMode }) => (
  <div className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-sm`}>
    <div className="flex items-center justify-between">
      <div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
        <div className="text-xl font-bold mt-1">{value}</div>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <i className={icon}></i>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    topProducts: [],
    revenueByDate: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.admin.dashboard.stats();
      setStats(response);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-sm animate-pulse`}>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-700 border border-red-200'}`}>
        <i className="fas fa-exclamation-triangle mr-2"></i>
        Lỗi tải thống kê: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          icon="fas fa-shopping-cart" 
          label="Tổng đơn hàng" 
          value={stats.totalOrders?.toLocaleString('vi-VN') || '0'} 
          darkMode={darkMode} 
        />
        <Stat 
          icon="fas fa-coins" 
          label="Tổng doanh thu" 
          value={`${(stats.totalRevenue || 0).toLocaleString('vi-VN')}đ`} 
          darkMode={darkMode} 
        />
        <Stat 
          icon="fas fa-box" 
          label="Sản phẩm bán chạy" 
          value={stats.topProducts?.length || '0'} 
          darkMode={darkMode} 
        />
        <Stat 
          icon="fas fa-chart-line" 
          label="Đơn hàng tháng này" 
          value={stats.revenueByDate?.length || '0'} 
          darkMode={darkMode} 
        />
      </div>

      {/* Top Products */}
      {stats.topProducts && stats.topProducts.length > 0 && (
        <div className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h2 className="font-semibold mb-3">Sản phẩm bán chạy</h2>
          <div className="space-y-2">
            {stats.topProducts.map((product, index) => (
              <div key={product.product_id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{product.name}</span>
                <span className="text-gray-500">Đã bán: {product.sold}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue Chart */}
      {stats.revenueByDate && stats.revenueByDate.length > 0 && (
        <div className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h2 className="font-semibold mb-3">Doanh thu theo ngày</h2>
          <div className="space-y-2">
            {stats.revenueByDate.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                <span className="font-medium">{item.revenue?.toLocaleString('vi-VN')}đ</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
