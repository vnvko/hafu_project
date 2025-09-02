const db = require('../config/db');

// ✅ Admin: Lấy tất cả roles
const getAllRoles = async () => {
  const [rows] = await db.query(`
    SELECT id, code, name
    FROM roles
    ORDER BY id ASC
  `);
  return rows;
};

// ✅ Admin: Tạo role mới
const createRole = async ({ code, name }) => {
  const [result] = await db.query(`
    INSERT INTO roles (code, name)
    VALUES (?, ?)
  `, [code, name]);
  
  return { id: result.insertId, code, name };
};

// ✅ Admin: Cập nhật role
const updateRole = async (id, { code, name }) => {
  const [result] = await db.query(`
    UPDATE roles 
    SET code = ?, name = ?
    WHERE id = ?
  `, [code, name, id]);
  
  if (result.affectedRows === 0) return null;
  
  return { id, code, name };
};

// ✅ Admin: Xóa role
const deleteRole = async (id) => {
  // Kiểm tra xem role có đang được sử dụng không
  const [userRoles] = await db.query('SELECT COUNT(*) as count FROM user_roles WHERE role_id = ?', [id]);
  if (userRoles[0].count > 0) {
    throw new Error('Không thể xóa quyền đang được sử dụng');
  }
  
  const [result] = await db.query('DELETE FROM roles WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole
};
