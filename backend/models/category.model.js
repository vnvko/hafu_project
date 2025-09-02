const db = require('../config/db');

const getAllCategories = async () => {
  const [rows] = await db.query(`
    SELECT id, slug, name, parent_id
    FROM categories
    WHERE active = 1
    ORDER BY sort_order ASC
  `);
  return rows;
};

// ✅ Admin: Lấy tất cả categories với pagination
const adminGetAllCategories = async ({ page = 1, limit = 10, sort = 'created_desc' }) => {
  const offset = (page - 1) * limit;
  
  // Build sort clause
  let sortClause = 'ORDER BY created_at DESC';
  if (sort === 'name_asc') sortClause = 'ORDER BY name ASC';
  if (sort === 'name_desc') sortClause = 'ORDER BY name DESC';
  if (sort === 'sort_order') sortClause = 'ORDER BY sort_order ASC';
  
  const [rows] = await db.query(`
    SELECT id, slug, name, active, sort_order, created_at, updated_at
    FROM categories
    ${sortClause}
    LIMIT ? OFFSET ?
  `, [limit, offset]);
  
  const [countResult] = await db.query('SELECT COUNT(*) as total FROM categories');
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

// ✅ Admin: Tạo category mới
const createCategory = async ({ name, slug, active = true, sort_order = 0 }) => {
  const [result] = await db.query(`
    INSERT INTO categories (name, slug, active, sort_order)
    VALUES (?, ?, ?, ?)
  `, [name, slug, active, sort_order]);
  
  return { id: result.insertId, name, slug, active, sort_order };
};

// ✅ Admin: Cập nhật category
const updateCategory = async (id, { name, slug, active, sort_order }) => {
  const [result] = await db.query(`
    UPDATE categories 
    SET name = ?, slug = ?, active = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `, [name, slug, active, sort_order, id]);
  
  if (result.affectedRows === 0) return null;
  
  return { id, name, slug, active, sort_order };
};

// ✅ Admin: Xóa category
const deleteCategory = async (id) => {
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllCategories,
  adminGetAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
