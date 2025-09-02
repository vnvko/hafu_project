const db = require('../config/db');
const bcrypt = require('bcrypt');

// ✅ Auth: Tìm user theo email
const findByEmail = async (email) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, u.password_hash, u.full_name, u.phone, u.status, u.created_at, u.updated_at,
           GROUP_CONCAT(r.name) as role_names
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.email = ?
    GROUP BY u.id
  `, [email]);
  
  if (rows.length === 0) return null;
  
  const user = rows[0];
  return {
    ...user,
    roles: user.role_names ? user.role_names.split(',') : []
  };
};

// ✅ Auth: Tạo user mới (cho register)
const createUserForAuth = async ({ email, password_hash, full_name }) => {
  const [result] = await db.query(`
    INSERT INTO users (email, password_hash, full_name)
    VALUES (?, ?, ?)
  `, [email, password_hash, full_name]);
  
  return result.insertId;
};

// ✅ Customer: Lấy thông tin user theo ID
const getUserById = async (id) => {
  const [rows] = await db.query(`
    SELECT u.id, u.email, u.full_name, u.phone, u.status, u.created_at, u.updated_at,
           GROUP_CONCAT(r.name) as role_names
    FROM users u
    LEFT JOIN user_roles ur ON u.id = ur.user_id
    LEFT JOIN roles r ON ur.role_id = r.id
    WHERE u.id = ?
    GROUP BY u.id
  `, [id]);
  
  if (rows.length === 0) return null;
  
  const user = rows[0];
  return {
    ...user,
    roles: user.role_names ? user.role_names.split(',') : []
  };
};

// ✅ Admin: Lấy tất cả users với pagination
const adminGetAllUsers = async ({ page = 1, limit = 10, sort = 'created_desc' }) => {
  const offset = (page - 1) * limit;
  
  // Build sort clause
  let sortClause = 'ORDER BY u.created_at DESC';
  if (sort === 'name_asc') sortClause = 'ORDER BY u.full_name ASC';
  if (sort === 'name_desc') sortClause = 'ORDER BY u.full_name DESC';
  if (sort === 'email_asc') sortClause = 'ORDER BY u.email ASC';
  
  const [rows] = await db.query(`
    SELECT u.id, u.email, u.full_name, u.phone, u.status, u.created_at, u.updated_at
    FROM users u
    ${sortClause}
    LIMIT ? OFFSET ?
  `, [limit, offset]);
  
  // Lấy roles cho từng user
  for (let user of rows) {
    const [roleRows] = await db.query(`
      SELECT r.id, r.name
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = ?
    `, [user.id]);
    user.roles = roleRows.map(r => r.id);
  }
  
  const [countResult] = await db.query('SELECT COUNT(*) as total FROM users');
  const total = countResult[0].total;
  
  return {
    data: rows,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      perPage: limit
    }
  };
};

// ✅ Admin: Tạo user mới
const createUser = async ({ email, full_name, phone, status = 'ACTIVE', roles = [] }) => {
  try {
    // Tạo password mặc định
    const defaultPassword = '123456';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    const [result] = await db.query(`
      INSERT INTO users (email, password_hash, full_name, phone, status)
      VALUES (?, ?, ?, ?, ?)
    `, [email, hashedPassword, full_name, phone, status]);
    
    const userId = result.insertId;
    
    // Nếu không có roles, gán role CUSTOMER mặc định
    if (roles.length === 0) {
      const [customerRole] = await db.query('SELECT id FROM roles WHERE code = ?', ['CUSTOMER']);
      if (customerRole.length > 0) {
        await db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, customerRole[0].id]);
        roles = [customerRole[0].id];
      }
    } else {
      // Thêm roles cho user
      for (const roleId of roles) {
        await db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);
      }
    }
    
    return { id: userId, email, full_name, phone, status, roles };
  } catch (error) {
    console.error('Lỗi tạo user:', error);
    throw error;
  }
};

// ✅ Admin: Cập nhật user
const updateUser = async (id, { email, full_name, phone, status, roles }) => {
  const [result] = await db.query(`
    UPDATE users 
    SET email = ?, full_name = ?, phone = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [email, full_name, phone, status, id]);
  
  if (result.affectedRows === 0) return null;
  
  // Cập nhật roles
  if (roles) {
    // Xóa roles cũ
    await db.query('DELETE FROM user_roles WHERE user_id = ?', [id]);
    
    // Thêm roles mới
    if (roles.length > 0) {
      for (const roleId of roles) {
        await db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [id, roleId]);
      }
    }
  }
  
  return { id, email, full_name, phone, status, roles };
};

// ✅ Admin: Xóa user
const deleteUser = async (id) => {
  // Xóa user_roles trước
  await db.query('DELETE FROM user_roles WHERE user_id = ?', [id]);
  
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findByEmail,
  createUserForAuth,
  getUserById,
  adminGetAllUsers,
  createUser,
  updateUser,
  deleteUser
};
