// backend/controllers/user.controller.js
const db = require('../config/db');

/** Chuẩn hóa mảng role_ids từ GROUP_CONCAT */
const parseRoleIds = (roleStr) =>
  !roleStr ? [] : roleStr.split(',').map((x) => Number(x)).filter(Boolean);

/** =============== CUSTOMER: PROFILE =============== */
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    const [rows] = await db.query(
      `SELECT id, email, full_name, phone, status, created_at 
       FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Lấy roles
    const [roleRows] = await db.query(
      `SELECT r.id, r.code, r.name
       FROM user_roles ur
       JOIN roles r ON r.id = ur.role_id
       WHERE ur.user_id = ?`,
      [userId]
    );

    const user = rows[0];
    return res.json({
      ...user,
      roles: roleRows.map((r) => r.id),
      roleCodes: roleRows.map((r) => r.code),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy thông tin profile', error: err.message });
  }
};

/** =============== ADMIN: LIST USERS (có phân trang) =============== */
const adminGetAllUsers = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 10)));
    const sort = String(req.query.sort || 'created_desc').toLowerCase();

    const offset = (page - 1) * limit;

    // Sắp xếp
    let orderBy = 'u.created_at DESC';
    if (sort === 'created_asc') orderBy = 'u.created_at ASC';
    if (sort === 'name_asc') orderBy = 'u.full_name ASC';
    if (sort === 'name_desc') orderBy = 'u.full_name DESC';

    // Tổng số bản ghi
    const [[countRow]] = await db.query(`SELECT COUNT(*) AS total FROM users`);
    const total = countRow.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Lấy dữ liệu + roles (group_concat)
    const [rows] = await db.query(
      `
      SELECT 
        u.id, u.email, u.full_name, u.phone, u.status, u.created_at,
        GROUP_CONCAT(r.id) AS role_ids
      FROM users u
      LEFT JOIN user_roles ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      GROUP BY u.id
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    const data = rows.map((u) => ({
      id: u.id,
      email: u.email,
      full_name: u.full_name,
      phone: u.phone,
      status: u.status,
      created_at: u.created_at,
      roles: parseRoleIds(u.role_ids), // mảng id role
    }));

    return res.json({
      data,
      pagination: { page, limit, total, totalPages },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error: err.message });
  }
};

/** =============== ADMIN: CREATE USER =============== */
const adminCreateUser = async (req, res) => {
  const conn = await db.getConnection().catch(() => null);
  try {
    const { email, full_name, phone = null, status = 'ACTIVE', roles = [] } = req.body;

    if (!email || !full_name) {
      return res.status(400).json({ message: 'Email và họ tên là bắt buộc' });
    }

    await conn.beginTransaction();

    const [ins] = await conn.query(
      `INSERT INTO users (email, full_name, phone, status, created_at) 
       VALUES (?,?,?,?, NOW())`,
      [email, full_name, phone, status]
    );

    const userId = ins.insertId;

    if (Array.isArray(roles) && roles.length) {
      const values = roles.map((roleId) => [userId, roleId]);
      await conn.query(
        `INSERT INTO user_roles (user_id, role_id) VALUES ?`,
        [values]
      );
    }

    await conn.commit();

    return res.status(201).json({
      message: 'Tạo người dùng thành công',
      data: { id: userId, email, full_name, phone, status, roles: roles || [] },
    });
  } catch (err) {
    if (conn) await conn.rollback();
    return res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

/** =============== ADMIN: UPDATE USER =============== */
const adminUpdateUser = async (req, res) => {
  const conn = await db.getConnection().catch(() => null);
  try {
    const { id } = req.params;
    const { email, full_name, phone = null, status, roles } = req.body;

    await conn.beginTransaction();

    // Cập nhật thông tin cơ bản
    await conn.query(
      `UPDATE users 
       SET email = COALESCE(?, email),
           full_name = COALESCE(?, full_name),
           phone = COALESCE(?, phone),
           status = COALESCE(?, status)
       WHERE id = ?`,
      [email, full_name, phone, status, id]
    );

    // Cập nhật roles (nếu truyền lên)
    if (Array.isArray(roles)) {
      await conn.query(`DELETE FROM user_roles WHERE user_id = ?`, [id]);
      if (roles.length) {
        const values = roles.map((roleId) => [id, roleId]);
        await conn.query(
          `INSERT INTO user_roles (user_id, role_id) VALUES ?`,
          [values]
        );
      }
    }

    await conn.commit();

    // Trả lại dữ liệu mới
    const [[user]] = await db.query(
      `SELECT id, email, full_name, phone, status, created_at FROM users WHERE id = ?`,
      [id]
    );
    const [roleRows] = await db.query(
      `SELECT role_id AS id FROM user_roles WHERE user_id = ?`,
      [id]
    );

    return res.json({
      message: 'Cập nhật người dùng thành công',
      data: { ...user, roles: roleRows.map((r) => r.id) },
    });
  } catch (err) {
    if (conn) await conn.rollback();
    return res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

/** =============== ADMIN: DELETE USER =============== */
const adminDeleteUser = async (req, res) => {
  const conn = await db.getConnection().catch(() => null);
  try {
    const { id } = req.params;

    await conn.beginTransaction();
    await conn.query(`DELETE FROM user_roles WHERE user_id = ?`, [id]);
    const [ret] = await conn.query(`DELETE FROM users WHERE id = ?`, [id]);

    await conn.commit();

    if (!ret.affectedRows) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    return res.json({ message: 'Xóa người dùng thành công' });
  } catch (err) {
    if (conn) await conn.rollback();
    return res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  getProfile,
  adminGetAllUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
};
