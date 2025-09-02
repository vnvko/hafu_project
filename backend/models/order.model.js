const db = require('../config/db');

// ✅ Admin: Lấy tất cả orders với pagination
const adminGetAllOrders = async ({ page = 1, limit = 10, status }) => {
  const offset = (page - 1) * limit;
  
  let whereClause = '';
  let params = [limit, offset];
  
  if (status) {
    whereClause = 'WHERE o.status = ?';
    params = [status, limit, offset];
  }
  
  const [rows] = await db.query(`
    SELECT o.id, o.code, o.email, o.status, o.total, o.created_at,
           u.full_name as customer_name, u.phone as customer_phone
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    ${whereClause}
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
  `, params);
  
  const [countResult] = await db.query(
    `SELECT COUNT(*) as total FROM orders o ${whereClause ? 'WHERE o.status = ?' : ''}`,
    status ? [status] : []
  );
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

// ✅ Lấy order theo ID
const getOrderById = async (id) => {
  const [orders] = await db.query(`
    SELECT o.*, u.full_name as customer_name, u.phone as customer_phone
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    WHERE o.id = ?
  `, [id]);
  
  if (orders.length === 0) return null;
  
  const order = orders[0];
  
  // Lấy order items
  const [items] = await db.query(`
    SELECT oi.*, p.name as product_name, p.thumbnail_url,
           v.name as variant_name, v.sku
    FROM order_items oi
    JOIN product_variants v ON oi.variant_id = v.id
    JOIN products p ON v.product_id = p.id
    WHERE oi.order_id = ?
  `, [id]);
  
  order.items = items;
  return order;
};

// ✅ Cập nhật trạng thái order
const updateOrderStatus = async (id, status) => {
  const [result] = await db.query(
    'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id]
  );
  
  if (result.affectedRows === 0) return null;
  
  return getOrderById(id);
};

// ✅ Lấy orders theo user ID
const getOrdersByUserId = async (userId) => {
  const [rows] = await db.query(`
    SELECT id, code, status, total, created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `, [userId]);
  
  return rows;
};

// ✅ Tạo order mới
const createOrder = async ({ userId, items, address, note }) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Tạo order
    const [orderResult] = await connection.query(`
      INSERT INTO orders (code, user_id, email, note, subtotal, total, status)
      VALUES (?, ?, ?, ?, ?, ?, 'PENDING')
    `, [
      `HF${Date.now()}`, // Tạo mã đơn hàng
      userId,
      address?.email || null,
      note,
      0, // Sẽ tính sau
      0   // Sẽ tính sau
    ]);
    
    const orderId = orderResult.insertId;
    let subtotal = 0;
    
    // Thêm order items
    for (const item of items) {
      const [variantResult] = await connection.query(
        'SELECT price FROM product_variants WHERE id = ?',
        [item.variant_id]
      );
      
      if (variantResult.length === 0) {
        throw new Error(`Không tìm thấy variant ${item.variant_id}`);
      }
      
      const price = variantResult[0].price;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;
      
      await connection.query(`
        INSERT INTO order_items (order_id, variant_id, quantity, unit_price, note)
        VALUES (?, ?, ?, ?, ?)
      `, [orderId, item.variant_id, item.quantity, price, item.note || null]);
    }
    
    // Cập nhật tổng tiền
    const shippingFee = 20000; // Phí ship cố định
    const total = subtotal + shippingFee;
    
    await connection.query(`
      UPDATE orders SET subtotal = ?, shipping_fee = ?, total = ? WHERE id = ?
    `, [subtotal, shippingFee, total, orderId]);
    
    await connection.commit();
    
    return { id: orderId, subtotal, shipping_fee: shippingFee, total };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  adminGetAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUserId,
  createOrder
};
