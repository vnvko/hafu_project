import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const OrdersPage = () => {
  const darkMode = document.body.classList.contains('dark');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');

  const load = async (p = 1) => {
    try {
      setLoading(true);
      const params = { page: p, limit: 10 };
      if (selectedStatus) params.status = selectedStatus;
      
      const res = await api.admin.orders.list(params);
      setItems(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(page);
  }, [page, selectedStatus]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.admin.orders.updateStatus(orderId, { status: newStatus });
      await load(page);
    } catch (e) {
      alert(e.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': { text: 'Chờ xử lý', class: 'bg-yellow-500 text-white' },
      'PAID': { text: 'Đã thanh toán', class: 'bg-blue-500 text-white' },
      'FULFILLING': { text: 'Đang xử lý', class: 'bg-purple-500 text-white' },
      'SHIPPED': { text: 'Đã giao hàng', class: 'bg-indigo-500 text-white' },
      'COMPLETED': { text: 'Hoàn thành', class: 'bg-green-500 text-white' },
      'CANCELED': { text: 'Đã hủy', class: 'bg-red-500 text-white' },
      'REFUNDED': { text: 'Đã hoàn tiền', class: 'bg-gray-500 text-white' }
    };
    const config = statusConfig[status] || { text: status, class: 'bg-gray-500 text-white' };
    return (
      <span className={`px-2 py-1 rounded text-xs ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const getStatusOptions = () => [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'PENDING', label: 'Chờ xử lý' },
    { value: 'PAID', label: 'Đã thanh toán' },
    { value: 'FULFILLING', label: 'Đang xử lý' },
    { value: 'SHIPPED', label: 'Đã giao hàng' },
    { value: 'COMPLETED', label: 'Hoàn thành' },
    { value: 'CANCELED', label: 'Đã hủy' },
    { value: 'REFUNDED', label: 'Đã hoàn tiền' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Quản lý đơn hàng</h2>
        
        <div className="flex items-center gap-4">
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3 py-2 rounded border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          >
            {getStatusOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center">
          <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto"></div>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Đang tải...</p>
        </div>
      ) : error ? (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <i className="fas fa-exclamation-triangle mr-2"></i>{error}
        </div>
      ) : (
        <div className={`rounded-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-hidden`}>
          <table className="w-full text-sm">
            <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
              <tr className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <th className="text-left px-4 py-3">Mã</th>
                <th className="text-left px-4 py-3">Khách hàng</th>
                <th className="text-left px-4 py-3">Trạng thái</th>
                <th className="text-left px-4 py-3">Tổng</th>
                <th className="text-left px-4 py-3">Ngày tạo</th>
                <th className="text-right px-4 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map((order, idx) => (
                <tr key={order.id} className={`${darkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} ${idx % 2 === 0 ? '' : darkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}`}>
                  <td className="px-4 py-2 font-medium">{order.code}</td>
                  <td className="px-4 py-2">
                    <div>
                      <div className="font-medium">{order.customer_name || 'Khách lẻ'}</div>
                      <div className="text-xs opacity-60">{order.email || order.customer_phone || '-'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {Number(order.total || 0).toLocaleString('vi-VN')}đ
                  </td>
                  <td className="px-4 py-2 text-xs opacity-60">
                    {new Date(order.created_at).toLocaleString('vi-VN')}
                  </td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                    >
                      <option value="PENDING">Chờ xử lý</option>
                      <option value="PAID">Đã thanh toán</option>
                      <option value="FULFILLING">Đang xử lý</option>
                      <option value="SHIPPED">Đã giao hàng</option>
                      <option value="COMPLETED">Hoàn thành</option>
                      <option value="CANCELED">Đã hủy</option>
                      <option value="REFUNDED">Đã hoàn tiền</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button disabled={page === 1} onClick={() => setPage((v) => Math.max(1, v - 1))} className={`px-3 py-1.5 rounded border ${darkMode ? 'border-gray-700 text-gray-300 disabled:opacity-50' : 'border-gray-300 text-gray-700 disabled:opacity-50'}`}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Trang {page}/{totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((v) => Math.min(totalPages, v + 1))} className={`px-3 py-1.5 rounded border ${darkMode ? 'border-gray-700 text-gray-300 disabled:opacity-50' : 'border-gray-300 text-gray-700 disabled:opacity-50'}`}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
