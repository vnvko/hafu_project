const db = require('../config/db');

const getOrCreateCart = async (user_id) => {
  let [rows] = await db.query(`SELECT id FROM carts WHERE user_id = ? LIMIT 1`, [user_id]);
  if (rows.length > 0) return rows[0].id;

  const [result] = await db.query(`INSERT INTO carts (user_id) VALUES (?)`, [user_id]);
  return result.insertId;
};

const getCartItems = async (cart_id) => {
  const [rows] = await db.query(`
    SELECT ci.id, ci.variant_id, ci.quantity, v.name AS variant_name, v.price, v.stock, p.name AS product_name, p.thumbnail_url
    FROM cart_items ci
    JOIN product_variants v ON v.id = ci.variant_id
    JOIN products p ON p.id = v.product_id
    WHERE ci.cart_id = ?
  `, [cart_id]);

  return rows;
};

const addToCart = async (cart_id, variant_id, quantity) => {
  const [rows] = await db.query(`
    SELECT id FROM cart_items WHERE cart_id = ? AND variant_id = ?
  `, [cart_id, variant_id]);

  if (rows.length > 0) {
    await db.query(`
      UPDATE cart_items SET quantity = quantity + ? WHERE id = ?
    `, [quantity, rows[0].id]);
  } else {
    await db.query(`
      INSERT INTO cart_items (cart_id, variant_id, quantity)
      VALUES (?, ?, ?)
    `, [cart_id, variant_id, quantity]);
  }
};

const updateCartItem = async (item_id, quantity) => {
  await db.query(`UPDATE cart_items SET quantity = ? WHERE id = ?`, [quantity, item_id]);
};

const removeCartItem = async (item_id) => {
  await db.query(`DELETE FROM cart_items WHERE id = ?`, [item_id]);
};

module.exports = {
  getOrCreateCart,
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem
};
