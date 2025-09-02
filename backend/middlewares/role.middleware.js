const db = require('../config/db');

// Middleware kiểm tra vai trò
const hasRole = (roles = []) => {
  return async (req, res, next) => {
    const userId = req.userId || req.user?.userId || req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Chưa xác thực người dùng' });

    try {
      const [rows] = await db.query(`
        SELECT r.code FROM user_roles ur
        JOIN roles r ON r.id = ur.role_id
        WHERE ur.user_id = ?
      `, [userId]);

      const userRoles = rows.map(r => r.code);
      const required = Array.isArray(roles) ? roles : [roles];

      const isMatch = required.some(r => userRoles.includes(r));
      if (!isMatch) return res.status(403).json({ message: 'Không có quyền truy cập' });

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Lỗi phân quyền', error: err.message });
    }
  };
};

module.exports = { hasRole };
