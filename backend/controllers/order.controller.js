// backend/controllers/order.controller.js
const db = require('../config/db');

/* ================== ADMIN: LIST ORDERS (tính tổng động) ================== */
const adminGetAllOrders = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 10)));
    const status = (req.query.status || '').toUpperCase();
    const offset = (page - 1) * limit;

    const where = [];
    const params = [];
    if (status) { where.push('o.status = ?'); params.push(status); }
    const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [[countRow]] = await db.query(
      `SELECT COUNT(*) AS total FROM orders o ${whereSQL}`, params
    );
    const total = countRow?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // TÍNH TỔNG = SUM(oi.quantity * oi.price)
    const [rows] = await db.query(
      `
      SELECT 
        o.id, o.code, o.user_id, o.status, o.created_at,
        u.full_name AS customer_name, u.email AS customer_email, u.phone AS customer_phone,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS total_amount
      FROM orders o
      LEFT JOIN users u ON u.id = o.user_id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      ${whereSQL}
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    return res.json({
      data: rows,
      pagination: { page, limit, total, totalPages }
    });
  } catch (err) {
    console.error('adminGetAllOrders error:', err);
    return res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err.message });
  }
};

/* ================== ADMIN: ORDER DETAIL (tính tổng động) ================== */
const adminGetOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const [[order]] = await db.query(
      `
      SELECT 
        o.id, o.code, o.user_id, o.status, o.created_at,
        u.full_name AS customer_name, u.email AS customer_email, u.phone AS customer_phone,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS total_amount
      FROM orders o
      LEFT JOIN users u ON u.id = o.user_id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = ?
      GROUP BY o.id
      `,
      [id]
    );

    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    const [items] = await db.query(
      `
      SELECT 
        oi.id, oi.product_id, oi.quantity, oi.price,
        p.name AS product_name, p.slug AS product_slug
      FROM order_items oi
      LEFT JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC
      `,
      [id]
    );

    return res.json({ order, items });
  } catch (err) {
    console.error('adminGetOrderDetail error:', err);
    return res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error: err.message });
  }
};

/* ================== ADMIN: UPDATE STATUS ================== */
const adminUpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ALLOWED = ['PENDING', 'PAID', 'SHIPPING', 'COMPLETED', 'CANCELLED'];

    if (!ALLOWED.includes((status || '').toUpperCase())) {
      return res.status(400).json({ message: `Trạng thái không hợp lệ. Cho phép: ${ALLOWED.join(', ')}` });
    }

    const [ret] = await db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status.toUpperCase(), id]);
    if (!ret.affectedRows) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    // Lấy lại order với total động
    const [[order]] = await db.query(
      `
      SELECT 
        o.id, o.code, o.user_id, o.status, o.created_at,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS total_amount
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = ?
      GROUP BY o.id
      `,
      [id]
    );

    return res.json({ message: 'Cập nhật trạng thái đơn hàng thành công', data: order });
  } catch (err) {
    console.error('adminUpdateOrderStatus error:', err);
    return res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err.message });
  }
};

/* ================== CUSTOMER: LIST ORDERS BY USER ================== */
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const [rows] = await db.query(
      `
      SELECT 
        o.id, o.code, o.status, o.created_at,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS total_amount
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [userId]
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err.message });
  }
};

/* ================== CUSTOMER: ORDER DETAIL ================== */
const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const [[order]] = await db.query(
      `
      SELECT 
        o.id, o.code, o.status, o.created_at,
        COALESCE(SUM(oi.quantity * oi.price), 0) AS total_amount
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      WHERE o.id = ?
      GROUP BY o.id
      `,
      [id]
    );
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    const [items] = await db.query(
      `
      SELECT 
        oi.id, oi.product_id, oi.quantity, oi.price,
        p.name AS product_name, p.slug AS product_slug
      FROM order_items oi
      LEFT JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = ?
      ORDER BY oi.id ASC
      `,
      [id]
    );

    return res.json({ order, items });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error: err.message });
  }
};

/* ================== CUSTOMER: CREATE ORDER ================== */
const createOrder = async (req, res) => {
  const conn = await db.getConnection().catch(() => null);
  try {
    const userId = req.userId;
    const { items, address = null, note = null } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ' });
    }

    await conn.beginTransaction();

    const orderCode = 'OD' + Date.now();
    // KHÔNG chèn total_amount vì DB của bạn không có cột này
    const [ins] = await conn.query(
      `INSERT INTO orders (code, user_id, status, address, note, created_at)
       VALUES (?, ?, 'PENDING', ?, ?, NOW())`,
      [orderCode, userId, address, note]
    );
    const orderId = ins.insertId;

    const values = items.map(it => [orderId, it.productId, it.quantity, it.price]);
    await conn.query(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`, [values]);

    await conn.commit();

    // Tính tổng để trả về client
    const [[sumRow]] = await db.query(
      `SELECT COALESCE(SUM(quantity * price), 0) AS total_amount FROM order_items WHERE order_id = ?`,
      [orderId]
    );

    return res.status(201).json({
      message: 'Tạo đơn hàng thành công',
      data: { id: orderId, code: orderCode, status: 'PENDING', total_amount: sumRow.total_amount }
    });
  } catch (err) {
    if (conn) await conn.rollback();
    return res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  adminGetAllOrders,
  adminGetOrderDetail,
  adminUpdateOrderStatus,
  getUserOrders,
  getOrderDetail,
  createOrder
};
