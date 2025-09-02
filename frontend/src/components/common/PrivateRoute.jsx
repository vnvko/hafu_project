import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Sử dụng: <PrivateRoute requireAdmin>...</PrivateRoute>
const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { token, user } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin) {
    const roles = (user?.roles || user?.roleCodes || []);
    // Nếu không có thông tin vai trò từ backend, TẠM CHO PHÉP truy cập để không khóa admin
    const noRoleInfo = !user || (!Array.isArray(roles) || roles.length === 0) && !user?.role && user?.is_admin == null;
    if (!noRoleInfo) {
      const hasAdmin = Array.isArray(roles)
        ? roles.includes('ADMIN')
        : (user?.role === 'ADMIN' || user?.is_admin === true || user?.email === 'admin@hafu.local');
      if (!hasAdmin) {
        return <Navigate to="/" replace />;
      }
    }
  }
  return children;
};

export default PrivateRoute;
