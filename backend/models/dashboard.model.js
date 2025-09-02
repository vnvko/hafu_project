const db = require('../config/db');

const getTotalOrders = async () => {
  const [[{ total }]] = await db.query(`SELECT COUNT(*) AS total FROM orders`);
  return total;
};

const getTotalRevenue = async () => {
  const [[{ revenue }]] = await db.query(`SELECT SUM(total) AS revenue FROM orders WHERE status IN ('PAID', 'FULFILLING', 'SHIPPED', 'COMPLETED')`);
  return revenue || 0;
};

const getTopSellingProducts = async () => {
  const [rows] = await db.query(`
    SELECT p.id, p.name, p.thumbnail_url, SUM(oi.quantity) AS sold
    FROM order_items oi
    JOIN product_variants v ON v.id = oi.variant_id
    JOIN products p ON p.id = v.product_id
    JOIN orders o ON o.id = oi.order_id
    WHERE o.status IN ('PAID', 'FULFILLING', 'SHIPPED', 'COMPLETED')
    GROUP BY p.id
    ORDER BY sold DESC
    LIMIT 5
  `);
  return rows;
};

const getRevenueByDate = async () => {
  const [rows] = await db.query(`
    SELECT DATE(created_at) AS date, SUM(total) AS revenue
    FROM orders
    WHERE status IN ('PAID', 'FULFILLING', 'SHIPPED', 'COMPLETED')
    GROUP BY DATE(created_at)
    ORDER BY date DESC
    LIMIT 7
  `);
  return rows;
};

module.exports = {
  getTotalOrders,
  getTotalRevenue,
  getTopSellingProducts,
  getRevenueByDate
};
